import tw, { TwStyle } from 'twin.macro'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Popover as HeadlessPopover } from '@headlessui/react'
import type * as PopperJS from '@popperjs/core'
import { usePopper } from 'react-popper'
import Transition from './Transition'

interface TransitionType {
  enter?: TwStyle
  enterFrom?: TwStyle
  enterTo?: TwStyle
  leave?: TwStyle
  leaveFrom?: TwStyle
  leaveTo?: TwStyle
}

interface PopoverProps {
  content: string
  placement?: PopperJS.Placement
  offset?: number[]
  trigger?: 'hover' | 'click'
  style?: TwStyle
  arrow?: boolean
  panelProps?: {
    as?: React.ElementType
    focus?: boolean
    static?: boolean
    unmount?: undefined
  }
  transitionProps?: TransitionType
  children: React.ReactNode
}

const transitionPropsDefault = {
  enter: tw`transition ease-out duration-200`,
  enterFrom: tw`opacity-0`,
  enterTo: tw`opacity-100`,
  leave: tw`transition ease-in duration-150`,
  leaveFrom: tw`opacity-100`,
  leaveTo: tw`opacity-0`,
}

export default function Tooltip({
  content,
  placement = 'bottom-start',
  offset,
  trigger = 'hover',
  style,
  arrow,
  panelProps,
  transitionProps = transitionPropsDefault,
  children,
}: PopoverProps) {
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

  let enterTimeout = useRef<any>()
  let leaveTimeout = useRef<any>()

  const enterDelay = 150
  const leaveDelay = 150

  const handleMouseEnter = useCallback(() => {
    if (trigger === 'click') return
    leaveTimeout.current && clearTimeout(leaveTimeout.current)
    enterTimeout.current = setTimeout(() => setIsShow(true), enterDelay)
  }, [enterDelay])
  const handleMouseLeave = useCallback(() => {
    if (trigger === 'click') return
    enterTimeout.current && clearTimeout(enterTimeout.current)
    leaveTimeout.current = setTimeout(() => setIsShow(false), leaveDelay)
  }, [leaveDelay])

  if (!content) return null

  const defaultTooltipStyle = tw`py-2 px-4 [border-radius: 4px] bg-gray-900 text-white`

  return (
    <HeadlessPopover
      tw="relative w-fit"
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
            css={[
              tw`absolute z-10`,
              tw`data-[popper-placement^=top]:[& > div]:-bottom-1`,
              tw`data-[popper-placement^=bottom]:[& > div]:-top-1`,
              tw`data-[popper-placement^=left]:[& > div]:-right-1`,
              tw`data-[popper-placement^=right]:[& > div]:-left-1`,
              style ?? defaultTooltipStyle,
            ]}
            {...attributes.popper}
            {...panelProps}
          >
            {content}
            <div
              ref={setArrowElement}
              style={styles.arrow}
              css={[
                tw`absolute w-3 h-3 bg-inherit [z-index: -1] [visibility: hidden]`,
                tw`before:(content-[''] absolute w-2 h-2 bg-inherit visible rotate-45)`,
              ]}
            />
          </HeadlessPopover.Panel>
        </Transition>
      </>
    </HeadlessPopover>
  )
}
