import tw, { TwStyle } from 'twin.macro'
import React, { Fragment, useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import Transition from './Transition'
import ICONS from '../icons'

interface TransitionType {
  enter?: TwStyle
  enterFrom?: TwStyle
  enterTo?: TwStyle
  leave?: TwStyle
  leaveFrom?: TwStyle
  leaveTo?: TwStyle
}

type PlacementType = 'top' | 'bottom' | 'left' | 'right'

interface SidebarProps {
  children: React.ReactNode
  transitionProps?: TransitionType
  placement?: PlacementType
  open: boolean
  onClose: () => void
}

const transitionPropsDefault = {
  enter: tw`ease-out duration-300`,
  enterFrom: tw`opacity-0`,
  enterTo: tw`opacity-100`,
  leave: tw`ease-in duration-200`,
  leaveFrom: tw`opacity-100`,
  leaveTo: tw`opacity-0`,
}

const itemTansitionPropsDefault = {
  enter: tw`transform transition ease-in-out duration-300 sm:duration-300`,
  enterFrom: tw`translate-x-full`,
  enterTo: tw`translate-x-0`,
  leave: tw`transform transition ease-in-out duration-300 sm:duration-300`,
  leaveFrom: tw`translate-x-0`,
  leaveTo: tw`translate-x-full`,
}

export default function Sidebar({
  children,
  transitionProps,
  placement = 'right',
  open = false,
  onClose,
}: SidebarProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      setTimeout(() => {
        document.body.style.overflow = ''
      }, 300)
    }
  }, [open])

  const itemTansitionPropsDefault = {
    enter: tw`transform transition ease-in-out duration-300 sm:duration-300`,
    enterFrom: tw`translate-x-full`,
    enterTo: tw`translate-x-0`,
    leave: tw`transform transition ease-in-out duration-300 sm:duration-300`,
    leaveFrom: tw`translate-x-0`,
    leaveTo: tw`translate-x-full`,
  }

  if (placement === 'left') {
    itemTansitionPropsDefault.enterFrom = tw`-translate-x-full`
    itemTansitionPropsDefault.enterTo = tw`translate-x-0`
    itemTansitionPropsDefault.leaveFrom = tw`translate-x-0`
    itemTansitionPropsDefault.leaveTo = tw`-translate-x-full`
  } else if (placement === 'top') {
    itemTansitionPropsDefault.enterFrom = tw`-translate-y-full`
    itemTansitionPropsDefault.enterTo = tw`translate-y-0`
    itemTansitionPropsDefault.leaveFrom = tw`translate-y-0`
    itemTansitionPropsDefault.leaveTo = tw`-translate-y-full`
  } else if (placement === 'bottom') {
    itemTansitionPropsDefault.enterFrom = tw`translate-y-full`
    itemTansitionPropsDefault.enterTo = tw`translate-y-0`
    itemTansitionPropsDefault.leaveFrom = tw`translate-y-0`
    itemTansitionPropsDefault.leaveTo = tw`translate-y-full`
  }

  return (
    <Fragment>
      <Transition appear unmount={false} show={open} as={Fragment}>
        <div tw="relative z-10">
          <Transition.Child
            as={Fragment}
            appear
            unmount={false}
            {...transitionPropsDefault}
          >
            <div tw="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div tw="fixed inset-0 overflow-hidden" onClick={onClose}>
            <Transition.Child
              as={Fragment}
              appear
              unmount={false}
              {...itemTansitionPropsDefault}
              {...transitionProps}
            >
              <div
                css={[
                  tw`absolute`,
                  placement === 'right'
                    ? tw`top-0 right-0 h-full`
                    : placement === 'left'
                    ? tw`top-0 left-0 h-full`
                    : placement === 'top'
                    ? tw`top-0 left-0 right-0 w-full`
                    : tw`bottom-0 left-0 right-0 w-full`,
                ]}
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
              >
                {children}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Transition>
    </Fragment>
  )
}
