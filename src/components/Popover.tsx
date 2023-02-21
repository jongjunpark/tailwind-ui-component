import tw, { TwStyle } from 'twin.macro'
import React, { Fragment } from 'react'
import { Popover as HeadlessPopover } from '@headlessui/react'
import Transition from './Transition'

export type PopoverPlacement =
  | 'bottom left'
  | 'bottom right'
  | 'top left'
  | 'top right'
  | 'custom'
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
  placement?: PopoverPlacement
  position?: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
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
  placement = 'bottom left',
  position,
  panelProps,
  transitionProps = transitionPropsDefault,
  children,
}: PopoverProps) {
  if (!content) return null

  return (
    <HeadlessPopover tw="relative w-fit">
      <>
        <HeadlessPopover.Button>{children}</HeadlessPopover.Button>
        <Transition {...transitionProps} tw="absolute w-full h-full top-0">
          <HeadlessPopover.Panel
            css={[
              tw`absolute`,
              tw`z-10`,
              placement === 'bottom left' && tw`top-full left-0`,
              placement === 'bottom right' && tw`top-full right-0`,
              placement === 'top left' && tw`bottom-full left-0`,
              placement === 'top right' && tw`bottom-full right-0`,
              placement === 'custom' && { ...position },
            ]}
            {...panelProps}
          >
            {content}
          </HeadlessPopover.Panel>
        </Transition>
      </>
    </HeadlessPopover>
  )
}
