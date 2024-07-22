import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignupPage } from "./pages/Signup";
import { SigninPage } from "./pages/Signin";
import { BlogsPage } from "./pages/Blogs";
import { BlogPage } from "./pages/BlogPage";
import { PublishBlog } from "./pages/PublishBlog";
import { ProfilePage } from "./pages/ProfilePage";
import { UpdateBlog } from "./pages/UpdateBlog";
import { DeleteBlog } from "./pages/DeleteBlog";
import { Appbar } from "./components/Appbar";
import { PrivateRoutes } from "./components/PrivateRoutes";


export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Appbar />
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<BlogsPage />} />
            <Route path="/blog/:id" element={<BlogPage />} />
            <Route path="/publish" element={<PublishBlog />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/blog/update/:id" element={<UpdateBlog />} />
            <Route path="/blog/delete/:id" element={<DeleteBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}