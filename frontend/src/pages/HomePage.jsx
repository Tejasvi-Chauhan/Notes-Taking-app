import React from 'react';
import {Header} from "../components/Navbar.jsx";
import {useEffect} from "react";

import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { RateLimiterUI } from '../components/RateLimiterUI.jsx';
import { NoteCard } from '../components/NoteCard.jsx';
import api from '../lib/Api.js';

export const HomePage =()=>{
    const [isRateLimited, setIsRateLimited]=React.useState(false);
    const [notes, setNotes]=React.useState([]);
    const [loading, setLoading]=React.useState(true);
    
    useEffect(()=>{
        const fetchNotes=async()=>{
            try{
                const res =await api.get(`/api/notes`);
                setNotes (res.data);
                setLoading(false);
                setIsRateLimited(false);
            }catch(err){
                if(err.response && err.response.status===429){
                    setIsRateLimited(true);
                } 
                else{
                    toast.error("Failed to load notes");
                }
               
            }finally{
                setLoading(false);
            }
        };
        fetchNotes();
    },[]);  

    return(
        <>
        <div className="container mx-auto">
            <Header/>
            {isRateLimited && <RateLimiterUI/>}

            <div  className="max-w-7xl mx-auto p-4 mt-6">
                {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

                {!loading && notes.length===0 && !isRateLimited &&(
                    <div className="text-center text-gray-600 py-10">
                        <h2 className="text-2xl font-bold mb-4">No notes found</h2> 
                        <p className="mb-4">You haven't created any notes yet.</p>
                        <Link to="/create" className="btn btn-primary">
                            Create your first note
                        </Link>
                    </div>
                )}  

                {notes.length>0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note)=>(
                            <Link to={`/note/${note._id}`} key={note._id} >

                               <NoteCard key={note._id} note={note} setNotes={setNotes}/> 
                                
                               
                            </Link>
                        ))}
                    </div>

                )}
            </div>
        </div>
        </>
    )
}