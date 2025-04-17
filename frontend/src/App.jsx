import React from 'react'
import './App.css'
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  Grid,
  GridCell,
  Card,
  CardPrimaryAction,
  CardActions,
  CardActionButtons,
  CardActionButton
} from 'rmwc'

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
      {/* Apply fixed adjust to offset content for Top App Bar height */}
      <main className="mdc-top-app-bar--fixed-adjust">
        <div className="container">
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
        </div>
      </main>
    </>
  )
}

export default App
