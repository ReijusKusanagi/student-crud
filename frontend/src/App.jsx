import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import Toast from './components/Toast';
import { studentApi } from './api/studentApi';
import { Users, GraduationCap, Layers, Server } from 'lucide-react';

const initialFormData = {
  id: null,
  firstname: '',
  lastname: '',
  course: '',
  section: '',
};

export default function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [toast, setToast] = useState(null);
  const [backendConnected, setBackendConnected] = useState(true);

  const formRef = useRef(null);

  // Load students from backend
  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const data = await studentApi.getAll();
      setStudents(Array.isArray(data) ? data : []);
      setBackendConnected(true);
    } catch (err) {
      console.error('Fetch students error:', err);
      setBackendConnected(false);
      showToast('error', 'Connection Error', 'Could not fetch students from Spring Boot API. Make sure the backend is running on port 8080.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setIsEditing(false);
  };

  const handleEdit = (student) => {
    setFormData({
      id: student.id,
      firstname: student.firstname || '',
      lastname: student.lastname || '',
      course: student.course || '',
      section: student.section || '',
    });
    setIsEditing(true);

    // Smooth scroll to form
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const firstname = formData.firstname.trim();
    const lastname = formData.lastname.trim();
    const course = formData.course.trim();
    const section = formData.section.trim();

    if (!firstname || !lastname || !course || !section) {
      showToast('error', 'Validation Failed', 'All fields are required.');
      return;
    }

    const payload = { firstname, lastname, course, section };
    setIsSubmitting(true);

    try {
      if (isEditing && formData.id) {
        const updated = await studentApi.update(formData.id, payload);
        showToast('success', 'Student Updated', `Successfully updated profile for ${updated.firstname} ${updated.lastname}.`);
      } else {
        const created = await studentApi.create(payload);
        showToast('success', 'Student Enrolled', `Successfully added ${created.firstname} ${created.lastname} to the database.`);
      }

      handleCancel();
      await fetchStudents();
    } catch (err) {
      console.error('Form submit error:', err);
      showToast('error', isEditing ? 'Update Failed' : 'Creation Failed', err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await studentApi.delete(id);
      showToast('success', 'Student Deleted', `Student record #${id} has been removed.`);
      // Optimistic state update
      setStudents((prev) => prev.filter((s) => s.id !== id));
      if (isEditing && formData.id === id) {
        handleCancel();
      }
    } catch (err) {
      console.error('Delete error:', err);
      showToast('error', 'Delete Failed', err.message || 'Could not delete student record');
    }
  };

  // Quick stats
  const uniqueCoursesCount = new Set(students.map((s) => s.course).filter(Boolean)).size;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar studentCount={students.length} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Connection status alert if backend unreachable */}
        {!backendConnected && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between shadow-xs">
            <div className="flex items-center space-x-3">
              <Server className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <p className="font-semibold text-sm">Spring Boot API Unreachable</p>
                <p className="text-xs text-amber-700">
                  Ensure the backend application is running on port 8080 (<code>http://localhost:8080/cruz/students</code>).
                </p>
              </div>
            </div>
            <button
              onClick={fetchStudents}
              className="text-xs font-semibold px-3 py-1.5 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Dashboard Metric Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Students</p>
              <p className="text-2xl font-bold text-slate-900">{students.length}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Courses</p>
              <p className="text-2xl font-bold text-slate-900">{uniqueCoursesCount}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">API Status</p>
              <p className="text-sm font-bold text-emerald-600 flex items-center space-x-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{backendConnected ? 'Active (Port 8080)' : 'Offline'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Embedded Side-by-Side Dashboard Layout (No Modal Pop-up) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Embedded Form Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <StudentForm
              formRef={formRef}
              formData={formData}
              onChange={handleFormChange}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
              isEditing={isEditing}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Right Column: Searchable Student Table */}
          <div className="lg:col-span-7">
            <StudentTable
              students={students}
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRefresh={fetchStudents}
            />
          </div>
        </div>
      </main>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
