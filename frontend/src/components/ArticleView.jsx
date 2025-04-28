import React, { useState, useEffect } from 'react'
import { Icon } from 'rmwc'
import '../App.css'

// Component to display a single article by ID
export default function ArticleView({ articleId }) {
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/articles.json')
      .then(res => res.json())
      .then(data => {
        const found = data.articles.find(a => a.id === articleId)
        setArticle(found)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching articles:', err)
        setLoading(false)
      })
  }, [articleId])

  if (loading) {
    return <p>Loading article...</p>
  }
  if (!article) {
    return <p>Article not found.</p>
  }

  return (
    <div style={{ margin: '16px' }}>
      <button
        onClick={() => { window.location.hash = '' }}
        style={{ margin: '16px 0', display: 'flex', alignItems: 'center' }}
      >
        <Icon icon="arrow_back" style={{ fontSize: '24px', marginRight: '8px' }} />
        Back
      </button>
      <h1>{article.title}</h1>
      <p style={{ fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>
        {article.author} • {article.publishedDate}
      </p>
      {article.summary && <p><strong>{article.summary}</strong></p>}
      {article.content.map((section, idx) => (
        <section key={idx} style={{ marginTop: '24px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center' }}>
            <Icon icon="menu_book" style={{ fontSize: '24px', marginRight: '8px' }} />
            {section.title}
          </h2>
          {section.paragraphs.map((para, j) => (
            <p key={j}>{para}</p>
          ))}
        </section>
      ))}
      {article.tags && (
        <div style={{ marginTop: '24px' }}>
          <strong>Tags:</strong> {article.tags.join(', ')}
        </div>
      )}
    </div>
  )
}