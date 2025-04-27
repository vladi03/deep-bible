import React, { useState, useEffect } from 'react'
import './App.css'
import MobileAccordion from './components/MobileAccordion'
import DesktopCategoryView from './components/DesktopCategoryView'
import TopicCard from './components/TopicCard'
// RMWC Components
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  Grid,
  Icon,
  Card,
  CardPrimaryAction,
  CardActions,
  CardActionButtons,
  CardActionButton,
  GridCell
} from 'rmwc'
import ArticleView from './components/ArticleView'
// Removed RMWC Tabs—using simple buttons for tabs

function App() {
  // State for major topics data
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  // State for detail view
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  const [articleId, setArticleId] = useState(null)

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
      // Parse hash in form '#article/{id}' or '#TopicName[/tabIndex]'
      const raw = window.location.hash.slice(1);
      if (raw) {
        const [prefix, param] = raw.split('/');
        if (prefix === 'article' && param) {
          setArticleId(param);
          setSelectedTopic(null);
          return;
        }
        const topicTitle = decodeURIComponent(prefix);
        const topic = topics.find(t => t.title === topicTitle);
        if (topic) {
          // Determine active tab index
          let idx = 0;
          if (param != null) {
            const n = parseInt(param, 10);
            if (!isNaN(n) && n >= 0 && n < (topic.categories?.length || 0)) {
              idx = n;
            }
          }
          setSelectedTopic(topic);
          setActiveTab(idx);
          setArticleId(null);
          return;
        }
      }
      // No valid route: reset to home
      setSelectedTopic(null);
      setActiveTab(0);
      setArticleId(null);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [topics]);

  // Load articles for home page
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch('/data/articles.json')
      .then(res => res.json())
      .then(data => setArticles(data.articles || []))
      .catch(err => console.error('Error fetching articles:', err));
  }, []);

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
          ) : articleId ? (
            <ArticleView articleId={articleId} />
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
            <>
              <Grid style={{ alignItems: 'start', gap: '16px' }}>
                {topics.map((topic) => (
                  <TopicCard
                    key={topic.title}
                    topic={topic}
                    onReadMore={() => { window.location.hash = encodeURIComponent(topic.title) }}
                  />
                ))}
              </Grid>
              {/* Articles List */}
              <div style={{ marginTop: '32px' }}>
                <h2 style={{marginLeft: '16px'}}>Articles</h2>
                <Grid style={{ alignItems: 'start', gap: '16px' }}>
                  {articles.map((article) => (
                    <GridCell span={3} tablet={6} phone={12} key={article.id}>
                      <Card
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%',
                          aspectRatio: '4 / 3',
                          backgroundColor: 'var(--color-card-bg)'
                        }}
                      >
                        <CardPrimaryAction style={{ padding: '16px', flex: '1 1 auto', overflow: 'hidden' }}>
                          <h2 className='cardTitle'>{article.title}</h2>
                          {article.summary && <p className='description'>{article.summary}</p>}
                        </CardPrimaryAction>
                        <CardActions style={{ marginTop: 'auto' }}>
                          <CardActionButtons>
                            <CardActionButton
                              className='read-more-button'
                              onClick={() => { window.location.hash = `article/${article.id}` }}
                            >
                              Read Article
                            </CardActionButton>
                          </CardActionButtons>
                        </CardActions>
                      </Card>
                    </GridCell>
                  ))}
                </Grid>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  )
}

export default App
