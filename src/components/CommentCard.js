import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Info from './molecules/Info'
import MarkdownBody from './atoms/MarkdownBody'

const CommentCard = ({ author, createdUtc, bodyHtml }) => (
  <>
    <Info prefixText="Posted by" author={author} createdUtc={createdUtc} />
    <MarkdownBody escapedHtml={bodyHtml} />
    <br />
  </>
)

CommentCard.propTypes = {
  author: PropTypes.string.isRequired,
  createdUtc: PropTypes.number.isRequired,
  bodyHtml: PropTypes.string.isRequired,
}

export default memo(CommentCard)
