import tw, { TwStyle } from 'twin.macro'
import React, { Fragment, useState } from 'react'
import { Popover as HeadlessPopover } from '@headlessui/react'
import type * as PopperJS from '@popperjs/core'
import { usePopper } from 'react-popper'
import Transition from './Transition'

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
  placement?: PopperJS.Placement
  offset?: number[]
  menuProps?: { as?: React.ElementType }
  menuItemsProps?: MenuItemsProps
  menuItemsStyle?: TwStyle
  menuItemProps?: MenuItemProps
  menuItemStyle?: TwStyle
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

export default function Dropdown({
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
}: DropdownProps) {
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

  const defaultMenuItemsStyle = tw`bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`

  return (
    <HeadlessPopover tw="relative" {...menuProps}>
      {({ open }) => (
        <>
          <HeadlessPopover.Button ref={setReferenceElement}>
            <div css={[open && tw`[& svg]:rotate-180`]}>{children}</div>
          </HeadlessPopover.Button>
          <Transition {...transitionProps}>
            <HeadlessPopover.Panel
              ref={setPopperElement}
              style={styles.popper}
              css={[tw`absolute z-10`, menuItemsStyle ?? defaultMenuItemsStyle]}
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
        </>
      )}
    </HeadlessPopover>
  )
}

function ItemGroup({
  group,
  menuItemProps,
  menuItemStyle,
}: {
  group: DropdownItems[]
  menuItemProps?: MenuItemProps
  menuItemStyle?: TwStyle
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
  menuItemStyle?: TwStyle
}) {
  const defaultMenuItemStyle = tw`flex rounded-md items-center w-full p-2 text-sm cursor-pointer text-gray-900 hover:(bg-violet-500 text-white)`

  return (
    <div key={label} {...menuItemProps}>
      <a href={url} css={[menuItemStyle ?? defaultMenuItemStyle]} {...rest}>
        {icon && <div>{icon}</div>}
        {label}
      </a>
    </div>
  )
}
