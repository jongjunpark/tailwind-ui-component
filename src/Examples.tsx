import React from 'react'
import tw, { TwStyle } from 'twin.macro'
import {
  Dropdown,
  Popover,
  Modal,
  Tooltip,
  Select,
  Autocomplete,
  Toggle,
  Disclosure,
  RadioGroup,
  Tabs,
  Icons,
} from './components'
import {
  CheckIcon,
  ChevronUpDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'
import TransitionDemo from './components/TransitionDemo'
import ICONS from './icons'

/**
 * Headless UI usage examples
 */

export default function Examples() {
  const dropdownItems = [
    [
      {
        label: 'Edit',
        icon: <ICONS.Edit tw="w-5 h-5 mr-2" />,
        url: '/test',
      },
      {
        label: 'Duplicate',
        icon: <ICONS.Duplicate tw="w-5 h-5 mr-2" />,
      },
    ],
    [
      {
        label: 'Archive',
        icon: <ICONS.Archive tw="w-5 h-5 mr-2" />,
      },
      {
        label: 'Move',
        icon: <ICONS.Move tw="w-5 h-5 mr-2" />,
      },
    ],
    [
      {
        label: 'Delete',
        icon: <ICONS.Delete tw="w-5 h-5 mr-2" />,
      },
    ],
  ]

  const PopoverContent = () => {
    const PopoverItemStyle = tw`py-1 px-2 border border-gray-400/70 rounded cursor-pointer hover:text-blue-700 transition-all`

    return (
      <div tw="bg-white pt-4 pb-5 px-6 rounded w-[400px]">
        <h3 tw="text-lg mb-2 font-extrabold">카테고리별 검색</h3>
        <div tw="flex flex-wrap gap-2">
          <a href="/people" css={[PopoverItemStyle]}>
            사람
          </a>
          <a css={[PopoverItemStyle]}>기업</a>
          <a css={[PopoverItemStyle]}>채용</a>
        </div>
      </div>
    )
  }

  return (
    <Container>
      <Dropdown
        items={dropdownItems}
        placement="bottom-start"
        menuItemStyle={tw`flex rounded-md items-center w-full p-2 text-sm cursor-pointer text-gray-900 hover:(bg-amber-500 text-white)`}
      >
        <div tw="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)">
          <span>hi</span>
          <ChevronDownIcon tw="w-5 h-5 ml-2" />
        </div>
      </Dropdown>

      <Popover
        placement="bottom-start"
        content={<PopoverContent />}
        offset={[8, 12]}
      >
        <div tw="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)">
          <span>Open Popover</span>
        </div>
      </Popover>
      <Tooltip
        content="tooltip!"
        trigger="click"
        placement="bottom"
        offset={[0, 12]}
      >
        <div tw="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)">
          <span>Tooltip</span>
        </div>
      </Tooltip>

      {/* <Select
        items={[
          { name: 'Wade Cooper' },
          { name: 'Arlene Mccoy' },
          { name: 'Devon Webb' },
          { name: 'Tom Cook' },
          { name: 'Tanya Fox' },
          { name: 'Hellen Schmidt' },
        ]}
      />

      <Modal
        contentProps={{
          title: 'Payment successful',
          content: (
            <p>
              Your payment has been successfully submitted. We’ve sent you an
              email with all of the details of your order.
            </p>
          ),
          closeLabel: 'Got it, thanks!',
        }}
      >
        Open dialog
      </Modal>

      <Autocomplete
        items={[
          { name: 'Wade Cooper' },
          { name: 'Arlene Mccoy' },
          { name: 'Devon Webb' },
          { name: 'Tom Cook' },
          { name: 'Tanya Fox' },
          { name: 'Hellen Schmidt' },
        ]}
      />

      <Toggle
        label="Enable notifications"
        description="For extra noise"
        groupProps={{}}
        labelProps={{}}
        descriptionProps={{}}
        switchProps={{}}
      />

      <Disclosure
        items={[
          {
            heading: 'What is your refund policy?',
            content:
              'If you’re unhappy with your purchase for any reason, email us within 90 days and we’ll refund you in full, no questions asked.',
          },
          {
            heading: 'Do you offer technical support?',
            content: 'No.',
          },
        ]}
      />

      <RadioGroup
        screenReaderLabel="Server size"
        items={[
          {
            name: 'Startup',
            ram: '12GB',
            cpus: '6 CPUs',
            disk: '160 GB SSD disk',
          },
          {
            name: 'Business',
            ram: '16GB',
            cpus: '8 CPUs',
            disk: '512 GB SSD disk',
          },
          {
            name: 'Enterprise',
            ram: '32GB',
            cpus: '12 CPUs',
            disk: '1024 GB SSD disk',
          },
        ]}
      />

      <TransitionDemo />

      <Tabs
        items={{
          Recent: [
            {
              id: 1,
              title: 'Does drinking coffee make you smarter?',
              date: '5h ago',
              commentCount: 5,
              shareCount: 2,
            },
            {
              id: 2,
              title: "So you've bought coffee... now what?",
              date: '2h ago',
              commentCount: 3,
              shareCount: 2,
            },
          ],
          Popular: [
            {
              id: 1,
              title: 'Is tech making coffee better or worse?',
              date: 'Jan 7',
              commentCount: 29,
              shareCount: 16,
            },
            {
              id: 2,
              title: 'The most innovative things happening in coffee',
              date: 'Mar 19',
              commentCount: 24,
              shareCount: 12,
            },
          ],
          Trending: [
            {
              id: 1,
              title:
                'Ask Me Anything: 10 answers to your questions about coffee',
              date: '2d ago',
              commentCount: 9,
              shareCount: 5,
            },
            {
              id: 2,
              title: "The worst advice we've ever heard about coffee",
              date: '4d ago',
              commentCount: 1,
              shareCount: 2,
            },
          ],
        }}
        tabGroupProps={{}}
      /> */}
    </Container>
  )
}

/**
 * Usage example ends here =====================================================
 */

const exampleData: [string, TwStyle, string][] = [
  [
    'Dropdown',
    tw`to-indigo-500 from-purple-500`,
    '링크 목록 등을 표시하기 위해 사용 됨, 주로 네비게이션과 같은 메뉴 표기 용도로 사용되고 카드와 같은 요소에는 popover를 사용',
  ],
  [
    'Popover',
    tw`from-sky-400 to-indigo-500`,
    '추가 정보 또는 작업을 제공하기 위한 팝업 메뉴, 단순 메뉴가 아닌 복잡한 카드형태를 구현하는데에 용이함',
  ],
  [
    'Tooltip',
    tw`from-sky-400 to-indigo-500`,
    '마우스 입력(hover/click)에 표시되며 단순한 텍스트 표기에 사용됨, 간단한 설명을 제공하는데에 사용',
  ],
  // ['Listbox (Select)', tw`from-amber-300 to-orange-500`],
  // ['Combobox (Autocomplete)', tw`from-teal-400 to-cyan-400`],
  // ['Switch (Toggle)', tw`from-green-400 to-cyan-500`],
  // ['Disclosure', tw`from-fuchsia-500 to-purple-600`],
  // ['Popover', tw`from-orange-400 to-pink-600`],
  // ['Radio Group', tw`from-cyan-400 to-sky-500`],
  // ['Transition', tw`from-pink-500 to-rose-500`],
  // ['Tabs', tw`from-sky-400 to-blue-600`],
]

type ExampleProps = {
  className?: string
  children: React.ReactNode
  index: number
}

function Example({ className, children, index }: ExampleProps) {
  const [heading, gradientStyles, description] = exampleData[index] || []
  return (
    <div css={[tw`space-y-4`, gradientStyles]}>
      <h2 tw="font-extrabold text-3xl">{heading}</h2>
      <h3 tw="text-xl font-bold">When To use</h3>
      <p tw="!mb-6">{description}</p>
      <div
        tw="p-10 relative rounded-xl bg-gradient-to-r shadow-lg text-black"
        {...{ className }}
      >
        {children}
      </div>
    </div>
  )
}

function Container({ children }: { children: React.ReactNode[] }) {
  if (!children) return null

  return (
    <div tw="flex flex-col items-center py-36">
      <div tw="w-full max-w-[700px] space-y-20">
        {children.map((item, index) => (
          <Example key={index} index={index}>
            {item}
          </Example>
        ))}
      </div>
    </div>
  )
}
