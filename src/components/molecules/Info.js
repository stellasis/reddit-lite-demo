import React from 'react'
import PropTypes from 'prop-types'
import Author from '../atoms/Author'
import Age from '../atoms/Age'
import Comment from '../atoms/Comment'

const Info = ({ prefixText, author, createdUtc, numComments }) => (
  <div style={{ fontSize: '0.8em' }}>
    {prefixText ? <span>{`${prefixText} `}</span> : null}
    <Author text={author} />
    &nbsp; &nbsp;
    <Age utc={createdUtc} />
    {numComments >= 0 ? <Comment numComments={numComments} /> : null}
  </div>
)

Info.propTypes = {
  prefixText: PropTypes.string,
  author: PropTypes.string.isRequired,
  createdUtc: PropTypes.number.isRequired,
  numComments: PropTypes.number,
}

Info.defaultProps = {
  prefixText: null,
  numComments: null,
}

export default Info
