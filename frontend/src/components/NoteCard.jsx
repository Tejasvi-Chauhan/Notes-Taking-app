import {Link} from "react-router";
import React from "react";
import {Card} from "daisyui";
import { PenSquareIcon, Trash } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";


export const NoteCard =({note,setNotes})=>{

    const handleDelete = async(e,id)=>{
        e.preventDefault();
        e.stopPropagation();
        console.log("Delete note with id:", id);

        if(window.confirm("Are you sure you want to delete this note?")){
        
        try{
            await axios.delete(`http://localhost:8080/api/notes/${id}`);
            toast.success("Note deleted successfully");
            // Optionally, you might want to refresh the notes list here
            setNotes((prevNotes)=>prevNotes.filter((note)=>note._id !== id));
        }
        catch(err){
            toast.error("Failed to delete note");
        }
    }
    };

    return(
        <>
        <Link to={`/note/${note._id}`} key={note._id} >
        
         <div className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white h-full flex flex-col justify-between">
            <h2 className="text-xl font-bold mb-2">{note.title}</h2>
            <p className="text-gray-700">{note.content.substring(0, 100)}{note.content.length>100 ? "..." : ""}</p>
            <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-gray-500"> {new Date(note.createdAt).toLocaleDateString()}

            </span>
        
            <div className="flex items-center gap-1"> 
                <PenSquareIcon className="size-4"></PenSquareIcon>
                <button className="btn btn-ghost btn-xs text-error" onClick={(e)=>{handleDelete(e, note._id)}}>
                    <Trash className="size-4"></Trash>
                </button>
            </div>
            </div>


         </div>
        </Link>
        </>
    )
    
}