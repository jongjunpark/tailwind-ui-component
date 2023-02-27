import tw, { TwStyle } from 'twin.macro'
import React from 'react'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'

interface PaginationProps {
  page: number
  pageButtons: number[]
  maxPage: number
  maxRatio: number
  currentRatio: number
  changePage: (page: number) => void
  prevPage: () => void
  nextPage: () => void
}

export default function Pagination({
  page,
  pageButtons,
  maxPage,
  maxRatio,
  currentRatio,
  changePage,
  prevPage,
  nextPage,
}: PaginationProps) {
  return (
    <div tw="flex justify-center items-center mt-10 -ml-5">
      <button
        disabled={currentRatio === 1 ? true : false}
        onClick={() => changePage(1)}
        tw="w-4 h-4 cursor-pointer disabled:(text-gray-300 cursor-default)"
      >
        <ChevronDoubleLeftIcon />
      </button>
      <button
        disabled={currentRatio === 1 ? true : false}
        onClick={prevPage}
        tw="w-4 h-4 cursor-pointer disabled:(text-gray-300 cursor-default)"
      >
        <ChevronLeftIcon />
      </button>
      <ul tw="flex gap-1 mx-2">
        {pageButtons.map((btnPage, i) => (
          <li key={i}>
            <button
              disabled={btnPage === page}
              onClick={() => changePage(btnPage)}
              css={[
                tw`px-1 min-w-[28px] h-7 rounded-md text-sm cursor-pointer bg-transparent text-black transition disabled:cursor-default hover:bg-gray-300`,
                btnPage === page &&
                  tw`bg-blue-900 text-white hover:bg-blue-900`,
              ]}
            >
              {btnPage}
            </button>
          </li>
        ))}
      </ul>
      <button
        disabled={maxRatio === currentRatio ? true : false}
        onClick={nextPage}
        tw="w-4 h-4 cursor-pointer disabled:(text-gray-300 cursor-default)"
      >
        <ChevronRightIcon />
      </button>
      <button
        disabled={maxRatio === currentRatio ? true : false}
        onClick={() => changePage(maxPage)}
        tw="w-4 h-4 cursor-pointer disabled:(text-gray-300 cursor-default)"
      >
        <ChevronDoubleRightIcon />
      </button>
    </div>
  )
}
