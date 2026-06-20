import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogPage from './pages/BlogPage';
import PostPage from './pages/PostPage';
import ToolsPage from './pages/ToolsPage';
import AboutPage from './pages/AboutPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManagePosts from './pages/ManagePosts';
import ManageAffiliates from './pages/ManageAffiliates';
import ManageComments from './pages/ManageComments';
import './App.css';
import SitemapPage from './pages/SitemapPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/blog/:slug' element={<PostPage />} />
        <Route path='/tools' element={<ToolsPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/posts' element={<ManagePosts />} />
        <Route path='/admin/affiliates' element={<ManageAffiliates />} />
        <Route path='/admin/comments' element={<ManageComments />} />
        <Route path='/sitemap.xml' element={<SitemapPage />} />
        <Route path='/sitemap.xml' element={<SitemapPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
