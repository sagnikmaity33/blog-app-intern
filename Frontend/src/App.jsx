import { Route, Routes } from 'react-router-dom';
import { UserContextProvider } from './UserContext.jsx';
import './App.css';
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePost from './pages/CreatePost.jsx';
import PostPage from './pages/PostPage.jsx';
import EditPost from './pages/EditPost.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactUsPage from './pages/ContactPage.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
