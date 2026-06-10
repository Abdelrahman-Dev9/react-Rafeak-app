import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admins from "./pages/Admins";
import CreateNewPassword from "./pages/auth/CreateNewPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import OtpVerification from "./pages/auth/OtpVerification";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import TrackingList from "./pages/TrackingList";
import Users from "./pages/Users";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/create-new-password" element={<CreateNewPassword />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tracking" element={<TrackingList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
