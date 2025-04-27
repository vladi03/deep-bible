import React, { useState, useEffect } from 'react'
import './App.css'
import MobileAccordion from './components/MobileAccordion'
import DesktopCategoryView from './components/DesktopCategoryView'
import TopicCard from './components/TopicCard'
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  Grid,
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
              <DesktopCategoryView
                selectedTopic={selectedTopic}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {/* Mobile View: Categories Accordion */}
              <MobileAccordion
                categories={selectedTopic.categories}
                topicIcon={selectedTopic.icon}
              />
            </div>
          ) : (
            <Grid style={{ alignItems: 'start', gap: '16px' }}>
              {topics.map((topic) => (
                <TopicCard
                  key={topic.title}
                  topic={topic}
                  onReadMore={() => {
                    window.location.hash = encodeURIComponent(topic.title)
                  }}
                />
              ))}
            </Grid>
          )}
        </div>
      </main>
    </>
  )
}

export default App
