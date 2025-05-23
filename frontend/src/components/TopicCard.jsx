import React, { useState } from 'react'
import { GridCell, Card, CardPrimaryAction, CardActions, CardActionButtons, CardActionButton, Icon } from 'rmwc'
import PropTypes from 'prop-types';
import '../App.css'

// Component for rendering a single topic card on the home page
export default function TopicCard({ topic, onReadMore }) {
  // Select a random fallback icon if none provided
  const defaultIcons = ['book', 'favorite', 'star', 'label', 'lightbulb', 'bolt', 'explore'];
  const [fallbackIcon] = useState(() => defaultIcons[Math.floor(Math.random() * defaultIcons.length)]);
  return (
    <GridCell span={3} tablet={6} phone={12}>
      <Card
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          aspectRatio: '4 / 3',
          backgroundColor: 'var(--color-card-bg)'
        }}
      >
        <CardPrimaryAction
          style={{ padding: '16px', flex: '1 1 auto', overflow: 'hidden' }}
          onClick={onReadMore}
        >
          <h2 className='cardTitle'>
            {topic.icon ? (
              <span
                className="topic-icon"
                dangerouslySetInnerHTML={{ __html: topic.icon }}
                style={{
                  display: 'inline-block',
                  width: '1.5em',
                  height: '1.5em',
                  marginRight: '0.5em',
                  verticalAlign: 'middle'
                }}
              />
            ) : (
              <Icon
                icon={fallbackIcon}
                style={{
                  fontSize: '24px',
                  marginRight: '0.5em',
                  alignSelf: 'center'
                }}
              />
            )}
            {topic.title}
          </h2>
          <p className="description">{topic.description}</p>
        </CardPrimaryAction>
        <CardActions style={{ marginTop: 'auto' }}>
          <CardActionButtons>
            <CardActionButton className="read-more-button" onClick={onReadMore}>
              Read More
            </CardActionButton>
          </CardActionButtons>
        </CardActions>
      </Card>
    </GridCell>
  )
}
TopicCard.propTypes = {
  topic: PropTypes.object.isRequired,
  onReadMore: PropTypes.func.isRequired
};