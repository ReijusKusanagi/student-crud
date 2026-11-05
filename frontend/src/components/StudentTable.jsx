import React, { useState, useMemo } from 'react';
import {
  Search,
  Edit2,
  Trash2,
  AlertCircle,
  GraduationCap,
  Filter,
  Check,
  X,
  RefreshCw,
} from 'lucide-react';

export default function StudentTable({
  students,
  isLoading,
  onEdit,
  onDelete,
  onRefresh,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('ALL');
  const [deletingId, setDeletingId] = useState(null);

  // Extract unique courses for filtering
  const courses = useMemo(() => {
    const set = new Set();
    students.forEach((s) => {
      if (s.course && s.course.trim()) {
        set.add(s.course.trim());
      }
    });
    return Array.from(set).sort();
  }, [students]);

  // Filter students based on search term & course
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const fullName = `${student.firstname || ''} ${student.lastname || ''}`.toLowerCase();
      const course = (student.course || '').toLowerCase();
      const section = (student.section || '').toLowerCase();
      const idStr = String(student.id || '');
      const query = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !query ||
        fullName.includes(query) ||
        course.includes(query) ||
        section.includes(query) ||
        idStr.includes(query);

      const matchesCourse =
        selectedCourse === 'ALL' ||
        (student.course && student.course.trim().toLowerCase() === selectedCourse.toLowerCase());

      return matchesSearch && matchesCourse;
    });
  }, [students, searchTerm, selectedCourse]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Search and Filters Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, ID, course, section..."
            className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors placeholder:text-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter and Refresh */}
        <div className="flex items-center space-x-2">
          {courses.length > 0 && (
            <div className="relative">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="text-sm bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors cursor-pointer"
              >
                <option value="ALL">All Courses ({students.length})</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={onRefresh}
            title="Refresh List"
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-indigo-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4 sm:px-6">ID</th>
              <th className="py-3 px-4 sm:px-6">Student Name</th>
              <th className="py-3 px-4 sm:px-6">Course</th>
              <th className="py-3 px-4 sm:px-6">Section</th>
              <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700 font-normal">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
                    <span className="text-sm font-medium">Fetching students...</span>
                  </div>
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2 text-slate-400">
                    <GraduationCap className="w-10 h-10 text-slate-300 stroke-[1.5]" />
                    <p className="font-medium text-slate-600">
                      {searchTerm || selectedCourse !== 'ALL'
                        ? 'No students match your filter criteria'
                        : 'No students enrolled yet'}
                    </p>
                    <p className="text-xs text-slate-400">
                      {searchTerm || selectedCourse !== 'ALL'
                        ? 'Try modifying your search keywords or course filter'
                        : 'Use the form to add your first student record'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => {
                const isConfirmingDelete = deletingId === student.id;

                return (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* ID */}
                    <td className="py-3.5 px-4 sm:px-6 font-mono text-xs font-semibold text-slate-400">
                      #{student.id}
                    </td>

                    {/* Full Name */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="font-semibold text-slate-900">
                        {student.firstname} {student.lastname}
                      </div>
                    </td>

                    {/* Course */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {student.course}
                      </span>
                    </td>

                    {/* Section */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700">
                        {student.section}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      {isConfirmingDelete ? (
                        <div className="inline-flex items-center space-x-1.5 bg-rose-50 border border-rose-200 px-2 py-1 rounded-xl animate-fadeIn">
                          <span className="text-xs font-semibold text-rose-700 pr-1">
                            Delete?
                          </span>
                          <button
                            onClick={() => {
                              onDelete(student.id);
                              setDeletingId(null);
                            }}
                            className="p-1 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors"
                            title="Confirm delete"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeletingId(null)}
                            className="p-1 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center space-x-1">
                          <button
                            onClick={() => onEdit(student)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit student"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingId(student.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete student"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer stats */}
      <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/40 text-xs text-slate-500 flex items-center justify-between">
        <span>
          Showing {filteredStudents.length} of {students.length} students
        </span>
        {searchTerm && (
          <span className="font-medium text-indigo-600">
            Filtered by &quot;{searchTerm}&quot;
          </span>
        )}
      </div>
    </div>
  );
}
