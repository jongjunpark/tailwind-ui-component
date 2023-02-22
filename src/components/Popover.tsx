import tw, { TwStyle } from 'twin.macro'
import React, { useEffect, useState } from 'react'
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
  content: React.ReactNode
  placement?: PopperJS.Placement
  offset?: number[]
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
  enterFrom: tw`opacity-0 translate-y-1`,
  enterTo: tw`opacity-100 translate-y-0`,
  leave: tw`transition ease-in duration-150`,
  leaveFrom: tw`opacity-100 translate-y-0`,
  leaveTo: tw`opacity-0 translate-y-1`,
}

export default function Popover({
  content,
  placement = 'bottom-start',
  offset,
  panelProps,
  transitionProps = transitionPropsDefault,
  children,
}: PopoverProps) {
  let [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>()
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: { offset: [offset?.[0] ?? 0, offset?.[1] ?? 0] },
      },
    ],
  })

  if (!content) return null

  return (
    <HeadlessPopover tw="relative">
      <>
        <HeadlessPopover.Button ref={setReferenceElement}>
          {children}
        </HeadlessPopover.Button>
        <Transition {...transitionProps}>
          <HeadlessPopover.Panel
            ref={setPopperElement}
            style={styles.popper}
            css={[tw`absolute z-10`]}
            {...attributes.popper}
            {...panelProps}
          >
            {content}
          </HeadlessPopover.Panel>
        </Transition>
      </>
    </HeadlessPopover>
  )
}
