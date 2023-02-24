import React, { useState } from 'react'
import tw, { TwStyle } from 'twin.macro'
import {
  Dropdown,
  Popover,
  Modal,
  Tooltip,
  Sidebar,
  Breadcrumb,
  Select,
  Autocomplete,
  Toggle,
  Disclosure,
  RadioGroup,
  Tabs,
  Icons,
} from './components'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import TransitionDemo from './components/TransitionDemo'
import ICONS from './icons'

/**
 * Headless UI usage examples
 */

export default function Examples() {
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [modalShow2, setModalShow2] = useState<boolean>(false)
  const [sidebarShow, setSidebarShow] = useState<boolean>(false)
  const [selectValue, setSelectValue] = useState<string>('')

  const handleModalClose = () => {
    setModalShow(false)
  }

  const handleModalClose2 = () => {
    setModalShow2(false)
  }

  const handleSidebarClose = () => {
    setSidebarShow(false)
  }

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

  const SidebarContent = () => {
    const LinkItem = ({ url, content }: any) => {
      return (
        <li tw="py-3 px-6 text-center cursor-pointer hover:(bg-gray-100)">
          <a href={url}>{content}</a>
        </li>
      )
    }

    return (
      <nav tw="bg-white w-60 h-full">
        <div tw="flex justify-between items-center mb-6 pt-4 px-6">
          <div
            tw="w-8 h-8 cursor-pointer"
            onClick={() => setSidebarShow(false)}
          >
            <ICONS.Close />
          </div>
          <div tw="w-8 h-8">
            <ICONS.Logo />
          </div>
        </div>
        <ul>
          <LinkItem url="/" content="홈" />
          <LinkItem url="/people" content="사람" />
          <LinkItem url="/companies" content="기업" />
          <LinkItem url="job" content="채용" />
        </ul>
      </nav>
    )
  }

  const selectItems = [
    {
      value: '+82',
      name: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/17/south-korea-162427__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div>대한민국</div>
          <div tw="text-gray-600">+82</div>
        </div>
      ),
      selectedName: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/17/south-korea-162427__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div tw="text-gray-600">+82</div>
        </div>
      ),
    },
    {
      value: '+233',
      name: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2015/11/06/13/29/union-jack-1027898__340.jpg"
            alt=""
            tw="w-6 h-4"
          />
          <div>영국</div>
          <div tw="text-gray-600">+233</div>
        </div>
      ),
      selectedName: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2015/11/06/13/29/union-jack-1027898__340.jpg"
            alt=""
            tw="w-6 h-4"
          />
          <div tw="text-gray-600">+233</div>
        </div>
      ),
    },
    {
      value: '+123',
      name: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2017/03/14/21/00/american-flag-2144392__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div>미국</div>
          <div tw="text-gray-600">+123</div>
        </div>
      ),
      selectedName: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2017/03/14/21/00/american-flag-2144392__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div tw="text-gray-600">+123</div>
        </div>
      ),
    },
    {
      value: '+23',
      name: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2018/01/26/17/15/swiss-flag-3109178__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div>스위스</div>
          <div tw="text-gray-600">+23</div>
        </div>
      ),
      selectedName: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2018/01/26/17/15/swiss-flag-3109178__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div tw="text-gray-600">+23</div>
        </div>
      ),
    },
    {
      value: '+65',
      name: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/17/sweden-162433__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div>스웨덴</div>
          <div tw="text-gray-600">+65</div>
        </div>
      ),
      selectedName: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/17/sweden-162433__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div tw="text-gray-600">+65</div>
        </div>
      ),
    },
    {
      value: '+32',
      name: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/15/greece-162304__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div>그리스</div>
          <div tw="text-gray-600">+32</div>
        </div>
      ),
      selectedName: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/15/greece-162304__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div tw="text-gray-600">+32</div>
        </div>
      ),
    },
    {
      value: '+53',
      name: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/17/saudi-arabia-162413__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div tw="[flex-shrink: 0]">사우디아라비아</div>
          <div tw="text-gray-600">+53</div>
        </div>
      ),
      selectedName: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/17/saudi-arabia-162413__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div tw="text-gray-600">+53</div>
        </div>
      ),
    },
    {
      value: '+12',
      name: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/15/japan-162328__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div>일본</div>
          <div tw="text-gray-600">+12</div>
        </div>
      ),
      selectedName: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/15/japan-162328__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div tw="text-gray-600">+12</div>
        </div>
      ),
    },
    {
      value: '+50',
      name: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/16/netherlands-162372__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div>네덜란드</div>
          <div tw="text-gray-600">+50</div>
        </div>
      ),
      selectedName: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/16/netherlands-162372__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div tw="text-gray-600">+50</div>
        </div>
      ),
    },
    {
      value: '+40',
      name: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/15/france-162295__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div>프랑스</div>
          <div tw="text-gray-600">+40</div>
        </div>
      ),
      selectedName: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/15/france-162295__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div tw="text-gray-600">+40</div>
        </div>
      ),
    },
    {
      value: '+30',
      name: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/15/germany-162301__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div>독일</div>
          <div tw="text-gray-600">+30</div>
        </div>
      ),
      selectedName: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/15/germany-162301__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div tw="text-gray-600">+30</div>
        </div>
      ),
    },
    {
      value: '+20',
      name: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/17/senegal-162414__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div>세네갈</div>
          <div tw="text-gray-600">+20</div>
        </div>
      ),
      selectedName: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/17/senegal-162414__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div tw="text-gray-600">+20</div>
        </div>
      ),
    },
    {
      value: '+10',
      name: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/17/spain-162428__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div>스페인</div>
          <div tw="text-gray-600">+10</div>
        </div>
      ),
      selectedName: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/17/spain-162428__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div tw="text-gray-600">+10</div>
        </div>
      ),
    },
    {
      value: '+128',
      name: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/17/turkey-162445__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div>터키</div>
          <div tw="text-gray-600">+128</div>
        </div>
      ),
      selectedName: (
        <div tw="flex gap-2 items-center [width: max-content]">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/14/17/turkey-162445__340.png"
            alt=""
            tw="w-6 h-4"
          />
          <div tw="text-gray-600">+120</div>
        </div>
      ),
    },
  ]

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
        <button tw="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)">
          <span>Open Popover</span>
        </button>
      </Popover>
      <Tooltip
        content="tooltip!"
        trigger="hover"
        placement="bottom"
        offset={[0, 12]}
      >
        <button tw="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)">
          <span>Tooltip</span>
        </button>
      </Tooltip>

      <div>
        <button
          type="button"
          tw="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)"
          onClick={() => setModalShow(true)}
        >
          Modal On
        </button>
        <button
          type="button"
          tw="px-4 py-2 ml-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)"
          onClick={() => setModalShow2(true)}
        >
          Full Modal On
        </button>
        <Modal
          title="Payment successful"
          open={modalShow}
          onClose={handleModalClose}
          width="400px"
          centered
        >
          <div tw="flex flex-col gap-2">
            <div>test1</div>
            <div>test2</div>
            <button
              tw="border border-gray-400 rounded-md cursor-pointer mt-1.5 py-1 hover:(border-blue-500 text-blue-500)"
              onClick={() => setModalShow(false)}
            >
              close
            </button>
          </div>
        </Modal>
        <Modal
          title="Payment successful"
          open={modalShow2}
          onClose={handleModalClose2}
          close
          fullScreens={['mobile', 'desktop']}
        >
          <div tw="flex flex-col gap-2">
            <div>test1</div>
            <div>test2</div>
            <button
              tw="border border-gray-400 rounded-md cursor-pointer mt-1.5 py-1 hover:(border-blue-500 text-blue-500)"
              onClick={() => setModalShow2(false)}
            >
              close
            </button>
          </div>
        </Modal>
      </div>

      <div>
        <button
          type="button"
          tw="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)"
          onClick={() => setSidebarShow(true)}
        >
          Sidebar On
        </button>
        <Sidebar
          open={sidebarShow}
          onClose={handleSidebarClose}
          placement="left"
        >
          <SidebarContent />
        </Sidebar>
      </div>

      <div tw="w-48 h-10">
        <Select
          items={selectItems}
          onChange={value => {
            setSelectValue(value)
          }}
          value={selectValue}
          showArrow
          arrow={
            <div tw="w-5 h-5">
              <ICONS.Logo />
            </div>
          }
          placeholder="지역번호를 입력하세요"
        />
      </div>

      <Breadcrumb
        items={[
          {
            name: '홈',
            url: '/',
          },
          {
            name: '계정',
            url: '',
          },
          {
            name: '내 정보',
            url: '/my-inform',
            disabled: true,
          },
          {
            name: '수정',
            url: '/my-inform/edit',
          },
          {
            name: '탈퇴',
            url: '/my-inform/edit/withdraw',
          },
        ]}
      />

      {/* <Autocomplete
        items={[
          { name: 'Wade Cooper' },
          { name: 'Arlene Mccoy' },
          { name: 'Devon Webb' },
          { name: 'Tom Cook' },
          { name: 'Tanya Fox' },
          { name: 'Hellen Schmidt' },
        ]}
      /> */}

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
    tw`from-orange-600 to-yellow-600`,
    '마우스 입력(hover/click)에 표시되며 단순한 텍스트 표기에 사용됨, 간단한 설명을 제공하는데에 사용',
  ],
  [
    'Modal',
    tw`from-emerald-600 to-teal-900`,
    '새 페이지로 이동하지 않고 현재 페이지 위에 새로운 박스를 팝업형식으로 띄우는데에 사용',
  ],
  [
    'Sidebar',
    tw`from-cyan-600 to-blue-600`,
    '측면에 메뉴를 숨겨두고 사용하는데에 사용',
  ],
  [
    'Select (Autocomplete)',
    tw`from-pink-500 to-rose-500`,
    'Select 태그의 커스텀 버전',
  ],
  [
    'Breadcrumb',
    tw`from-white to-white`,
    '시스템의 계층을 알려주는데에 사용 혹은 현재 페이지의 위치를 알려줌',
  ],
  // ['Listbox (Select)', tw`from-amber-300 to-orange-500`],
  // ['Switch (Toggle)', tw`from-green-400 to-cyan-500`],
  // ['Disclosure', tw`from-fuchsia-500 to-purple-600`],
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
