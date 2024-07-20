import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignupPage } from "./pages/Signup";
import { SigninPage } from "./pages/Signin";
import { BlogsPage } from "./pages/Blogs";
import { BlogPage } from "./pages/BlogPage";
import { PublishBlog } from "./pages/PublishBlog";


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
          <Route path="/publish" element={<PublishBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}