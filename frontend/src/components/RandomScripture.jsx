import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './RandomScripture.css';

export default function RandomScripture({ topics }) {
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    if (!topics || topics.length === 0) return;
    const topic = topics[Math.floor(Math.random() * topics.length)];
    if (!topic.categories || topic.categories.length === 0) return;
    const category = topic.categories[Math.floor(Math.random() * topic.categories.length)];
    if (!category.scriptures || category.scriptures.length === 0) return;
    const scripture = category.scriptures[Math.floor(Math.random() * category.scriptures.length)];
    setEntry({ topic, category, scripture });
  }, [topics]);

  if (!entry) return null;

  return (
    <div className="random-scripture">
      <h2 className="random-topic-title">{entry.topic.title}</h2>
      <p className="random-topic-desc">{entry.topic.description}</p>
      <h3 className="random-category-title">{entry.category.category_name}</h3>
      <p className="random-category-desc">{entry.category.category_description}</p>
      <div className="random-scripture-text">
        <strong>{entry.scripture.reference}</strong>
        <p className="random-verse">{entry.scripture.text}</p>
        <p className="random-context">{entry.scripture.context_description}</p>
      </div>
    </div>
  );
}

RandomScripture.propTypes = {
  topics: PropTypes.array.isRequired
};
