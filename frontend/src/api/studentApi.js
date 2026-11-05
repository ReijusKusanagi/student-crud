// Resolve API base URL dynamically
export const getApiBaseUrl = () => {
  // 1. Check if user configured a custom URL in the UI (stored in localStorage)
  const storedUrl = typeof window !== 'undefined' ? localStorage.getItem('student_api_url') : null;
  if (storedUrl && storedUrl.trim()) {
    const clean = storedUrl.trim().replace(/\/+$/, '');
    return clean.endsWith('/cruz/students') ? clean : `${clean}/cruz/students`;
  }

  // 2. Check environment variable injected at build time (VITE_API_BASE_URL)
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && envUrl.trim()) {
    let clean = envUrl.trim().replace(/\/+$/, '');
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = clean.includes('.') ? `https://${clean}` : `https://${clean}.onrender.com`;
    }
    return clean.endsWith('/cruz/students') ? clean : `${clean}/cruz/students`;
  }

  // 3. Local development proxy fallback
  return '/cruz/students';
};

export const setCustomApiUrl = (url) => {
  if (!url || !url.trim()) {
    localStorage.removeItem('student_api_url');
  } else {
    let clean = url.trim().replace(/\/+$/, '');
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = `https://${clean}`;
    }
    localStorage.setItem('student_api_url', clean);
  }
};

export const studentApi = {
  // Fetch all students
  async getAll() {
    const url = getApiBaseUrl();
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch students (${res.status})`);
    }
    return res.json();
  },

  // Fetch student by id
  async getById(id) {
    const url = getApiBaseUrl();
    const res = await fetch(`${url}/${id}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch student with ID ${id} (${res.status})`);
    }
    return res.json();
  },

  // Create new student
  async create(studentData) {
    const url = getApiBaseUrl();
    const res = await fetch(url, {
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
    const url = getApiBaseUrl();
    const res = await fetch(`${url}/${id}`, {
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
    const url = getApiBaseUrl();
    const res = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || `Failed to delete student (${res.status})`);
    }
    return res.text();
  },
};
