import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form } from 'react-bootstrap';

export default function Editor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
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
  ];

  return (
    <Form.Group className="mb-3">
      <Form.Label>Content</Form.Label>
      <div className="content">
        <ReactQuill
          value={value}
          theme="snow"
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Write your post content here"
        />
      </div>
    </Form.Group>
  );
}
