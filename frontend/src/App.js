import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Analytics from './components/Analytics';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Link } from 'react-router-dom';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/analytics"
              element={
                localStorage.getItem('token') ? <Analytics /> : <Navigate to="/" />
              }
            />

            <Route path="*" element={<div className="text-center w-full  p-8 min-h-screen align-middle justify-center"><h2 className='text-4xl'>404 - Not Found</h2>

              <div className='mt-4 text-xl hover:text-blue-600'><Link to="/">Go to Home</Link></div>
            </div>} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}
export default App;