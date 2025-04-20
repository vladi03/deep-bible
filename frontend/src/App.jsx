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
            <TopAppBarTitle>
              <span
                className="app-icon"
                style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  marginRight: '8px',
                  verticalAlign: 'middle'
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="100%"
                  height="100%"
                >
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16l4-2 4 2 4-2 4 2V4c0-1.1-.9-2-2-2z" />
                </svg>
              </span>
              Deep Bible
            </TopAppBarTitle>
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
                style={{ marginBottom: '16px', marginTop: '16px' }}
              >
                ← Back to Topics
              </button>
              <h1 className="topicTitle">
                {selectedTopic.icon && (
                                    <span
                                    className="topic-icon"
                                    dangerouslySetInnerHTML={{ __html: selectedTopic.icon }}
                                    style={{
                                      display: 'inline-block',
                                      width: '24px',
                                      height: '24px',
                                      marginRight:'15px',
                                      paddingBottom: '60px',
                                      verticalAlign: 'middle'
                                    }}
                                  />
                )}
                {selectedTopic.title}
              </h1>
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
                <h2 className="topicTitle">
                  {selectedTopic.categories[activeTab].category_name}
                </h2>
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
                          color: 'var(--color-text-secondary)',
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
                      backgroundColor: 'var(--color-card-bg)'
                    }}
                  >
                    <CardPrimaryAction
                      style={{
                        padding: '16px',
                        flex: '1 1 auto',
                        overflow: 'hidden'
                      }}
                    >
                      <h2 className='cardTitle'>
                        {topic.icon && (
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
                        )}
                        {topic.title}
                      </h2>
                      <p className="description">{topic.description}</p>
                    </CardPrimaryAction>
                    <CardActions style={{ marginTop: 'auto' }}>
                      <CardActionButtons>
                        <CardActionButton
                          className="read-more-button"
                          onClick={() => setSelectedTopic(topic)}
                        >
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
