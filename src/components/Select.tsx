import tw, { TwStyle } from 'twin.macro'
import React, { useEffect, useRef, useState } from 'react'
import { Popover as HeadlessPopover } from '@headlessui/react'
import { usePopper } from 'react-popper'
import Transition from './Transition'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface TransitionType {
  enter?: TwStyle
  enterFrom?: TwStyle
  enterTo?: TwStyle
  leave?: TwStyle
  leaveFrom?: TwStyle
  leaveTo?: TwStyle
}

interface SelectItemType {
  value: string
  name?: string | React.ReactNode
  selectedName?: string | React.ReactNode
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
    as?: React.ElementType
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
    name?: string | React.ReactNode,
    selectedName?: string | React.ReactNode,
  ) => void
  placeholder?: string
  showArrow?: boolean
  arrow?: React.ReactNode
  inputStyle?: TwStyle
  inputItemStyle?: TwStyle
  showSearch?: boolean
}

const transitionPropsDefault = {
  enter: tw`transition ease-out duration-200`,
  enterFrom: tw`opacity-0 -translate-y-1`,
  enterTo: tw`opacity-100 translate-y-0`,
  leave: tw`transition ease-in duration-150`,
  leaveFrom: tw`opacity-100 translate-y-0`,
  leaveTo: tw`opacity-0 -translate-y-1`,
}

export default function Select({
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
}: SelectProps) {
  const [selected, setSelected] = useState<string | undefined>(initialValue)
  const [query, setQuery] = useState('')
  const [isFocus, setIsFocus] = useState(false)
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
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
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
      items?.[selectedItemIndex]?.selectedName ??
      items?.[selectedItemIndex]?.value
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
    <HeadlessPopover tw="relative w-full h-full">
      <>
        <HeadlessPopover.Button
          ref={setReferenceElement}
          tw="w-full h-full"
          disabled={disabled}
        >
          <div
            css={[
              tw`relative w-full h-full p-4 flex items-center gap-1 cursor-pointer overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm`,
              disabled && tw`cursor-not-allowed`,
              showArrow && tw`pr-10`,
              inputStyle,
            ]}
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
                css={[tw`outline-0 w-full`]}
              />
            ) : (
              <div tw="text-ellipsis overflow-hidden whitespace-nowrap">
                {getItemValue()}
              </div>
            )}
            {showArrow && (
              <div tw="absolute top-1/2 right-3 -translate-y-1/2">
                {arrow ?? <ChevronDownIcon tw="w-5 h-5" />}
              </div>
            )}
            {placeholder && !showSearch && !selected && (
              <div tw="w-full text-ellipsis overflow-hidden whitespace-nowrap text-gray-500">
                {placeholder}
              </div>
            )}
          </div>
        </HeadlessPopover.Button>
        <Transition {...transitionProps}>
          <HeadlessPopover.Panel
            ref={setPopperElement}
            style={styles.popper}
            css={[tw`absolute z-10`]}
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

function SelectItems({
  items,
  inputItemStyle,
  selected,
  close,
  handleClickItem,
  scrollBox,
  selectedRef,
}: {
  items: SelectItemType[]
  inputItemStyle?: TwStyle
  selected: string | undefined
  close: () => void
  handleClickItem: (item: SelectItemType, close: () => void) => void
  scrollBox?: React.RefObject<HTMLDivElement>
  selectedRef?: React.RefObject<HTMLDivElement>
}) {
  return (
    <>
      {items?.length > 0 ? (
        <div
          tw="bg-white p-1 rounded max-h-64 overflow-y-auto [box-shadow: 0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%), 0 9px 28px 8px rgb(0 0 0 / 5%)]"
          ref={scrollBox}
        >
          {items?.map(item => (
            <div
              key={item?.value}
              css={[
                tw`cursor-pointer px-4 py-2 text-sm transition hover:(bg-gray-100)`,
                inputItemStyle,
                selected === item?.value && tw`bg-gray-100`,
              ]}
              onClick={() => handleClickItem(item, close)}
              ref={selected === item?.value ? selectedRef : null}
            >
              {item?.name ?? item?.value}
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}
