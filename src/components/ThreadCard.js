import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import { threadType } from '../types'
import Vote from './molecules/Vote'
import Title from './atoms/Title'
import Info from './molecules/Info'
import Image from './atoms/Image'
import MarkdownBody from './atoms/MarkdownBody'

const ThreadCard = ({ data, cbUpvote, cbDownvote, fullDescription }) => (
  <Card className="my-4">
    <Card.Body>
      <div className="d-flex flex-row align-items-top">
        <Vote
          id={data.id}
          ups={data.ups}
          cbUpvote={cbUpvote}
          cbDownvote={cbDownvote}
        />
        &nbsp; &nbsp; &nbsp; &nbsp;
        <div>
          <Title title={data.title} id={data.id} />
          <Info
            prefixText="Posted by"
            author={data.author}
            createdUtc={data.createdUtc}
            numComments={data.numComments}
          />

          {fullDescription ? (
            <>
              <br />
              {data.selftextHtml ? (
                <MarkdownBody escapedHtml={data.selftextHtml} />
              ) : null}
              {data.url ? <Image url={data.url} /> : null}
              {data.mediaEmbedContent ? (
                <MarkdownBody escapedHtml={data.mediaEmbedContent} />
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </Card.Body>
  </Card>
)

ThreadCard.propTypes = {
  data: threadType.isRequired,
  cbUpvote: PropTypes.func,
  cbDownvote: PropTypes.func,
  fullDescription: PropTypes.bool,
}

ThreadCard.defaultProps = {
  cbUpvote: null,
  cbDownvote: null,
  fullDescription: false,
}

export default memo(ThreadCard)
