import React from 'react'
import {Routes, Route} from "react-router";
import { HomePage } from './pages/HomePage.jsx';
import { CreatePage } from './pages/CreatePage.jsx';
import { NoteDetailPage } from './pages/NoteDetailPage.jsx';
import Footer from './components/Footer.jsx';


const App = () => {
  return (
    <div data-theme="night">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/create' element={<CreatePage/>}/>
        <Route path='/note/:id' element={<NoteDetailPage/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
