import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import * as R from 'ramda'
import {
  dispatchType,
  threadsType,
  filterType,
  locationType,
  historyType,
} from '../types'
import Filters from '../components/molecules/Filters'
import ThreadList from './ThreadList'
import {
  SUBREDDIT_HOT_FILTER,
  SUBREDDIT_NEW_FILTER,
  SUBREDDIT_TOP_FILTER,
} from '../constants'
import {
  LOAD_MORE_THREADS_DATA_ASYNC,
  LOAD_THREADS_DATA_ASYNC,
} from '../actions/sagaActionTypes'

const Subreddit = (props) => {
  const {
    dispatch,
    threads,
    filter,
    location: { pathname },
    history: { push },
  } = props

  useEffect(() => {
    dispatch({
      type: LOAD_THREADS_DATA_ASYNC,
      payload: {
        filter: pathname === '/' ? SUBREDDIT_HOT_FILTER : pathname.substring(1),
      },
    })
  }, [])

  const handleSelectFilter = (evt) => {
    push(`/${evt.target.name}`)
  }

  const handleLoadMoreThreads = () =>
    dispatch({
      type: LOAD_MORE_THREADS_DATA_ASYNC,
      payload: {
        after: threads.after,
        filter,
      },
    })

  const setActiveFilter = () => {
    const filters = [
      SUBREDDIT_HOT_FILTER,
      SUBREDDIT_NEW_FILTER,
      SUBREDDIT_TOP_FILTER,
    ]

    const stateOfFilters = filters.map((el) => ({ [el]: '' }))

    filters.forEach((el, index) => {
      if (pathname === '/') stateOfFilters[0][SUBREDDIT_HOT_FILTER] = 'active'

      if (el === pathname.substring(1)) {
        stateOfFilters[index][el] = 'active'
      }
    })

    return stateOfFilters
  }

  return (
    <Container fluid className="my-2">
      {R.path(['children', 0], threads) ? (
        <>
          <Filters
            filters={setActiveFilter()}
            cbSelectFilter={handleSelectFilter}
          />
          <ThreadList
            data={threads.children}
            cbLoadMoreThreads={handleLoadMoreThreads}
          />
        </>
      ) : null}
    </Container>
  )
}

Subreddit.propTypes = {
  dispatch: dispatchType.isRequired,
  threads: threadsType.isRequired,
  filter: filterType.isRequired,
  location: locationType.isRequired,
  history: historyType.isRequired,
}

// TODO: Use selector instead of mapStateToProps
const mapStateToProps = (state) => ({
  threads: state.threads.data,
  filter: state.threads.filter,
})

export default connect(mapStateToProps)(Subreddit)
