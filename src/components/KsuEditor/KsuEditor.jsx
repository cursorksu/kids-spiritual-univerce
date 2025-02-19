import {
    useEffect,
    useState,
} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';

export const KsuEditor = ({ placeholder, value, onChange }) => {
    const [editorContent, setEditorContent] = useState(
            value || '');
console.log(editorContent, value);
    useEffect(() => {
        if (value !== editorContent) {
            setEditorContent(value || '');
        }
    }, [value]);

    const handleEditorChange = (e) => {
        console.log({ e });
        setEditorContent(e);
        onChange?.(e);
    };

    return (
            <>
                <Editor
                        value={editorContent}
                        apiKey="tjh21qmjeyamxzmx3g471b3f0vx7sudiou2vlzh7e8xpfjn6"
                        onEditorChange={handleEditorChange}
                        placeholder={placeholder}
                        init={{
                            plugins: [
                                // Core editing features
                                'anchor',
                                'autolink',
                                'charmap',
                                'codesample',
                                'emoticons',
                                'image',
                                'link',
                                'lists',
                                'media',
                                'searchreplace',
                                'table',
                                'visualblocks',
                                'wordcount',
                            ],
                            // toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                        }}
                />
            </>
    );
};

KsuEditor.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};