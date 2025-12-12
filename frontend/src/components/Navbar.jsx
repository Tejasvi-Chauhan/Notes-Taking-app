import React from "react";
import {Link} from "react-router";
import {PlusIcon} from "lucide-react";

export const Header=()=>{
    return(
        <header className="bg-gray-800 text-white p-4 mb-8 ">
            <div className=" mx-auto max-w-6xl p-4 ">
               <div className="flex items-center justify-between">
                 <h1 className="text-3xl font-bold underline">
                    Notes App
                    </h1>
                    <div className="ml-4">
                        <Link to="/create" className="btn btn-primary btn-sm rounded-btn mr-2 flex items-center">
                            <PlusIcon className="w-4 h-4 mr-1"/> 
                            <span>New Note</span>

                        </Link>
                       
                    </div>
                </div>
               

            </div>
        </header>
    )
}