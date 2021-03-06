/* eslint-disable camelcase */

const urlApi = '/reddit/'
const subreddit = 'r/dotA2'

export const getThreads = (after = '', filter = '') => {
  const limit = 5
  let requestUrl = `${urlApi}${subreddit}`

  if (filter.length > 0) requestUrl += `/${filter}/`

  requestUrl += `.json?limit=${limit}`

  if (after.length > 0) requestUrl += `&after=${after}`

  return fetch(requestUrl, {
    method: 'GET',
  }).then((res) => res.json())
}

export const getCommentsByThreadId = (
  threadId,
  moreChildren = '',
  suggestedSort = ''
) => {
  if (moreChildren.length > 0) {
    const form = new FormData()
    form.append('api_type', 'json')
    form.append('link_id', `t3_${threadId}`)
    form.append('children', moreChildren)
    form.append('sort', suggestedSort)
    form.append('depth', 1)

    return fetch(`${urlApi}/api/morechildren.json`, {
      method: 'POST',
      body: form,
    }).then((res) => res.json())
  }

  let request_url = `${urlApi}${subreddit}/comments/${threadId}/.json`

  if (suggestedSort.length > 0) {
    request_url += `?sort=${suggestedSort}`
  }

  return fetch(request_url, {
    method: 'GET',
  }).then((res) => res.json())
}
