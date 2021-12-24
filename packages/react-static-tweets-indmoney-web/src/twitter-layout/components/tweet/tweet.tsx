import type { ReactNode } from 'react'
import React from 'react'
import TweetHeader from './tweet-header'
import TweetInfo from './tweet-info'

const TweetContext = React.createContext<any>({})

export const useTweet = () => React.useContext(TweetContext)

// could be extracted in utils
// https://fettblog.eu/typescript-react-why-i-dont-use-react-fc/
export type WithChildren<T = {}> = T & { children?: ReactNode }

export default function Tweet({
  children,
  data
}: {
  children: WithChildren<{}>
  data: any
}) {
  return (
    <div className='static-tweet-body'>
      <blockquote className='static-tweet-body-blockquote'>
        <TweetHeader tweet={data} />
        <TweetContext.Provider value={data}>{children}</TweetContext.Provider>
        <TweetInfo tweet={data} />
      </blockquote>
    </div>
  )
}
