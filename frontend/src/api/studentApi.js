// Resolve API base URL based on environment (Render production vs local dev)
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  if (envUrl && envUrl.trim()) {
    let clean = envUrl.trim().replace(/\/+$/, '');
    // If only service name provided (e.g. "student-backend")
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = clean.includes('.') ? `https://${clean}` : `https://${clean}.onrender.com`;
    }
    return `${clean}/cruz/students`;
  }

  // Local development fallback (proxied by Vite)
  return '/cruz/students';
};

const BASE_URL = getApiBaseUrl();

export const studentApi = {
  // Fetch all students
  async getAll() {
    const res = await fetch(BASE_URL, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch students (${res.status})`);
    }
    return res.json();
  },

  // Fetch student by id
  async getById(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch student with ID ${id} (${res.status})`);
    }
    return res.json();
  },

  // Create new student
  async create(studentData) {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || `Failed to create student (${res.status})`);
    }
    return res.json();
  },

  // Update existing student
  async update(id, studentData) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || `Failed to update student (${res.status})`);
    }
    return res.json();
  },

  // Delete student
  async delete(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || `Failed to delete student (${res.status})`);
    }
    return res.text();
  },
};
