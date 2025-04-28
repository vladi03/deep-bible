import React from 'react';
import { Icon, Card, CardPrimaryAction } from 'rmwc';
// Desktop view uses App.css for shared styles; no additional CSS import needed

// Desktop view of categories with tabs and content
export default function DesktopCategoryView({ selectedTopic, activeTab, setActiveTab }) {
  // Back action resets URL hash
  const handleBack = () => {
    window.location.hash = '';
  };

  return (
    <>
      <button
        onClick={handleBack}
        style={{ marginBottom: '16px', marginTop: '16px', display: 'flex', alignItems: 'center' }}
      >
        <Icon icon="arrow_back" style={{ fontSize: '24px', marginRight: '8px' }} />
        Back to Topics
      </button>
      <h1 className="topicTitle" style={{ display: 'flex', alignItems: 'center' }}>
        {selectedTopic.icon && (
            <span
              className="topic-icon"
              dangerouslySetInnerHTML={{ __html: selectedTopic.icon }}
              style={{
                display: 'inline-flex',
                width: '24px',
                height: '24px',
                marginRight: '15px'
              }}
            />
        )}
        <span>{selectedTopic.title}</span>
      </h1>
      <p className="topicDescription">{selectedTopic.description}</p>
      {activeTab >= 0 && (
        <div className="desktop-only">
          <div className="tabs">
            {selectedTopic.categories.map((cat, idx) => (
              <button
                key={cat.category_name}
                className={`tab ${activeTab === idx ? 'active' : ''}`}
                onClick={() => {
                  const base = encodeURIComponent(selectedTopic.title);
                  window.location.hash = `${base}/${idx}`;
                  setActiveTab(idx);
                }}
              >
                {cat.category_name}
              </button>
            ))}
          </div>
          <div style={{ marginTop: '16px' }}>
            <h2 className="topicTitle" style={{ display: 'flex', alignItems: 'center' }}>
              <Icon icon="category" style={{ fontSize: '24px', marginRight: '8px' }} />
              {selectedTopic.categories[activeTab].category_name}
            </h2>
            <p className="topicDescription">
              {selectedTopic.categories[activeTab].category_description}
            </p>
            {selectedTopic.categories[activeTab].scriptures.map((s, i) => (
              <Card key={i} style={{ margin: '8px 0' }}>
                <CardPrimaryAction style={{ padding: '16px' }}>
                  <h3 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                    <Icon icon="menu_book" style={{ fontSize: '24px', marginRight: '8px' }} />
                    {s.reference}
                  </h3>
                  <p style={{ fontWeight: 'bold', margin: '8px 0 4px' }}>{s.text}</p>
                  <p style={{ fontStyle: 'italic', color: 'var(--color-text-secondary)', margin: 0 }}>
                    {s.context_description}
                  </p>
                </CardPrimaryAction>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
}