import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth, Book, User, Tourist } from "@/layouts";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/tourist/*" element={<Tourist />} />
      <Route path="/user/*" element={<User />} />
      <Route path="/book/*" element={<Book />} />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}

export default App;
