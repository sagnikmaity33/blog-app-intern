import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { UserContext } from "../UserContext";
import Editor from "../Editor";
import { Button, Form } from "react-bootstrap";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { userInfo } = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [coverImage, setCoverImage] = useState(null);

  const [titleError, setTitleError] = useState("");
  const [summaryError, setSummaryError] = useState("");
  const [contentError, setContentError] = useState("");
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (!userInfo?.username) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8000/post/${id}`)
      .then(response => response.json())
      .then(postInfo => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
        setCoverImage(postInfo.cover);
      })
      .catch(err => {
        console.error("Failed to load post data.",err);
      });
  }, [id, userInfo, navigate]);

  const handleFileChange = (ev) => {
    const file = ev.target.files[0];
    if (file) {
      setFiles(ev.target.files);
      setFileError("");
    }
  };

  async function updatePost(ev) {
    ev.preventDefault();

    setTitleError("");
    setSummaryError("");
    setContentError("");
    setFileError("");

    let hasError = false;

    if (title.trim().length < 40) {
      setTitleError("Title must be at least 40 characters long.");
      hasError = true;
    }

    if (summary.trim().length < 40 || summary.trim().length > 240) {
      setSummaryError("Summary must be between 40 and 240 characters.");
      hasError = true;
    }

    if (content.trim().length < 1000) {
      setContentError("Content must be at least 1000 characters long.");
      hasError = true;
    }

    if (hasError) return;

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files[0]);
    }

    try {
      const response = await fetch("http://localhost:8000/post", {
        method: "PUT",
        body: data,
        credentials: "include",
      });

      if (response.ok) {
        navigate(`/post/${id}`); 
      }
    } catch (error) {
      console.error("An error occurred while updating the post.",error);
    }
  }

  return (
    <div className="container my-5">
      <h1>Edit Post</h1>

      <Form onSubmit={updatePost}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            className={titleError ? "is-invalid" : ""}
          />
          {titleError && <div className="invalid-feedback">{titleError}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Summary</Form.Label>
          <Form.Control
            type="text"
            placeholder="Summary"
            value={summary}
            onChange={(ev) => setSummary(ev.target.value)}
            className={summaryError ? "is-invalid" : ""}
          />
          {summaryError && <div className="invalid-feedback">{summaryError}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            className={fileError ? "is-invalid" : ""}
          />
          {fileError && <div className="invalid-feedback d-block">{fileError}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Editor onChange={setContent} value={content} />
          {contentError && <div className="text-danger mt-1">{contentError}</div>}
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Update Post
        </Button>
      </Form>
    </div>
  );
}
