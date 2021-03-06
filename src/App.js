import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import store from './store'
import {
  SUBREDDIT_HOT_FILTER,
  SUBREDDIT_NEW_FILTER,
  SUBREDDIT_TOP_FILTER,
  THREAD_PATH,
} from './constants'
import Subreddit from './containers/Subreddit'
import Thread from './containers/Thread'

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route exact path="/" component={Subreddit} />
      <Route exact path={`/${SUBREDDIT_HOT_FILTER}`} component={Subreddit} />
      <Route exact path={`/${SUBREDDIT_NEW_FILTER}`} component={Subreddit} />
      <Route exact path={`/${SUBREDDIT_TOP_FILTER}`} component={Subreddit} />
      <Route exact path={`${THREAD_PATH}/:id`} component={Thread} />
    </BrowserRouter>
  </Provider>
)

export default App
