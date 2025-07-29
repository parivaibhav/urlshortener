import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AnalyticsPage from './pages/AnalyticsPage';
import SignIn from './pages/GoogleSignIn';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.FRONTEND_GOOGLE_CLIENT_ID}>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/analytics"
              element={
                localStorage.getItem('token') ? <AnalyticsPage /> : <Navigate to="/signin" />
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<div className="text-center p-8">404 - Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}
export default App;