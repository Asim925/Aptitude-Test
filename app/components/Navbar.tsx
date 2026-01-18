"use client";
import React, { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error logging out:", error.message);
  };

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-orange-500/30 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-orange-500">
          APTITUDE TEST<span className="text-white">.</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="hover:text-orange-400 transition">
            Home
          </Link>

          <button
            onClick={handleLogout}
            className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-full font-semibold transition cursor-pointer"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl focus:outline-none"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 pb-4 animate-in fade-in slide-in-from-top-2">
          <Link
            href="/"
            className="block px-2 py-1 hover:bg-orange-500/20 rounded"
          >
            Home
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left bg-orange-600 px-4 py-2 rounded font-semibold"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
