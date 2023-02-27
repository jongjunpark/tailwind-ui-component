import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const usePagination = () => {
  const [page, setPage] = useState<number>(1) // 현재 페이지, start idx 0
  const [pageSize, setPageSize] = useState<number>(10) // data 노출 갯수, default 10
  const [totalCount, setTotalCount] = useState<number>(1) // data 총 갯수
  const [maxPage, setMaxPage] = useState<number>(1) // 마지막 페이지, start idx 0
  const [pageNum, setPageNum] = useState<number>(5) // pagination 노출 버튼 갯수, default 5
  const [pageButtons, setPageButtons] = useState<number[]>(
    Array(pageNum).fill(null),
  ) // 생성된 버튼 숫자 리스트
  const [searchParams, setSearchParams] = useSearchParams()
  const pageQuery = searchParams.get('page') as string

  useEffect(() => {
    page >= 1 && pageNum >= 0 && maxPage >= 0 && makePaginationButton()
  }, [page, pageNum, maxPage])

  useEffect(() => {
    setMaxPage(Math.ceil(totalCount / pageSize))
  }, [totalCount])

  useEffect(() => {
    setPage(pageQuery ? +pageQuery : 1)
  }, [pageQuery])

  /**
   * pagination 버튼 생성 함수
   *
   *  비율로 pagination 버튼을 생성함
   *  첫번째 노출되는 버튼은 0~4로 노출되는 버튼 갯수인 5를 나누면 ratio가 0이 나온다.
   *  반면에 마지막 노출되는 페이지가 11인 경우(0부터 시작하면 10, maxPage를 0부터 잡은 이유) 5로 나누면 2가 나온다.
   *  이러한 비율값을 통해 현재 page를 통해 어느 버튼이 노출이 되는지 계산해준다.
   */
  const makePaginationButton = () => {
    // 마지막 버튼 숫자 리스트는 최대 페이지를 노출 버튼 갯수로 나눈 후 남은 나머지
    const lastPage = maxPage % pageNum

    // 최대비율은 마지막 페이지 / 노출 버튼 갯수(요구사항 예시는 5개)를 올림하여 정수로 변경하여 계산
    // 현재비율은 현재 페이지 / 노출 버튼 갯수를 올림하여 정수로 변경하여 계산
    const maxRatio = Math.ceil(maxPage / pageNum)
    const currentRatio = Math.ceil(page / pageNum)

    // 현재 비율이 최대 비율과 다른 경우에는 노출 버튼 갯수를 모두 노출
    // 같은 경우에는 마지막 버튼 숫자 리스트만큼만 노출시킴
    // 같은 경우에 lastPage가 0이라면 모두 노출시킴
    const buttons = Array(
      maxRatio !== currentRatio ? pageNum : lastPage > 0 ? lastPage : pageNum,
    )
      .fill(null)
      .map((_, i) => {
        return 1 + i + (currentRatio - 1) * pageNum
      })
    setPageButtons(buttons)
  }

  // history로 page 저장
  // 새로고침이나 뒤로가기시에 유리
  const changePage = (page: number) => {
    setSearchParams({ page: page + '' })
  }

  // 다음 페이지
  // 이동 후 페이지 리스트의 맨 마지막으로
  const nextPage = () => {
    const targetPage = pageButtons?.[0] + 5

    targetPage < maxPage + 1 && changePage(targetPage)
  }

  // 이전 페이지
  // 이동 후 페이지 리스트의 처음으로
  const prevPage = () => {
    const targetPage = pageButtons?.[0] - 1

    targetPage > 0 && changePage(targetPage)
  }

  return {
    page,
    pageSize,
    pageButtons,
    maxPage,
    maxRatio: Math.ceil(maxPage / pageNum),
    currentRatio: Math.ceil(page / pageNum),
    setTotalCount,
    setPageSize,
    changePage,
    nextPage,
    prevPage,
  }
}

export default usePagination
