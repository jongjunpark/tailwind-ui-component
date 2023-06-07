import type { ElementType, ReactNode } from 'react'
import { Fragment, useState } from 'react'

import { Popover as HeadlessPopover } from '@headlessui/react'
import type * as PopperJS from '@popperjs/core'
import { usePopper } from 'react-popper'

import Transition from './Transition'

import { cls } from '../utils/common'

interface DropdownItemProps {
  label: string
  icon?: ReactNode
  url?: string
  isBlank?: boolean
  onClick?: () => void
}

interface TransitionType {
  enter?: string
  enterFrom?: string
  enterTo?: string
  leave?: string
  leaveFrom?: string
  leaveTo?: string
}

interface MenuItemsProps {
  as?: ElementType
  static?: boolean
  unmount?: undefined
}

interface MenuItemProps {
  as?: ElementType
  disabled?: boolean
}

interface DropdownProps {
  items: DropdownItemProps[][]
  placement?: PopperJS.Placement
  offset?: number[]
  menuProps?: { as?: ElementType }
  menuItemsProps?: MenuItemsProps
  menuItemsStyle?: string
  menuItemProps?: MenuItemProps
  menuItemStyle?: string
  transitionProps?: TransitionType
  children: ReactNode
}

const transitionPropsDefault = {
  enter: 'transition ease-out duration-200',
  enterFrom: 'opacity-0 translate-y-1',
  enterTo: 'opacity-100 translate-y-0',
  leave: 'transition ease-in duration-150',
  leaveFrom: 'opacity-100 translate-y-0',
  leaveTo: 'opacity-0 translate-y-1',
}

const Dropdown = ({
  items,
  placement = 'bottom-start',
  offset,
  menuProps,
  menuItemsProps,
  menuItemsStyle,
  menuItemProps,
  menuItemStyle,
  children,
  transitionProps = transitionPropsDefault,
}: DropdownProps) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>()
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: { offset: [offset?.[0] ?? 0, offset?.[1] ?? 0] },
      },
    ],
  })

  if (items.length === 0) return null

  const defaultMenuItemsStyle =
    'bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'

  return (
    <HeadlessPopover className="relative" {...menuProps}>
      {({ open }) => (
        <Fragment>
          <HeadlessPopover.Button
            ref={setReferenceElement}
            className={cls(
              'focus:outline-none',
              open ? '[&_svg]:rotate-180' : '',
            )}
          >
            {children}
          </HeadlessPopover.Button>
          <Transition {...transitionProps}>
            <HeadlessPopover.Panel
              ref={setPopperElement}
              style={styles.popper}
              className={cls(
                'absolute z-10',
                menuItemsStyle ?? defaultMenuItemsStyle,
              )}
              {...attributes.popper}
              {...menuItemsProps}
            >
              <Fragment>
                {items.map((group, index) => (
                  <ItemGroup
                    key={index}
                    group={group}
                    menuItemProps={menuItemProps}
                    menuItemStyle={menuItemStyle}
                  />
                ))}
              </Fragment>
            </HeadlessPopover.Panel>
          </Transition>
        </Fragment>
      )}
    </HeadlessPopover>
  )
}

const ItemGroup = ({
  group,
  menuItemProps,
  menuItemStyle,
}: {
  group: DropdownItemProps[]
  menuItemProps?: MenuItemProps
  menuItemStyle?: string
}) => {
  return (
    <ul role="menu">
      {group.map((item, index) => (
        <Item
          {...item}
          key={index}
          menuItemProps={menuItemProps}
          menuItemStyle={menuItemStyle}
        />
      ))}
    </ul>
  )
}

const Item = ({
  label,
  icon,
  url,
  isBlank,
  menuItemProps,
  menuItemStyle,
  ...rest
}: {
  label: string
  icon?: ReactNode
  url?: string
  isBlank?: boolean
  menuItemProps?: MenuItemProps
  menuItemStyle?: string
}) => {
  const defaultMenuItemStyle =
    'flex items-center w-full px-16 leading-36 text-sm cursor-pointer text-gray-900 whitespace-nowrap hover:bg-gray-100'

  return (
    <li key={label} {...menuItemProps}>
      <a
        href={url}
        target={isBlank ? '_blank' : undefined}
        role="menuitem"
        className={menuItemStyle ?? defaultMenuItemStyle}
        {...rest}
      >
        {icon && <div>{icon}</div>}
        {label}
      </a>
    </li>
  )
}

export default Dropdown
