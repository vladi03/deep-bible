import React, { useState, useEffect } from 'react'
import './App.css'
import MobileAccordion from './components/MobileAccordion'
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
  CardActionButton,
  Icon
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

  // Reflect selected topic in URL hash and handle navigation (back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      // Parse hash in form '#TopicName[/tabIndex]'
      const raw = window.location.hash.slice(1);
      if (raw) {
        const [namePart, tabPart] = raw.split('/');
        const topicTitle = decodeURIComponent(namePart);
        const topic = topics.find(t => t.title === topicTitle);
        if (topic) {
          // Determine active tab index
          let idx = 0;
          if (tabPart != null) {
            const n = parseInt(tabPart, 10);
            if (!isNaN(n) && n >= 0 && n < (topic.categories?.length || 0)) {
              idx = n;
            }
          }
          setSelectedTopic(topic);
          setActiveTab(idx);
          return;
        }
      }
      // No valid topic in hash: show list
      setSelectedTopic(null);
      setActiveTab(0);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [topics]);

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
                  window.location.hash = ''
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
              <p className="topicDescription">{selectedTopic.description}</p>
              {/* Desktop View: Category Tabs */}
              {activeTab >= 0 && (
                <div className="desktop-only">
                {/* Category Tabs */}
                <div className="tabs">
                {selectedTopic.categories.map((cat, idx) => (
                  <button
                    key={cat.category_name}
                    className={`tab ${activeTab === idx ? 'active' : ''}`}
                    onClick={() => {
                      // Update URL hash to include tab index
                      const base = encodeURIComponent(selectedTopic.title);
                      window.location.hash = `${base}/${idx}`;
                    }}
                  >
                    {cat.category_name}
                  </button>
                ))}
                </div>
                <div style={{ marginTop: '16px' }}>
                <h2 className="topicTitle">
                  {/* Category icon */}
                  <Icon icon="category" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  {selectedTopic.categories[activeTab].category_name}
                </h2>
                <p className="topicDescription">{selectedTopic.categories[activeTab].category_description}</p>
                {selectedTopic.categories[activeTab].scriptures.map((s, i) => (
                  <Card key={i} style={{ margin: '8px 0' }}>
                    <CardPrimaryAction style={{ padding: '16px' }}>
                      <h3 style={{ margin: 0 }}>
                        <Icon icon="menu_book" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        {s.reference}
                      </h3>
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
              )}
             {/* Mobile View: Categories Accordion */}
             <MobileAccordion
               categories={selectedTopic.categories}
               topicIcon={selectedTopic.icon}
             />
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
                          onClick={() => {
                            window.location.hash = encodeURIComponent(topic.title)
                          }}
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
