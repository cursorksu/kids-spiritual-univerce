import React from 'react';

export const HighlightButton = ({ content, onClick }) => (
  <div className="mic" onClick={onClick} role="button">
    <div className="mic-content">{content}</div>
    <div className="mic-icon" />
    <div className="mic-shadow"></div>
  </div>
);
