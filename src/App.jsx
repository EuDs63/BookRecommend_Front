import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth,Tourist,User } from "@/layouts";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/tourist/*" element={<Tourist />} />
      <Route path="/user/*" element={<User />} />
      <Route path="*" element={<Navigate to="/dashboard/main" replace />} />
    </Routes>
  );
}

export default App;
