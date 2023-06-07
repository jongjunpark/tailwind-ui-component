import type { ReactNode } from 'react'
import { Fragment, useEffect } from 'react'

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

type PlacementType = 'top' | 'bottom' | 'left' | 'right'

interface SidebarProps {
  children: ReactNode
  transitionProps?: TransitionType
  placement?: PlacementType
  open: boolean
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

export const Sidebar = ({
  children,
  transitionProps,
  placement = 'right',
  open = false,
  onClose,
}: SidebarProps) => {
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
    enter: 'transform transition ease-in-out duration-300 sm:duration-300',
    enterFrom: 'translate-x-full',
    enterTo: 'translate-x-0',
    leave: 'transform transition ease-in-out duration-300 sm:duration-300',
    leaveFrom: 'translate-x-0',
    leaveTo: 'translate-x-full',
  }

  if (placement === 'left') {
    itemTansitionPropsDefault.enterFrom = '-translate-x-full'
    itemTansitionPropsDefault.enterTo = 'translate-x-0'
    itemTansitionPropsDefault.leaveFrom = 'translate-x-0'
    itemTansitionPropsDefault.leaveTo = '-translate-x-full'
  } else if (placement === 'top') {
    itemTansitionPropsDefault.enterFrom = '-translate-y-full'
    itemTansitionPropsDefault.enterTo = 'translate-y-0'
    itemTansitionPropsDefault.leaveFrom = 'translate-y-0'
    itemTansitionPropsDefault.leaveTo = '-translate-y-full'
  } else if (placement === 'bottom') {
    itemTansitionPropsDefault.enterFrom = 'translate-y-full'
    itemTansitionPropsDefault.enterTo = 'translate-y-0'
    itemTansitionPropsDefault.leaveFrom = 'translate-y-0'
    itemTansitionPropsDefault.leaveTo = 'translate-y-full'
  }

  return (
    <Transition appear unmount={false} show={open} as={Fragment}>
      <div className="relative z-10">
        <Transition.Child
          as={Fragment}
          appear
          unmount={false}
          {...transitionPropsDefault}
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div
          id="sidebar-wrapper"
          className="fixed inset-0 overflow-hidden"
          onClick={e => {
            if ((e.target as HTMLElement).id === 'sidebar-wrapper') {
              onClose()
            }
          }}
        >
          <Transition.Child
            as={Fragment}
            appear
            unmount={false}
            {...itemTansitionPropsDefault}
            {...transitionProps}
          >
            <div
              className={cls(
                'absolute',
                placement === 'right' ? 'right-0 top-0 h-full' : '',
                placement === 'left' ? 'left-0 top-0 h-full' : '',
                placement === 'top' ? 'inset-x-0 top-0 w-full' : '',
                placement === 'bottom' ? 'inset-x-0 bottom-0 w-full' : '',
              )}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition>
  )
}
