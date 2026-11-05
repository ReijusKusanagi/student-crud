const BASE_URL = '/cruz/students';

export const studentApi = {
  // Fetch all students
  async getAll() {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch students (${res.status})`);
    }
    return res.json();
  },

  // Fetch student by id
  async getById(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
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
