'use client'

import cn from '@/lib/cn'
import Image from 'next/image'
import { Children, isValidElement, PropsWithChildren } from 'react'
import Md from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

const h1 = ({ children }: PropsWithChildren) => {
  return (
    <h3 className="mb-[0.6em] mt-[1em] text-3xl font-bold">
      {Children.map(children, (child) => {
        if (typeof child === 'string') return child

        if (isValidElement(child) && child?.props?.node?.tagName === 'code') {
          return (
            <code className="rounded-[0.3em] bg-slate-200 px-[0.3em] py-[0.2em] text-blue-400 dark:bg-slate-700">
              {child.props.children}
            </code>
          )
        }
        return child
      })}
    </h3>
  )
}
const h2 = ({ children }: PropsWithChildren) => {
  return (
    <h3 className="mb-[0.6em] mt-[1em] text-2xl font-bold">
      {Children.map(children, (child) => {
        if (typeof child === 'string') return child

        if (isValidElement(child) && child?.props?.node?.tagName === 'code') {
          return (
            <code className="rounded-[0.3em] bg-slate-200 px-[0.3em] py-[0.2em] text-blue-400 dark:bg-slate-700">
              {child.props.children}
            </code>
          )
        }
        return child
      })}
    </h3>
  )
}
const h3 = ({ children }: PropsWithChildren) => {
  return (
    <h3 className="mb-[0.6em] mt-[1em] text-xl font-bold">
      {Children.map(children, (child) => {
        if (typeof child === 'string') return child

        if (isValidElement(child) && child?.props?.node?.tagName === 'code') {
          return (
            <code className="rounded-[0.3em] bg-slate-200 px-[0.3em] py-[0.2em] text-blue-400 dark:bg-slate-700">
              {child.props.children}
            </code>
          )
        }
        return child
      })}
    </h3>
  )
}
const aside = ({ children }: PropsWithChildren) => (
  <aside className="relative mb-[1em] mt-[1em] h-full rounded-[0.3em] bg-slate-200 p-[1em] dark:bg-slate-700">
    <span className="absolute left-0 top-0 h-full w-1 bg-blue-500" />
    {children}
  </aside>
)
const p = ({ children }: PropsWithChildren) => (
  <p className="mb-[1em] mt-[1em] leading-[1.5]">{children}</p>
)
const table = ({ children }: PropsWithChildren) => (
  <table className="w-full font-light">{children}</table>
)
const thead = ({ children }: PropsWithChildren) => (
  <thead className="">{children}</thead>
)
const th = ({ children }: PropsWithChildren) => (
  <th className="border border-slate-300 p-[0.6em] dark:border-slate-500">
    {children}
  </th>
)
const tr = ({ children }: PropsWithChildren) => (
  <tr className="border border-slate-300 p-[0.6em] dark:border-slate-500">
    {children}
  </tr>
)
const td = ({ children }: PropsWithChildren) => (
  <td className="border border-slate-300 p-[0.6em] dark:border-slate-500">
    {children}
  </td>
)
const ol = ({ children }: PropsWithChildren) => (
  <ol className="list-decimal pt-[0.2em]">{children}</ol>
)
const li = ({ children }: PropsWithChildren) => (
  <li className="mt-[1em]">{children}</li>
)
const hr = () => <hr className="mb-[2em] mt-[4em] dark:border-slate-600" />

interface Props {
  text: string
  showLine?: boolean
  className?: string
}

const Markdown = ({ text, className, showLine = false }: Props) => {
  return (
    <Md
      className={className}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1,
        h2,
        h3,
        aside,
        p,
        table,
        thead,
        th,
        tr,
        td,
        ol,
        li,
        hr,
        a: ({ children, node, href, ...rest }) => {
          return (
            <a
              href={href}
              {...rest}
              style={{
                color: '#4776b2',
                fontWeight: 'bold',
                marginTop: '0.3em',
                marginBottom: '0.3em',
              }}
            >
              {children}
            </a>
          )
        },
        code: ({ children, className, node, ...rest }) => {
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
            <div className="py-2">
              <SyntaxHighlighter
                PreTag="div"
                // eslint-disable-next-line react/no-children-prop
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                style={oneDark}
                showLineNumbers={showLine}
                className="ring ring-blue-400 dark:ring-slate-700"
                useInlineStyles
              />
            </div>
          ) : (
            <code
              {...rest}
              className={cn(
                'rounded-[0.3em] bg-slate-200 px-[0.3em] py-[0.1em] text-blue-400 dark:bg-slate-700',
                className,
              )}
            >
              {children}
            </code>
          )
        },
        img: (image) => (
          <Image
            src={image.src || ''}
            alt={image.alt || ''}
            width={500}
            height={300}
          />
        ),
      }}
    >
      {text}
    </Md>
  )
}

export default Markdown
