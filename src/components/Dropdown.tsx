import tw, { TwStyle } from 'twin.macro'
import React, { Fragment } from 'react'
import { Menu } from '@headlessui/react'
import Transition from './Transition'

export type DropdownPlacement =
  | 'bottom left'
  | 'bottom right'
  | 'top left'
  | 'top right'
  | 'custom'

interface DropdownItems {
  label: string
  icon?: React.ReactNode
  url?: string
  onClick?: () => void
}

interface TransitionType {
  enter?: TwStyle
  enterFrom?: TwStyle
  enterTo?: TwStyle
  leave?: TwStyle
  leaveFrom?: TwStyle
  leaveTo?: TwStyle
}

interface MenuItemsProps {
  as?: React.ElementType
  static?: boolean
  unmount?: undefined
}

interface MenuItemProps {
  as?: React.ElementType
  disabled?: boolean
}

interface DropdownProps {
  items: DropdownItems[][]
  placement?: DropdownPlacement
  position?: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  menuProps?: { as?: React.ElementType }
  menuItemsProps?: MenuItemsProps
  menuItemsStyle?: TwStyle
  menuItemProps?: MenuItemProps
  menuItemStyle?: (active: boolean) => TwStyle[]
  transitionProps?: TransitionType
  children: React.ReactNode
}

const transitionPropsDefault = {
  enter: tw`ease-out duration-100`,
  enterFrom: tw`opacity-0 scale-75`,
  enterTo: tw`opacity-100 scale-100`,
  leave: tw`ease-in duration-75`,
  leaveFrom: tw`opacity-100 scale-100`,
  leaveTo: tw`opacity-0 scale-95`,
}

export default function Dropdown({
  items,
  placement = 'bottom left',
  position,
  menuProps,
  menuItemsProps,
  menuItemsStyle,
  menuItemProps,
  menuItemStyle,
  children,
  transitionProps = transitionPropsDefault,
}: DropdownProps) {
  if (items.length === 0) return null

  const defaultMenuItemsStyle = tw`bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`

  return (
    <Menu
      as="div"
      tw="relative inline-block text-left focus-within:z-10"
      {...menuProps}
    >
      {({ open }) => (
        <Fragment>
          <Menu.Button>
            <div css={[open && tw`[& svg]:rotate-180`]}>{children}</div>
          </Menu.Button>
          <Transition {...transitionProps} tw="absolute w-full h-full top-0">
            <Menu.Items
              css={[
                tw`absolute`,
                placement === 'bottom left' && tw`top-full left-0`,
                placement === 'bottom right' && tw`top-full right-0`,
                placement === 'top left' && tw`bottom-full left-0`,
                placement === 'top right' && tw`bottom-full right-0`,
                placement === 'custom' && { ...position },
                menuItemsStyle ?? defaultMenuItemsStyle,
              ]}
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
            </Menu.Items>
          </Transition>
        </Fragment>
      )}
    </Menu>
  )
}

function ItemGroup({
  group,
  menuItemProps,
  menuItemStyle,
}: {
  group: DropdownItems[]
  menuItemProps?: MenuItemProps
  menuItemStyle?: (active: boolean) => TwStyle[]
}) {
  return (
    <div tw="p-1">
      {group.map((item, index) => (
        <Item
          {...item}
          key={index}
          menuItemProps={menuItemProps}
          menuItemStyle={menuItemStyle}
        />
      ))}
    </div>
  )
}

function Item({
  label,
  icon,
  url,
  menuItemProps,
  menuItemStyle,
  ...rest
}: {
  label: string
  icon?: React.ReactNode
  url?: string
  menuItemProps?: MenuItemProps
  menuItemStyle?: (active: boolean) => TwStyle[]
}) {
  const defaultMenuItemStyle = (active: boolean) => {
    return [
      active ? tw`bg-violet-500 text-white` : tw`text-gray-900`,
      tw`flex rounded-md items-center w-full p-2 text-sm cursor-pointer`,
    ]
  }

  return (
    <Menu.Item key={label} {...menuItemProps}>
      {({ active }: { active: boolean }) => (
        <a
          href={url}
          css={[
            menuItemStyle
              ? menuItemStyle(active)
              : defaultMenuItemStyle(active),
          ]}
          {...rest}
        >
          {icon && <div>{icon}</div>}
          {label}
        </a>
      )}
    </Menu.Item>
  )
}
