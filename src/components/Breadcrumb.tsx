import { cls } from '../utils/common'

interface BreadcrumbItemType {
  name: string
  url?: string
  disabled?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItemType[]
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className="my-8 flex items-center gap-4 text-11 leading-18">
      {items.map((item, idx) => (
        <>
          <a
            href={item.url}
            className={cls(
              'text-gray-500 transition hover:text-black',
              item.disabled || !item.url || items.length === idx + 1
                ? 'pointer-events-none'
                : '',
            )}
          >
            {item.name}
          </a>
          {items.length > idx + 1 && <div className="text-gray-300">/</div>}
        </>
      ))}
    </div>
  )
}

export default Breadcrumb
