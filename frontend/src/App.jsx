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
// Removed RMWC Tabs—using simple buttons for tabs

function App() {
  // State for major topics data
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  // State for detail view
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [activeTab, setActiveTab] = useState(0)

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
          ) : selectedTopic ? (
            <div>
              <button
                onClick={() => {
                  setSelectedTopic(null)
                  setActiveTab(0)
                }}
                style={{ marginBottom: '16px' }}
              >
                ← Back to Topics
              </button>
              <h1 class="topicTitle">{selectedTopic.title}</h1>
              <p class="topicDescription">{selectedTopic.description}</p>
              {/* Category Tabs */}
              <div className="tabs">
                {selectedTopic.categories.map((cat, idx) => (
                  <button
                    key={cat.category_name}
                    className={`tab ${activeTab === idx ? 'active' : ''}`}
                    onClick={() => setActiveTab(idx)}
                  >
                    {cat.category_name}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: '16px' }}>
                <h2 class="topicTitle">{selectedTopic.categories[activeTab].category_name}</h2>
                <p class="topicDescription">{selectedTopic.categories[activeTab].category_description}</p>
                {selectedTopic.categories[activeTab].scriptures.map((s, i) => (
                  <Card key={i} style={{ margin: '8px 0' }}>
                    <CardPrimaryAction style={{ padding: '16px' }}>
                      <h3 style={{ margin: 0 }}>{s.reference}</h3>
                      <p style={{ fontWeight: 'bold', margin: '8px 0 4px' }}>
                        {s.text}
                      </p>
                      <p
                        style={{
                          fontStyle: 'italic',
                          color: '#555',
                          margin: 0
                        }}
                      >
                        {s.context_description}
                      </p>
                    </CardPrimaryAction>
                  </Card>
                ))}
              </div>
            </div>
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
                        <CardActionButton onClick={() => setSelectedTopic(topic)}>
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
