import type { ReactNode, ElementType, RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

import { Popover as HeadlessPopover } from '@headlessui/react'
import { usePopper } from 'react-popper'

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

interface SelectItemType {
  value: string
  name?: string | ReactNode
  selectedName?: string | ReactNode
}

type PlacementType =
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'top'
  | 'top-start'
  | 'top-end'

interface SelectProps {
  items: SelectItemType[]
  placement?: PlacementType
  offset?: number[]
  panelProps?: {
    as?: ElementType
    focus?: boolean
    static?: boolean
    unmount?: undefined
  }
  transitionProps?: TransitionType
  disabled?: boolean
  value?: string
  initialValue?: string
  onChange?: (
    value: string,
    name?: string | ReactNode,
    selectedName?: string | ReactNode,
  ) => void
  placeholder?: string
  showArrow?: boolean
  arrow?: ReactNode
  inputStyle?: string
  inputItemStyle?: string
  showSearch?: boolean
}

const transitionPropsDefault = {
  enter: 'transition ease-out duration-200',
  enterFrom: 'opacity-0 -translate-y-4',
  enterTo: 'opacity-100 translate-y-0',
  leave: 'transition ease-in duration-150',
  leaveFrom: 'opacity-100 translate-y-0',
  leaveTo: 'opacity-0 -translate-y-4',
}

export const Select = ({
  items,
  placement = 'bottom-start',
  offset,
  panelProps,
  transitionProps = transitionPropsDefault,
  disabled,
  value,
  initialValue,
  onChange,
  placeholder,
  showArrow,
  arrow,
  inputStyle,
  inputItemStyle,
  showSearch,
}: SelectProps) => {
  const [selected, setSelected] = useState<string | undefined>(initialValue)
  const [query, setQuery] = useState('')
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>()
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: { offset: [offset?.[0] ?? 0, offset?.[1] ?? 8] },
      },
    ],
  })
  const scrollBox = useRef<HTMLDivElement>(null)
  const selectedRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value) {
      setSelected(value)
      setQuery(value)
    }
  }, [value])

  if (!items) return null

  const filteredItems =
    query === ''
      ? items
      : items.filter(item =>
          item.value
            .toLowerCase()
            .replaceAll(/\s+/g, '')
            .includes(query.toLowerCase().replaceAll(/\s+/g, '')),
        )

  const handleClickItem = (item: SelectItemType, close: () => void) => {
    if (value === undefined) {
      setSelected(item.value)
      setQuery(item.value)
    } else {
      onChange && onChange(item.value, item?.name, item?.selectedName)
    }
    close()
  }

  const getItemValue = () => {
    const selectedItemIndex = items.findIndex(item => item.value === selected)

    return (
      items[selectedItemIndex]?.selectedName ?? items[selectedItemIndex]?.value
    )
  }

  const openHandle = (open: boolean) => {
    if (open) {
      searchInputRef.current && searchInputRef.current.focus()
    }
    if (open && scrollBox.current && selectedRef.current) {
      scrollBox.current.scrollTop =
        selectedRef.current.offsetTop - scrollBox.current.offsetTop
    }
  }

  return (
    <HeadlessPopover className="relative h-full w-full">
      <>
        <HeadlessPopover.Button
          ref={setReferenceElement}
          className="h-full w-full focus:outline-none"
          disabled={disabled}
        >
          <div
            className={cls(
              'input relative flex cursor-pointer items-center overflow-hidden',
              disabled ? '!cursor-not-allowed' : '',
              showArrow ? '!pr-32' : '',
              inputStyle ?? '',
            )}
          >
            {/*
              TODO: value만 표기되는 것 추후에 수정 (필요시)
            */}
            {showSearch ? (
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                ref={searchInputRef}
                placeholder={placeholder}
                className="w-full outline-0"
              />
            ) : (
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                {getItemValue()}
              </div>
            )}
            {showArrow && (
              <div className="absolute right-8 top-1/2 -translate-y-1/2">
                {arrow ?? <ICONS.ChevronDown />}
              </div>
            )}
            {placeholder && !showSearch && !selected && (
              <div className="ellipsis w-full text-start text-rocket-hazeDark">
                {placeholder}
              </div>
            )}
          </div>
        </HeadlessPopover.Button>
        <Transition {...transitionProps}>
          <HeadlessPopover.Panel
            ref={setPopperElement}
            style={styles.popper}
            className="absolute z-10 min-w-full"
            {...attributes.popper}
            {...panelProps}
          >
            {({ open, close }) => (
              <>
                {openHandle(open)}
                <SelectItems
                  items={showSearch ? filteredItems : items}
                  inputItemStyle={inputItemStyle}
                  selected={selected}
                  close={close}
                  handleClickItem={handleClickItem}
                  scrollBox={scrollBox}
                  selectedRef={selectedRef}
                />
              </>
            )}
          </HeadlessPopover.Panel>
        </Transition>
      </>
    </HeadlessPopover>
  )
}

const SelectItems = ({
  items,
  inputItemStyle,
  selected,
  close,
  handleClickItem,
  scrollBox,
  selectedRef,
}: {
  items: SelectItemType[]
  inputItemStyle?: string
  selected: string | undefined
  close: () => void
  handleClickItem: (item: SelectItemType, close: () => void) => void
  scrollBox?: RefObject<HTMLDivElement>
  selectedRef?: RefObject<HTMLDivElement>
}) => {
  return (
    <>
      {items.length > 0 ? (
        <div
          className="max-h-256 overflow-y-auto rounded bg-white p-4 shadow-lg"
          ref={scrollBox}
        >
          {items.map(item => (
            <div
              key={item.value}
              className={cls(
                'cursor-pointer whitespace-nowrap px-16 py-8 text-sm transition hover:bg-rocket-ghostDark',
                selected === item.value ? 'bg-rocket-ghost font-bold' : '',
                inputItemStyle ?? '',
              )}
              onClick={() => handleClickItem(item, close)}
              ref={selected === item.value ? selectedRef : null}
            >
              {item?.name ?? item.value}
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}
