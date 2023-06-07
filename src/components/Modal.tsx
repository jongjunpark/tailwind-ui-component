import type { ElementType, ReactNode } from 'react'
import { Fragment } from 'react'

import { Dialog } from '@headlessui/react'

import Transition from './Transition'

import ICONS from '../icons'
import { cls } from '../utils/common'

interface TransitionType {
  enter?: string
  enterFrom?: string
  enterTo?: string
  leave?: string
  leaveFrom?: string
  leaveTo?: string
}

interface PositionType {
  top?: string
  bottom?: string
}

type ScreenType = 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'all'

interface ModalProps {
  children: ReactNode
  title?: string
  titleStyle?: string
  titleProps?: { as?: ElementType }
  transitionProps?: TransitionType
  contentStyle?: string
  position?: PositionType
  centered?: boolean
  width?: string
  open: boolean
  close?: boolean
  fullScreens?: ScreenType[]
  onClose: () => void
}

const transitionPropsDefault = {
  enter: 'ease-out duration-300',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leave: 'ease-in duration-200',
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0',
}

const Modal = ({
  children,
  title,
  titleStyle,
  titleProps,
  transitionProps = transitionPropsDefault,
  contentStyle,
  position,
  centered = false,
  width,
  open = false,
  close = false,
  fullScreens,
  onClose,
}: ModalProps) => {
  const positionStyle = () => {
    if (position) {
      return 'absolute left-1/2 -translate-x-1/2'
    }
    if (centered) {
      return 'absolute-center'
    }
    return 'absolute left-1/2 -translate-x-1/2 top-1/4'
  }

  const fullScreenStyle = (): string[] => {
    const screenStyle = fullScreens?.map(screen => {
      if (screen === 'mobile')
        return `only-mobile:max-w-full only-mobile:h-full only-mobile:rounded-none only-mobile:translate-x-0 only-mobile:translate-y-0 only-mobile:!top-0 only-mobile:!left-0 only-mobile:!bottom-0 only-mobile:!right-0`
      if (screen === 'tablet')
        return `only-tablet:max-w-full only-tablet:h-full only-tablet:rounded-none only-tablet:translate-x-0 only-tablet:translate-y-0 only-tablet:!top-0 only-tablet:!left-0 only-tablet:!bottom-0 only-tablet:!right-0`
      if (screen === 'laptop')
        return `only-laptop:max-w-full only-laptop:h-full only-laptop:rounded-none only-laptop:translate-x-0 only-laptop:translate-y-0 only-laptop:!top-0 only-laptop:!left-0 only-laptop:!bottom-0 only-laptop:!right-0`
      if (screen === 'desktop')
        return `only-desktop:max-w-full only-desktop:h-full only-desktop:rounded-none only-desktop:translate-x-0 only-desktop:translate-y-0 only-desktop:!top-0 only-desktop:!left-0 only-desktop:!bottom-0 only-desktop:!right-0`
      return `max-w-full h-full rounded-none !translate-x-0 !translate-y-0 !top-0 !left-0 !bottom-0 !right-0`
    })

    if (screenStyle && screenStyle?.length > 0) {
      return [...screenStyle]
    }
    return []
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative !z-modal" onClose={onClose}>
        <Transition.Child as={Fragment} {...transitionProps}>
          <Dialog.Overlay className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <Transition.Child as={Fragment} {...transitionProps}>
            <div className="h-full w-full">
              <Dialog.Panel
                className={cls(
                  'w-[calc(100%_-_32px)] max-w-[400px] rounded bg-white text-left align-middle shadow-xl transition-all',
                  contentStyle ?? '',
                  positionStyle(),
                  ...fullScreenStyle(),
                )}
                style={{
                  maxWidth: width,
                  ...position,
                }}
              >
                {close && (
                  <div
                    className="absolute right-12 top-12 flex h-32 w-32 cursor-pointer items-center justify-center"
                    onClick={onClose}
                  >
                    <ICONS.Close1 className="text-2xl" />
                  </div>
                )}
                {title && (
                  <Header
                    title={title}
                    titleStyle={titleStyle}
                    titleProps={titleProps}
                  />
                )}
                <div className="text-black">{children}</div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

const Header = ({
  title,
  titleStyle,
  titleProps,
}: {
  title?: string
  titleStyle?: string
  titleProps?: { as?: ElementType }
}) => {
  return (
    <Dialog.Title
      as="h3"
      className={cls(
        'border-b border-rocket-haze px-24 py-16 font-bold',
        titleStyle ?? '',
      )}
      {...titleProps}
    >
      {title}
    </Dialog.Title>
  )
}

export default Modal
