import React, { useState, useEffect } from 'react'
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
  // State for major topics data
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/bible_scripture_categories.json')
      .then((res) => res.json())
      .then((data) => {
        setTopics(data.major_topics || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching topics:', err)
        setLoading(false)
      })
  }, [])

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
          {loading ? (
            <p>Loading topics...</p>
          ) : (
            <Grid style={{ alignItems: 'start', gap: '16px' }}>
              {topics.map((topic) => (
                <GridCell span={3} tablet={6} phone={12} key={topic.title}>
                  <Card
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      aspectRatio: '4 / 3',
                      backgroundColor: '#fffff0'
                    }}
                  >
                    <CardPrimaryAction
                      style={{
                        padding: '16px',
                        flex: '1 1 auto',
                        overflow: 'hidden'
                      }}
                    >
                      <h2 className='cardTitle'>{topic.title}</h2>
                      <p className="description">{topic.description}</p>
                    </CardPrimaryAction>
                    <CardActions style={{ marginTop: 'auto' }}>
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
          )}
        </div>
      </main>
    </>
  )
}

export default App
