import tw, { TwStyle } from 'twin.macro'
import React, { Fragment, useState } from 'react'
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

interface PositionType {
  top?: string
  bottom?: string
}

interface ModalProps {
  children: React.ReactNode
  title?: string
  titleStyle?: TwStyle
  titleProps?: { as?: React.ElementType }
  transitionProps?: TransitionType
  position?: PositionType
  centered?: boolean
  width?: string
  open: boolean
  arrow?: boolean
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

export default function Modal({
  children,
  title,
  titleStyle,
  titleProps,
  transitionProps = transitionPropsDefault,
  position,
  centered = false,
  width,
  open = false,
  arrow = false,
  onClose,
}: ModalProps) {
  return (
    <Fragment>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" tw="relative z-10" onClose={onClose}>
          <Transition.Child as={Fragment} {...transitionProps}>
            <Dialog.Overlay tw="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div tw="fixed inset-0 overflow-y-auto">
            <Transition.Child as={Fragment} {...transitionProps}>
              <div tw="w-full h-full">
                <Dialog.Panel
                  css={[
                    tw`w-full transform overflow-hidden rounded bg-white text-left align-middle shadow-xl transition-all`,
                    width
                      ? {
                          maxWidth: width,
                        }
                      : tw`max-w-md`,
                    position
                      ? tw`absolute left-1/2 -translate-x-1/2`
                      : centered
                      ? tw`absolute-center`
                      : tw`absolute left-1/2 -translate-x-1/2 top-1/4`,
                    {
                      ...position,
                    },
                  ]}
                >
                  {arrow && (
                    <div
                      tw="absolute top-1 right-2.5 w-8 h-8 cursor-pointer flex justify-center items-center"
                      onClick={onClose}
                    >
                      <div tw="w-6 h-6 [& path]:stroke-black">
                        <ICONS.Close />
                      </div>
                    </div>
                  )}
                  {title && (
                    <Header
                      title={title}
                      titleStyle={titleStyle}
                      titleProps={titleProps}
                    ></Header>
                  )}
                  <div tw="text-black py-2 px-4">{children}</div>
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  )
}

function Header({
  title,
  titleStyle,
  titleProps,
}: {
  title?: string
  titleStyle?: TwStyle
  titleProps?: { as?: React.ElementType }
}) {
  return (
    <Dialog.Title
      as="h3"
      css={[
        tw`text-lg font-medium leading-6 text-gray-900 border-b py-2 px-4`,
        titleStyle,
      ]}
      {...titleProps}
    >
      {title}
    </Dialog.Title>
  )
}
