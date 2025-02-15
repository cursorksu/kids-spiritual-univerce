import { useEffect, useState } from 'react';

import './styles.scss';
import PropTypes from 'prop-types';

const Editor = ({ placeholder, value, onChange }) => {
  const [editorHtml, setEditorHtml] = useState(value || <p>...</p>);

  useEffect(() => {
    setEditorHtml(value);
  }, [value]);

  const handleChange = (html) => {
    setEditorHtml(html);
    if (onChange) {
      onChange(html);
    }
  };

  return (
    <>Editor</>
  );
};
Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  imageResize: {
    parchment: '',
    modules: ['Resize', 'DisplaySize'],
  },
};

Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

export default Editor;

Editor.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

