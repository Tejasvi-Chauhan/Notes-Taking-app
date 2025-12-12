import {Note} from '../model/Note.js';
export  const getAllNotes= async (req,res)=>{
    try{
         const notes= await Note.find({}).sort({createdAt: -1}); // Sort by newest first
         res.status(200).json(notes);
    }
    catch(err){
        res.status(500).json({message: "Error fetching notes"});
    }
};

export const getNote= async (req,res)=>{
    try{
         const noteId=req.params.id;
         const note=await Note.findById(noteId);
         if(!note){
            return res.status(404).json({message: "Note not found"});
         }
            res.status(200).json(note);

    }
    catch(err){
        res.status(500).json({message: "Error fetching note"});
    }
}


export const addNote= async (req,res)=>{
    try{

        const {title,content}=req.body;
        const newNote= new Note({title,content});
        await newNote.save();
        res.status(201).json({message: "Note added successfully"});
    }
    catch(err){
      
        res.status(500).json({message: "Error adding note"});
    }
};

export const updateNote=(req,res)=>{
    try{

        const {title,content}=req.body;
        const noteId=req.params.id;
        const updateNote= async()=>{
            await Note.findByIdAndUpdate(noteId,{title,content},{new:true});
        }
        updateNote();
        if(!updateNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message: `Note updated successfully`});
    }
    catch(err){
        res.status(500).json({message: "Error updating note"});
    }
};

export const deleteNote= async (req,res)=>{
    try{
        const noteid=req.params.id;
        const deletedNote= await Note.findByIdAndDelete(noteid);
        if(!deletedNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message: "Note deleted successfully"});
    }
    catch(err){ 
        res.status(500).json({message: "Error deleting note"});
    }
    };
  
