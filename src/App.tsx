import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";

import Layout from "./components/Layout";
import Chats from "./pages/Chats";
import Meets from "./pages/Meets";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected */}
        <Route element={<Layout />}>
          <Route path="/chats" element={<Chats />} />
          <Route path="/meets" element={<Meets />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
