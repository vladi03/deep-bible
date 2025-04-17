import React from 'react'
import './App.css'
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle
} from 'rmwc/top-app-bar'
import { Grid, GridCell } from 'rmwc/grid'
import {
  Card,
  CardPrimaryAction,
  CardActions,
  CardActionButtons,
  CardActionButton
} from 'rmwc/card'

function App() {
  // Static data for major topics
  const topics = [
    {
      title: 'All Nations',
      description: 'This topic contains biblical scriptures categorized under various themes related to fear. It explores aspects such as reverence for God, fear of man or worldly threats, divine reassurance, human experiences of fear, fear of judgment, and overcoming fear through faith and love.',
      article_url: 'https://example.com/articles/fear'
    },
    {
      title: 'Fear',
      description: 'This topic contains biblical scriptures categorized under various themes related to fear. It explores aspects such as reverence for God, fear of man or worldly threats, divine reassurance, human experiences of fear, fear of judgment, and overcoming fear through faith and love.',
      article_url: 'https://example.com/articles/fear'
    }
  ]

  return (
    <>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarTitle>Deep Bible</TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <main style={{ padding: '16px' }}>
        <Grid style={{ alignItems: 'start', gap: '16px' }}>
          {topics.map((topic) => (
            <GridCell span={3} tablet={6} phone={12} key={topic.title}>
              <Card style={{ height: '100%' }}>
                <CardPrimaryAction style={{ padding: '16px' }}>
                  <h2>{topic.title}</h2>
                  <p>{topic.description}</p>
                </CardPrimaryAction>
                <CardActions>
                  <CardActionButtons>
                    <CardActionButton href={topic.article_url} target="_blank">
                      Read More
                    </CardActionButton>
                  </CardActionButtons>
                </CardActions>
              </Card>
            </GridCell>
          ))}
        </Grid>
      </main>
    </>
  )
}

export default App
