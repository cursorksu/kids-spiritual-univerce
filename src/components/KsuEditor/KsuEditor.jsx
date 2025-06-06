import {
    useEffect,
    useState,
} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {Editor} from '@tinymce/tinymce-react';

export const KsuEditor = ({placeholder, value, onChange}) => {
    const [editorContent, setEditorContent] = useState(
        value || '');
    useEffect(() => {
        if (value !== editorContent) {
            setEditorContent(value || '');
        }
    }, [value]);

    const handleEditorChange = (e) => {
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
                        'anchor', 'autolink', 'charmap', 'codesample',
                        'emoticons', 'image', 'link', 'lists',
                        'media', 'searchreplace', 'table',
                        'visualblocks', 'wordcount',
                    ],
                    toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright | link image | bullist numlist outdent indent | removeformat',
                    link_context_toolbar: true,
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