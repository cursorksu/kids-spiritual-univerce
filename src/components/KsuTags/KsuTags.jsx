import { useEffect, useState } from 'react';
import { KsuTagsStyled } from './styles';

export const KsuTags = ({ placeholder, onChange, field, value }) => {
  const [tags, setTags] = useState(value ?? []);

  useEffect(() => {
    onChange(tags);
  }, [tags]);

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = '';
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  const [focused, setFocused] = useState(false);

  return (
    <KsuTagsStyled>
      <div className={`tags-input-container ${focused && 'focused'}`}>
        {tags.length > 0 && tags.map((tag, index) => (
          <div className="tag-item" key={index}>
            <span className="text">{tag}</span>
            <span className="close" onClick={() => removeTag(index)}>
              &times;
            </span>
          </div>
        ))}
        <input
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          type="text"
          className="tags-input"
          placeholder={placeholder}
        />
      </div>
    </KsuTagsStyled>
  );
};
