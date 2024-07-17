import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignupPage } from "./pages/Signup";
import { SigninPage } from "./pages/Signin";
import { BlogPage } from "./pages/Blog";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}