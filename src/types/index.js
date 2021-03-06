import { arrayOf, shape, func, number, string } from 'prop-types'

export const dispatchType = func

export const threadType = shape({
  id: string,
  title: string,
  ups: number,
  selftextHtml: string,
  author: string,
  numComments: number,
  createdUtc: number,
  url: string,
  mediaEmbedContent: string,
  suggestedSort: string,
})

export const threadsType = shape({
  children: arrayOf(threadType),
  after: string,
})

export const commentType = shape({
  id: shape({
    id: string,
    author: string,
    bodyHtml: string,
    createdUtc: number,
    ups: number,
  }),
})

export const commentsType = shape({
  children: arrayOf(commentType),
  moreChildren: arrayOf(string),
})

export const filterType = string

export const filtersType = shape({
  filterName: string,
  filterState: string,
})

export const locationType = shape({
  pathname: string,
})

export const historyType = shape({
  push: func,
})

export const matchType = shape({
  params: shape({
    id: string,
  }),
})
