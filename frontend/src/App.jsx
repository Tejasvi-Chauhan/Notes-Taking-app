import React from 'react'
import {Routes, Route} from "react-router";
import { HomePage } from './pages/HomePage.jsx';
import { CreatePage } from './pages/CreatePage.jsx';
import { NoteDetailPage } from './pages/NoteDetailPage.jsx';
import Footer from './components/Footer.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import NotFound from "./pages/NotFound";


const App = () => {
  return (
    <div data-theme="night">
      <Routes>
      
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
       

        {/* PROTECTED */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/note/:id"
          element={
            <ProtectedRoute>
              <NoteDetailPage />
            </ProtectedRoute>
          }
        />
       
      <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>

    </div>
  )
}

export default App
