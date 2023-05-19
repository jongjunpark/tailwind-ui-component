import React, { useEffect, useState } from 'react'
import tw, { TwStyle } from 'twin.macro'
import {
  Dropdown,
  Popover,
  Modal,
  Tooltip,
  Sidebar,
  Breadcrumb,
  Select,
  Pagination,
} from './components'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import ICONS from './icons'
import usePagination from './hooks/usePagination'
import { DropdownItems } from './samples/DropdownItems'
import PopoverContent from './samples/PopoverContent'
import SidebarContent from './samples/SidebarContent'
import { SelectItems } from './samples/SelectItems'
import axios from 'axios'

interface ContentType {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  UserId: number
  User: {
    name: string
    username: string
    email: string
  }
}

export default function Examples() {
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [modalShow2, setModalShow2] = useState<boolean>(false)
  const [sidebarShow, setSidebarShow] = useState<boolean>(false)
  const [selectValue, setSelectValue] = useState<string>('')
  const [contents, setContents] = useState<ContentType[]>([])
  const {
    page,
    pageButtons,
    pageSize,
    maxPage,
    maxRatio,
    currentRatio,
    setTotalCount,
    setPageSize,
    changePage,
    prevPage,
    nextPage,
  } = usePagination()

  useEffect(() => {
    setPageSize(5)
  }, [])

  useEffect(() => {
    getPaginationSamples(page, pageSize)
  }, [page, pageSize])

  const handleModalClose = () => {
    setModalShow(false)
  }

  const handleModalClose2 = () => {
    setModalShow2(false)
  }

  const handleSidebarClose = () => {
    setSidebarShow(false)
  }

  const getPaginationSamples = async (page: number, pageSize: number) => {
    const result = await axios.get('https://koreanjson.com/comments')
    setTotalCount(result?.data?.length)
    const paged = result?.data?.slice((page - 1) * pageSize, page * pageSize)
    setContents(paged)
  }

  return (
    <Container>
      <Dropdown
        items={DropdownItems}
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
          <SidebarContent setSidebarShow={setSidebarShow} />
        </Sidebar>
      </div>

      <div tw="w-48 h-10">
        <Select
          items={SelectItems}
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

      <div tw="flex flex-col gap-4">
        {contents?.map(content => (
          <div tw="p-4 border border-gray-600 rounded-lg">
            <div tw="mb-1">
              <span tw="font-bold">{content.User?.username}</span>
              <span tw="text-gray-500 text-sm ml-2">
                {new Date(content.updatedAt).toLocaleString()}
              </span>
            </div>
            <div>{content.content}</div>
          </div>
        ))}
        <Pagination
          page={page}
          pageButtons={pageButtons}
          maxPage={maxPage}
          maxRatio={maxRatio}
          currentRatio={currentRatio}
          changePage={changePage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
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
  [
    'Pagination',
    tw`from-white to-white`,
    '컨텐츠를 여러 페이지로 분리하여 탐색 및 이동할 수 있도록 도와주는데에 사용',
  ],
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
