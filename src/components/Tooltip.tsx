import type { ReactNode, ElementType } from 'react'
import { useCallback, useRef, useState } from 'react'

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
  trigger?: 'hover' | 'click'
  style?: string
  arrow?: boolean
  panelProps?: {
    as?: ElementType
    focus?: boolean
    static?: boolean
    unmount?: undefined
  }
  transitionProps?: TransitionType
  children: ReactNode
}

const transitionPropsDefault = {
  enter: 'transition ease-out duration-200',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leave: 'transition ease-in duration-150',
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0',
}

export const Tooltip = ({
  content,
  placement = 'bottom-start',
  offset,
  trigger = 'hover',
  style,
  arrow,
  panelProps,
  transitionProps = transitionPropsDefault,
  children,
}: PopoverProps) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>()
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: { offset: [offset?.[0] ?? 0, offset?.[1] ?? 0] },
      },
      { name: 'arrow', options: { element: arrowElement } },
    ],
  })

  const enterTimeout = useRef<any>()
  const leaveTimeout = useRef<any>()

  const enterDelay = 150
  const leaveDelay = 150

  const handleMouseEnter = useCallback(() => {
    if (trigger === 'click') return
    leaveTimeout.current && clearTimeout(leaveTimeout.current)
    enterTimeout.current = setTimeout(() => setIsShow(true), enterDelay)
  }, [trigger, enterDelay])
  const handleMouseLeave = useCallback(() => {
    if (trigger === 'click') return
    enterTimeout.current && clearTimeout(enterTimeout.current)
    leaveTimeout.current = setTimeout(() => setIsShow(false), leaveDelay)
  }, [trigger, leaveDelay])

  if (!content) return null

  const defaultTooltipStyle = 'py-8 px-16 rounded bg-gray-900 text-white'

  return (
    <HeadlessPopover
      className="relative w-fit"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <>
        <HeadlessPopover.Button ref={setReferenceElement}>
          {children}
        </HeadlessPopover.Button>
        <Transition
          {...transitionProps}
          show={trigger === 'hover' ? isShow : undefined}
        >
          <HeadlessPopover.Panel
            ref={setPopperElement}
            style={styles.popper}
            className={cls(
              'absolute z-10',
              '[&_div]:data-[popper-placement^=top]:-bottom-4',
              '[&_div]:data-[popper-placement^=bottom]:-top-4',
              '[&_div]:data-[popper-placement^=left]:-right-4',
              '[&_div]:data-[popper-placement^=right]:-left-4',
              style ?? defaultTooltipStyle,
            )}
            {...attributes.popper}
            {...panelProps}
          >
            {content}
            {arrow && (
              <div
                ref={setArrowElement}
                style={styles.arrow}
                className={cls(
                  'bg-inherit -z-1 invisible absolute h-12 w-12',
                  "before:bg-inherit before:visible before:absolute before:h-8 before:w-8 before:rotate-45 before:content-['']",
                )}
              />
            )}
          </HeadlessPopover.Panel>
        </Transition>
      </>
    </HeadlessPopover>
  )
}
