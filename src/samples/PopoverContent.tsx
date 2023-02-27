import tw, { TwStyle } from 'twin.macro'

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

export default PopoverContent
