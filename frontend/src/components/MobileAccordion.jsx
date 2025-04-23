import React from 'react';
import {
  CollapsibleList,
  ListItem,
  ListItemText,
  ListItemMeta,
  Card,
  CardPrimaryAction
} from 'rmwc';
import './MobileAccordion.css';

// Mobile accordion list for categories
export default function MobileAccordion({ categories, topicIcon }) {
  return (
    <div className="mobile-only">
      {categories.map((cat, idx) => (
        <CollapsibleList
          key={cat.category_name}
          handle={
            <ListItem>
              {topicIcon && (
                <span
                  className="topic-icon"
                  dangerouslySetInnerHTML={{ __html: topicIcon }}
                  style={{
                    display: 'inline-block',
                    width: '24px',
                    height: '24px',
                    marginRight: '15px',
                    verticalAlign: 'middle'
                  }}
                />
              )}
              <ListItemText>{cat.category_name}</ListItemText>
              <ListItemMeta>
                <img
                  src="/img/accord.png"
                  alt="Toggle"
                  style={{ width: '24px', height: '24px', marginLeft: 'auto' }}
                />
              </ListItemMeta>
            </ListItem>
          }
        >
          <div style={{ marginTop: '16px' }}>
            <h2 className="topicTitle">{cat.category_name}</h2>
            <p className="topicDescription">{cat.category_description}</p>
            {cat.scriptures.map((s, i) => (
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
        </CollapsibleList>
      ))}
    </div>
  );
}