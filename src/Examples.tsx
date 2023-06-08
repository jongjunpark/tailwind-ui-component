import React, { useCallback, useEffect, useState } from 'react'
import {
  Dropdown,
  Disclosure,
  Popover,
  Modal,
  Tooltip,
  Sidebar,
  Breadcrumb,
  Select,
  Pagination,
} from './components'
import ICONS from './icons'
import usePagination from './hooks/usePagination'
import { DropdownItems } from './samples/DropdownItems'
import PopoverContent from './samples/PopoverContent'
import SidebarContent from './samples/SidebarContent'
import { SelectItems } from './samples/SelectItems'
import axios from 'axios'

import { cls } from './utils/common'

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
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalShow2, setModalShow2] = useState<boolean>(false);
  const [sidebarShow, setSidebarShow] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<string>('');
  const [contents, setContents] = useState<ContentType[]>([]);
  const {
    page,
    pageButtons,
    pageSize,
    maxPage,
    maxRatio,
    currentRatio,
    setTotalCount,
    setPageSize,
    fn,
  } = usePagination();

  const handleModalClose = () => {
    setModalShow(false)
  }

  const handleModalClose2 = () => {
    setModalShow2(false)
  }

  const handleSidebarClose = () => {
    setSidebarShow(false)
  }

  const getPaginationSamples = useCallback(
    async (page: number, pageSize: number) => {
      const result = await axios.get('https://koreanjson.com/comments');
      setTotalCount(result?.data?.length);
      const paged = result?.data?.slice((page - 1) * pageSize, page * pageSize);
      setContents(paged);
    },
    [setTotalCount, setContents],
  );

  useEffect(() => {
    setPageSize(5);
  }, [setPageSize]);

  useEffect(() => {
    getPaginationSamples(page, pageSize).finally();
  }, [page, pageSize, getPaginationSamples]);

  return (
    <Container>
      <Dropdown
        items={DropdownItems}
        placement='bottom-start'
        menuItemStyle='flex w-full cursor-pointer items-center rounded-md p-8 text-sm text-gray-900 hover:bg-amber-500 hover:text-white'
      >
        <div className='inline-flex items-center justify-center rounded-md bg-black/20 px-16 py-8 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'>
          <span>hi</span>
          <ICONS.ChevronDown className='ml-8 text-sm' />
        </div>
      </Dropdown>

      <Popover
        placement="bottom-start"
        content={<PopoverContent />}
        offset={[8, 12]}
      >
        <div className="flex w-fit justify-center rounded-md bg-black/20 px-16 py-8 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <span>Open Popover</span>
        </div>
      </Popover>
      <Tooltip
        content="tooltip!"
        trigger="click"
        placement="bottom"
        offset={[0, 12]}
        arrow
      >
        <button
          type="button"
          className="inline-flex justify-center rounded-md bg-black/20 px-16 py-8 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          <span>Tooltip</span>
        </button>
      </Tooltip>

      <div>
        <button
          type="button"
          className="rounded-md bg-black/20 px-16 py-8 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          onClick={() => setModalShow(true)}
        >
          Modal On
        </button>
        <button
          type="button"
          className="ml-8 rounded-md bg-black/20 px-16 py-8 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
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
          <div className="flex flex-col gap-8">
            <div>test1</div>
            <div>test2</div>
            <button
              type="button"
              className="mt-6 cursor-pointer rounded-md border border-gray-400 py-4 hover:border-blue-500 hover:text-blue-500"
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
          <div className="flex flex-col gap-8">
            <div>test1</div>
            <div>test2</div>
            <button
              type="button"
              className="mt-6 cursor-pointer rounded-md border border-gray-400 py-4 hover:border-blue-500 hover:text-blue-500"
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
          className="rounded-md bg-black/20 px-16 py-8 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
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

      <div className="h-40 w-192">
        <Select
          items={SelectItems}
          onChange={(value: string) => {
            setSelectValue(value)
          }}
          value={selectValue}
          showArrow
          arrow={<ICONS.ChevronDown className="h-14 w-14"/>}
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

      <div className="flex flex-col gap-16">
        {contents?.map(content => (
          <div
            className="rounded-lg border border-gray-600 p-16"
            key={content.id}
          >
            <div className="mb-4">
              <span className="font-bold">{content.User?.username}</span>
              <span className="ml-8 text-sm text-gray-500">
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
          changePage={fn.changePage}
          prevPage={fn.prevPage}
          nextPage={fn.nextPage}
        />
      </div>
      <Disclosure
        wrapStyle='flex flex-col gap-12'
        items={[
          {
            heading: (
              <div className='flex cursor-pointer items-center gap-4 text-blue-500'>
                <span>더보기</span>
                <ICONS.ChevronDown className='text-xs' />
              </div>
            ),
            content: (
              <div>
                <p className='text-2xl'>text1</p>
                <p className='text-xl'>text2</p>
              </div>
            ),
          },
          {
            heading: (
              <div className='flex cursor-pointer items-center gap-4 text-blue-500'>
                <span>더보기2</span>
                <ICONS.ChevronDown className='text-xs' />
              </div>
            ),
            content: (
              <div>
                <p className='text-2xl'>text1</p>
                <p className='text-xl'>text2</p>
              </div>
            ),
          },
        ]}
      />
    </Container>
  )
}

const exampleData: [string, string, string][] = [
  [
    'Dropdown',
    'to-indigo-500 from-purple-500',
    '링크 목록 등을 표시하기 위해 사용 됨, 주로 네비게이션과 같은 메뉴 표기 용도로 사용되고 카드와 같은 요소에는 popover를 사용',
  ],
  [
    'Popover',
    'from-sky-400 to-indigo-500',
    '추가 정보 또는 작업을 제공하기 위한 팝업 메뉴, 단순 메뉴가 아닌 복잡한 카드형태를 구현하는데에 용이함',
  ],
  [
    'Tooltip',
    'from-orange-600 to-yellow-600',
    '마우스 입력(hover/click)에 표시되며 단순한 텍스트 표기에 사용됨, 간단한 설명을 제공하는데에 사용',
  ],
  [
    'Modal',
    'from-emerald-600 to-teal-900',
    '새 페이지로 이동하지 않고 현재 페이지 위에 새로운 박스를 팝업형식으로 띄우는데에 사용',
  ],
  [
    'Sidebar',
    'from-cyan-600 to-blue-600',
    '측면에 메뉴를 숨겨두고 사용하는데에 사용',
  ],
  [
    'Select (Autocomplete)',
    'from-pink-500 to-rose-500',
    'Select 태그의 커스텀 버전',
  ],
  [
    'Breadcrumb',
    'from-white to-white',
    '시스템의 계층을 알려주는데에 사용 혹은 현재 페이지의 위치를 알려줌',
  ],
  [
    'Pagination',
    'from-white to-white',
    '컨텐츠를 여러 페이지로 분리하여 탐색 및 이동할 수 있도록 도와주는데에 사용',
  ],
  [
    'Disclosure',
    'from-white to-white',
    '일부 컨텐츠를 숨겨두었다가 펼쳐서 표현하는데에 사용',
  ],
  // [
  //   'Switch',
  //   'from-white to-white',
  //   '스위치 형식으로 ON / OFF를 제어할때에 사용',
  // ],
]

type ExampleProps = {
  className?: string
  children: React.ReactNode
  index: number
}

function Example({ children, index }: ExampleProps) {
  const [heading, gradientStyles, description] = exampleData[index] || []
  return (
    <div className={cls('space-y-16', gradientStyles)}>
      <h2 className="text-3xl font-extrabold text-white">{heading}</h2>
      <h3 className="!mt-16 text-xl font-bold text-white">When To use</h3>
      <p className="!mt-12 text-white">{description}</p>
      <div className="relative !mt-20 rounded-xl bg-gradient-to-r p-40 text-black shadow-lg">
        {children}
      </div>
    </div>
  )
}

function Container({ children }: { children?: React.ReactNode[] }) {
  if (!children) return null

  return (
    <div className="flex flex-col items-center bg-[#13264E] py-144">
      <div className="w-full max-w-[700px] space-y-80">
        {children?.map((item, index) => (
          <Example key={index} index={index}>
            {item}
          </Example>
        ))}
      </div>
    </div>
  )
}
