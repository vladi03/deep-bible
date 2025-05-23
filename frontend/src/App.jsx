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
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams
} from 'react-router-dom';

// Proper class-based ErrorBoundary for React
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, errorInfo) {
    // You can log errorInfo if needed
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ color: 'red', padding: 24 }}>
          <h2>Something went wrong.</h2>
          <pre>{this.state.error && (this.state.error.stack || this.state.error.message || this.state.error.toString())}</pre>
          <pre>{JSON.stringify(this.state.error, Object.getOwnPropertyNames(this.state.error), 2)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

console.log('[App] App component loaded');
function App() {
  // State for major topics data
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  // State for detail view
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  const [articleId, setArticleId] = useState(null)

  useEffect(() => {
    console.log('[App] useEffect: fetching /data/bible_scripture_categories.json');
    fetch('/data/bible_scripture_categories.json')
      .then((res) => res.json())
      .then((data) => {
        console.log('[App] Fetched topics:', data);
        setTopics(data.major_topics || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error('[App] Error fetching topics:', err)
        setLoading(false)
      })
  }, [])

  // Add navigate from useNavigate for use in routes
  return (
    <ErrorBoundary>
      <Router>
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
            <Routes>
              <Route path="/" element={<Home topics={topics} loading={loading} />} />
              <Route path="/topic/:topicTitle/:tabIndex?" element={<TopicDetail topics={topics} />} />
              <Route path="/article/:articleId" element={<ArticleDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </Router>
    </ErrorBoundary>
  );
}

// Add error handling to data fetches
function Home({ topics, loading }) {
  console.log('[Home] Home component loaded', { topics, loading });
  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(null);
  // Add missing state for articles and articleIcons
  const [articles, setArticles] = useState([]);
  const [articleIcons, setArticleIcons] = useState({});
  useEffect(() => {
    console.log('[Home] useEffect: fetching /data/articles.json');
    fetch('/data/articles.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch articles: ' + res.status);
        return res.json();
      })
      .then(data => {
        console.log('[Home] Fetched articles:', data);
        const list = data.articles || [];
        setArticles(list);
        // generate a random fallback icon for each article
        const defaultIcons = ['article', 'description', 'menu_book', 'book', 'bookmark', 'label', 'star'];
        const iconsMap = {};
        list.forEach(a => {
          const icon = defaultIcons[Math.floor(Math.random() * defaultIcons.length)];
          iconsMap[a.id] = icon;
        });
        setArticleIcons(iconsMap);
      })
      .catch(err => {
        console.error('[Home] Error fetching articles:', err);
        setFetchError(err.message)
      });
  }, []);
  useEffect(() => {
    window.addEventListener('unhandledrejection', e => {
      setFetchError(e.reason?.message || 'Unknown error');
    });
    return () => window.removeEventListener('unhandledrejection', () => {});
  }, []);
  if (fetchError) return <div style={{ color: 'red' }}>Error: {fetchError}</div>;
  if (loading) return <p>Loading topics...</p>;
  console.log('[Home] Rendering Home return', { topics, articles });
  return (
    <>
      <Grid style={{ alignItems: 'start', gap: '16px' }}>
        {topics.map((topic) => {
          console.log('[Home] Rendering TopicCard', topic);
          return (
            <TopicCard
              key={topic.title}
              topic={topic}
              onReadMore={() => navigate(`/topic/${encodeURIComponent(topic.title)}`)}
            />
          );
        })}
      </Grid>
      {/* Articles List */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{marginLeft: '16px'}}>Articles</h2>
        <Grid style={{ alignItems: 'start', gap: '16px' }}>
          {articles.map((article) => {
            console.log('[Home] Rendering Article Card', article);
            return (
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
                    <h2 className='cardTitle' style={{ display: 'flex', alignItems: 'center' }}>
                      <Icon
                        icon={articleIcons[article.id]}
                        style={{ fontSize: '24px', marginRight: '0.5em', alignSelf: 'center' }}
                      />
                      {article.title}
                    </h2>
                    {article.summary && <p className='description'>{article.summary}</p>}
                  </CardPrimaryAction>
                  <CardActions style={{ marginTop: 'auto' }}>
                    <CardActionButtons>
                      <CardActionButton
                        className='read-more-button'
                        onClick={() => navigate(`/article/${article.id}`)}
                      >
                        Read Article
                      </CardActionButton>
                    </CardActionButtons>
                  </CardActions>
                </Card>
              </GridCell>
            );
          })}
        </Grid>
      </div>
    </>
  );
}

function TopicDetail({ topics }) {
  const { topicTitle, tabIndex } = useParams();
  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(null);
  useEffect(() => {
    window.addEventListener('unhandledrejection', e => {
      setFetchError(e.reason?.message || 'Unknown error');
    });
    return () => window.removeEventListener('unhandledrejection', () => {});
  }, []);
  if (fetchError) return <div style={{ color: 'red' }}>Error: {fetchError}</div>;
  if (!topics || topics.length === 0) return <p>Loading topic...</p>;
  const topic = topics.find(t => t.title === decodeURIComponent(topicTitle));
  const [activeTab, setActiveTab] = useState(Number(tabIndex) || 0);
  if (!topic) return <p>Topic not found.</p>;
  return (
    <div>
      <DesktopCategoryView
        selectedTopic={topic}
        activeTab={activeTab}
        setActiveTab={idx => {
          setActiveTab(idx);
          navigate(`/topic/${encodeURIComponent(topic.title)}/${idx}`);
        }}
      />
      <MobileAccordion
        categories={topic.categories}
        topicIcon={topic.icon}
      />
    </div>
  );
}

function ArticleDetail() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  useEffect(() => {
    console.log('[ArticleDetail] useEffect: fetching /data/articles.json');
    fetch('/data/articles.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch articles: ' + res.status);
        return res.json();
      })
      .then(data => {
        console.log('[ArticleDetail] Fetched articles:', data);
        setArticles(data.articles || [])
      })
      .catch(err => {
        console.error('[ArticleDetail] Error fetching articles:', err);
        setFetchError(err.message)
      });
  }, []);
  if (fetchError) return <div style={{ color: 'red' }}>Error: {fetchError}</div>;
  if (!articles) return <p>Loading article...</p>;
  const article = articles.find(a => a.id === articleId);
  if (!article) return <p>Article not found.</p>;
  return <ArticleView articleId={articleId} onBack={() => navigate('/')} />;
}

function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}

export default App
