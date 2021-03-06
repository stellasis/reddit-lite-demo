import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { commentType } from '../types'
import CommentCard from '../components/CommentCard'

const Comments = (props) => {
  const { data } = props

  return (
    <>
      {data.map((el) => {
        const id = Object.keys(el)[0]
        const item = el[id]

        return (
          <CommentCard
            key={id}
            author={item.author}
            createdUtc={item.createdUtc}
            bodyHtml={item.bodyHtml}
          />
        )
      })}
    </>
  )
}

Comments.propTypes = {
  data: PropTypes.arrayOf(commentType).isRequired,
}

export default connect(null)(Comments)
