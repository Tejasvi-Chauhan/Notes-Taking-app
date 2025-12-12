import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react"
import { Link } from "react-router";
import { Header } from "../components/Navbar.jsx";
import toast from "react-hot-toast";
import api from "../lib/Api.js";

import { useNavigate } from "react-router";


export const CreatePage =()=>{

    const [title, setTitle]=useState("");
    const [content, setContent]=useState("");
     const [loading, setLoading]=useState(false);
    const navigate =useNavigate();

     const handleSubmit=async(e)=>{
        e.preventDefault();
       if(!title.trim() || !content.trim()){
        toast.error("Please fill in all fields");
        return;
       }
         setLoading (true);
            try{
                await api.post(`/api/notes`,{
                    title,
                    content,
                });
                toast.success("Note created successfully");
                navigate("/");
            }catch(err){
                if(err.response && err.response.status===429){
                    toast.error("Please slow down !.You are creating notes too quickly.",{ duration: 4000,icon: '⏳',});
                    return;
                }
                else{
                    toast.error("Failed to create note");
                }
                
            
            }finally{
                setLoading(false);
            }
     }
    return(
        <>
         
        <div className="min-h-screen bg-base-200">
           
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto p-4 mt-6">
                   <Link to="/" className="btn btn-ghost mb-4">
                   <ArrowLeftIcon className="w-5 h-5 mr-2"/> Back to Home
                   </Link>

                   <div className="card bg-base-300 shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Create a New Note</h2>
                    <form onSubmit={handleSubmit} noValidate
> 
                        <div className="mb-4">
                            <label className="block text-gray-400 font-bold mb-2" >Title</label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Enter title"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-300"
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-400 font-bold mb-2">Content</label>
                            <textarea   
                                id="content"
                                placeholder="Write your note here..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-300 h-40"
                                value={content}
                                onChange={(e)=>setContent(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Note"}
                        </button>
                    </form>
                   </div>
                </div>
            </div>
        </div>

        </>
    )
}