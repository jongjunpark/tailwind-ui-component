import tw, { TwStyle } from 'twin.macro'
import React from 'react'

interface BreadcrumbItemType {
  name: string
  url?: string
  disabled?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItemType[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div tw="flex items-center text-sm gap-1.5">
      {items?.map((item, idx) => (
        <>
          <a
            href={item.url}
            css={[
              tw`text-gray-500 transition hover:(text-black)`,
              (item.disabled || !item.url || items?.length === idx + 1) &&
                tw`pointer-events-none`,
            ]}
          >
            {item.name}
          </a>
          {items?.length > idx + 1 && <div tw="text-gray-300">/</div>}
        </>
      ))}
    </div>
  )
}
