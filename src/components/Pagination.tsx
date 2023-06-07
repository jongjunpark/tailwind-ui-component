import ICONS from '../icons'
import { cls } from '../utils/common'

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

const Pagination = ({
  page,
  pageButtons,
  maxPage,
  maxRatio,
  currentRatio,
  changePage,
  prevPage,
  nextPage,
}: PaginationProps) => {
  return (
    <div className="mx-auto mt-24 flex w-fit items-center justify-center rounded-lg bg-white">
      <button
        type="button"
        disabled={currentRatio === 1}
        onClick={() => changePage(1)}
        className="flex h-40 w-40 cursor-pointer items-center justify-center hover:text-rocket-blue disabled:cursor-default disabled:text-rocket-haze"
      >
        <ICONS.Next className="text-2xl" />
      </button>
      <button
        type="button"
        disabled={currentRatio === 1}
        onClick={prevPage}
        className="flex h-40 w-40 cursor-pointer items-center justify-center hover:text-rocket-blue disabled:cursor-default disabled:text-rocket-haze"
      >
        <ICONS.ArrLeft className="text-2xl" />
      </button>
      <ul className="flex">
        {pageButtons.map((btnPage, i) => (
          <li key={i}>
            <button
              type="button"
              disabled={btnPage === page}
              onClick={() => changePage(btnPage)}
              className={cls(
                'h-40 min-w-40 cursor-pointer px-4 text-sm text-black transition hover:text-rocket-blue disabled:cursor-default',
                btnPage === page
                  ? 'bg-blue-700 text-white hover:bg-rocket-blue'
                  : '',
              )}
            >
              {btnPage}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        disabled={maxRatio === currentRatio}
        onClick={nextPage}
        className="flex h-40 w-40 cursor-pointer items-center justify-center hover:text-rocket-blue disabled:cursor-default disabled:text-rocket-haze"
      >
        <ICONS.ArrRight className="text-2xl" />
      </button>
      <button
        type="button"
        disabled={maxRatio === currentRatio}
        onClick={() => changePage(maxPage)}
        className="flex h-40 w-40 cursor-pointer items-center justify-center hover:text-rocket-blue disabled:cursor-default disabled:text-rocket-haze"
      >
        <ICONS.Prev className="text-2xl" />
      </button>
    </div>
  )
}

export default Pagination
