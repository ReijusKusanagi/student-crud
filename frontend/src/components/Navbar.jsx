import React from 'react';
import { GraduationCap, Users } from 'lucide-react';

export default function Navbar({ studentCount = 0 }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-sm">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Student Portal</h1>
            <p className="text-xs text-slate-500 font-medium">Cruz CRUD Management System</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 rounded-full text-indigo-700 text-sm font-semibold shadow-xs">
          <Users className="w-4 h-4 text-indigo-500" />
          <span>{studentCount} {studentCount === 1 ? 'Student' : 'Students'} Enrolled</span>
        </div>
      </div>
    </header>
  );
}
