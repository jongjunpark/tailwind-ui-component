import type { Dispatch, SetStateAction, ElementType, ReactNode } from 'react'
import { useEffect, useRef, useState, Fragment } from 'react'

import { Popover as HeadlessPopover } from '@headlessui/react'
import type * as PopperJS from '@popperjs/core'
import { usePopper } from 'react-popper'

import Transition from './Transition'

import { cls } from '../utils/common'

interface TransitionType {
  enter?: string
  enterFrom?: string
  enterTo?: string
  leave?: string
  leaveFrom?: string
  leaveTo?: string
}

interface PopoverProps {
  content: ReactNode
  placement?: PopperJS.Placement
  offset?: number[]
  close?: boolean // close와 setClose는 한세트
  setClose?: Dispatch<SetStateAction<boolean>> // close와 setClose는 한세트
  isInputChildren?: boolean
  panelProps?: {
    as?: ElementType
    focus?: boolean
    static?: boolean
    unmount?: undefined
  }
  panelStyle?: string
  transitionProps?: TransitionType
  children?: ReactNode
}

const transitionPropsDefault = {
  enter: 'transition ease-out duration-200',
  enterFrom: 'opacity-0 translate-y-4',
  enterTo: 'opacity-100 translate-y-0',
  leave: 'transition ease-in duration-150',
  leaveFrom: 'opacity-100 translate-y-0',
  leaveTo: 'opacity-0 translate-y-4',
}

const Popover = ({
  content,
  placement = 'bottom-start',
  offset,
  close,
  setClose,
  isInputChildren = false,
  panelProps,
  panelStyle,
  transitionProps = transitionPropsDefault,
  children,
}: PopoverProps) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>()
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isFocusContent, setIsFocusContent] = useState<boolean>(false)
  const closeRef = useRef<HTMLDivElement>(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: { offset: [offset?.[0] ?? 0, offset?.[1] ?? 0] },
      },
    ],
  })

  useEffect(() => {
    if (close && setClose) {
      closeRef.current?.click()
      setClose(false)
    }
  }, [close, setClose])

  if (!content) return null

  return (
    <div className="relative">
      {isInputChildren && (
        <button
          type="button"
          className="absolute z-10 w-full cursor-default"
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        >
          {children}
        </button>
      )}
      <HeadlessPopover className="relative">
        {({ open, close }) => (
          <Fragment>
            <HeadlessPopover.Button
              ref={setReferenceElement}
              className="block w-full focus:outline-none"
            >
              {children}
            </HeadlessPopover.Button>
            <Transition
              {...transitionProps}
              // TODO: content가 살짝 깜빡이는 현상이 있음 추후 수정 예정
              show={isInputChildren && isFocusContent ? true : isOpen || open}
            >
              <HeadlessPopover.Panel
                ref={setPopperElement}
                style={styles.popper}
                className={cls('absolute z-10 min-w-full', panelStyle ?? '')}
                onFocus={() => setIsFocusContent(true)}
                onBlur={() => setIsFocusContent(false)}
                {...attributes.popper}
                {...panelProps}
              >
                <Fragment>
                  <div onClick={close} ref={closeRef} />
                  {content}
                </Fragment>
              </HeadlessPopover.Panel>
            </Transition>
          </Fragment>
        )}
      </HeadlessPopover>
    </div>
  )
}

export default Popover
