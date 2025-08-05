import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Editor from "../Editor";
import { Button, Form } from "react-bootstrap";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);

  const [titleError, setTitleError] = useState("");
  const [summaryError, setSummaryError] = useState("");
  const [contentError, setContentError] = useState("");
  const [fileError, setFileError] = useState("");

  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.username) {
      navigate("/login"); 
    }
  }, [userInfo, navigate]);

  const handleFileChange = (ev) => {
    const file = ev.target.files[0];
    if (file) {
      setFiles(ev.target.files);
      setFileError("");
    }
  };

  async function createNewPost(ev) {
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

    if (!files || files.length === 0) {
      setFileError("Image is required.");
      hasError = true;
    }

    if (hasError) return;

  
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (files && files[0]) {
      data.set("file", files[0]);
    }

    try {
      const response = await fetch("http://localhost:8000/post", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (response.ok) {
        navigate("/"); 
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  return (
    <div className="container my-5">
      <h1>Create New Post</h1>
      <Form onSubmit={createNewPost}>
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

        <Button variant="primary" type="submit" className="w-100 mt-3">
          Create Post
        </Button>
      </Form>
    </div>
  );
}
