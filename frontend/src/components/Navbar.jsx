import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { PlusIcon, LogOutIcon } from "lucide-react";
import api from "../lib/Api";

export const Header = ({ searchInput, setSearchInput, onSearch }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };
  return (
    <>
      <header className="bg-gray-800 text-white p-4 mb-8 ">
        <div className=" mx-auto max-w-6xl p-4 ">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold underline">Notes App</h1>
            <div  className="hidden md:flex items-center gap-2">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                 className="px-3 py-1.5 rounded-full bg-slate-900 w-64 h-10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />

              {/* SEARCH BUTTON */}
              <button onClick={onSearch} className="btn btn-sm btn-outline rounded-full  h-[34px]">
                Search
              </button>
            </div>

            <div className="ml-4 flex items-center justify-evenly">
              <Link
                to="/create"
                className="btn btn-primary btn-sm rounded-btn mr-2 flex items-center"
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                <span>New Note</span>
              </Link>

              <button
                onClick={() => setShowLogoutModal(true)}
                className="btn btn-outline btn-error btn-sm flex items-center"
              >
                <LogOutIcon className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}
          <div
            onClick={() => setShowLogoutModal(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* modal */}
          <div className="relative w-[90%] max-w-sm rounded-2xl bg-gradient-to-br from-slate-900 to-gray-900 p-6 shadow-2xl border border-white/10 animate-scaleIn">
            <h3 className="text-lg font-semibold text-white">Confirm Logout</h3>

            <p className="mt-2 text-sm text-gray-400">
              Are you sure you want to logout? You’ll need to login again to
              access your notes.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  handleLogout();
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
