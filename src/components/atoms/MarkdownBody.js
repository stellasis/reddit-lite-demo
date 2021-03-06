import React, { memo } from 'react'
import PropTypes from 'prop-types'
import parse from 'html-react-parser'

const MarkdownBody = ({ escapedHtml }) => {
  const convertEscapedHtmlToHtml = (data) => {
    const el = document.createElement('textarea')
    el.innerHTML = data

    return parse(el.value, { trim: true })
  }

  return <div>{convertEscapedHtmlToHtml(escapedHtml)}</div>
}

MarkdownBody.propTypes = {
  escapedHtml: PropTypes.string,
}

MarkdownBody.defaultProps = {
  escapedHtml: null,
}

export default memo(MarkdownBody)
