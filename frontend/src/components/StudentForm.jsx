import React from 'react';
import { UserPlus, Save, X, RefreshCw, BookOpen, Layers, User } from 'lucide-react';

export default function StudentForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
  isSubmitting,
  formRef,
}) {
  return (
    <div
      ref={formRef}
      className={`bg-white rounded-2xl border shadow-sm transition-all duration-200 overflow-hidden ${
        isEditing
          ? 'border-indigo-500 ring-2 ring-indigo-500/20'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Header */}
      <div className={`px-6 py-4 border-b flex items-center justify-between ${
        isEditing ? 'bg-indigo-50/70 border-indigo-100' : 'bg-slate-50/80 border-slate-100'
      }`}>
        <div className="flex items-center space-x-2.5">
          <div className={`p-2 rounded-lg ${
            isEditing ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-white'
          }`}>
            {isEditing ? <Save className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {isEditing ? `Edit Student (ID: #${formData.id})` : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditing ? 'Update the student profile details below' : 'Fill in the information to enroll a student'}
            </p>
          </div>
        </div>

        {isEditing && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 animate-pulse">
            Edit Mode
          </span>
        )}
      </div>

      {/* Form Body */}
      <form onSubmit={onSubmit} className="p-6 space-y-4">
        {/* First Name & Last Name Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstname" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              First Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="firstname"
                name="firstname"
                required
                value={formData.firstname}
                onChange={onChange}
                placeholder="e.g. Juan"
                className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="lastname" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Last Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="lastname"
                name="lastname"
                required
                value={formData.lastname}
                onChange={onChange}
                placeholder="e.g. Dela Cruz"
                className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Course & Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="course" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Course / Degree <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="course"
                name="course"
                required
                value={formData.course}
                onChange={onChange}
                placeholder="e.g. BS Information Technology"
                className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="section" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Section <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Layers className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="section"
                name="section"
                required
                value={formData.section}
                onChange={onChange}
                placeholder="e.g. 3-A"
                className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-end space-x-3">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors cursor-pointer flex items-center space-x-1.5 disabled:opacity-50"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-all cursor-pointer flex items-center space-x-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Clear Fields
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-all cursor-pointer flex items-center space-x-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Adding Student...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Add Student</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
