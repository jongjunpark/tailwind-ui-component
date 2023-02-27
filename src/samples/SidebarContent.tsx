import ICONS from '../icons'
interface SidebarContentProps {
  setSidebarShow: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContent = ({ setSidebarShow }: SidebarContentProps) => {
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
        <div tw="w-8 h-8 cursor-pointer" onClick={() => setSidebarShow(false)}>
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

export default SidebarContent
