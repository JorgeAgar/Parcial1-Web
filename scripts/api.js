// API Configuration
const API_URL = 'https://dvkvmjdefaytycdbsntd.supabase.co/rest/v1';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2a3ZtamRlZmF5dHljZGJzbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MjE1MjAsImV4cCI6MjA1OTI5NzUyMH0.wYHbfTAJyIp2CLfU4LcIJfJAMrVq41zUK6kw5GZ01ts';
 
// API Service
const api = {
  // Headers for API requests
  headers: {
    'apikey': API_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
    'Access-Control-Allow-Origin': '*'
  },

  
  // Fetch all students
  async getStudents() {
    try {
      const response = await fetch(`${API_URL}/alumno?select=*`, {
        headers: this.headers
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },


  // Fetch a single student by code
  async getStudentByCode(code) {
    try {
      const response = await fetch(`${API_URL}/alumno?codigo=eq.${code}&select=*`, {
        headers: this.headers
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch student');
      }
      
      const data = await response.json();
      return data[0] || null;
    } catch (error) {
      console.error(`Error fetching student with code ${code}:`, error);
      throw error;
    }
  },


  // Create a new student
  async createStudent(student) {
    try {
      const response = await fetch(`${API_URL}/alumno`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(student)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create student');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  },


  // Update an existing student
  async updateStudent(code, student) {
    try {
      const response = await fetch(`${API_URL}/alumno?codigo=eq.${code}`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(student)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update student');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error updating student with code ${code}:`, error);
      throw error;
    }
  },


  // Fetch all subjects
  async getAsignaturas() {
    try {
      const response = await fetch(`${API_URL}/asignatura?select=*`, {
        headers: this.headers
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch subjects');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching subjects:', error);
      throw error;
    }
  },

  async getMatriculas() {
    try {
      const response = await fetch(`${API_URL}/matricula?select=*`, {
        headers: this.headers
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch enrolments');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching enrolments:', error);
      throw error;
    }
  },


  // Fetch technologies for a specific student
  async getAsignaturasEstudiante(studentCode) {
    try {
      const response = await fetch(
        `${API_URL}/matricula?codigo_alumno=eq.${studentCode}&select=asignatura(*)`, {
        headers: this.headers
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch student technologies');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching technologies for student ${studentCode}:`, error);
      throw error;
    }
  },

  async getMateria(codMateria){
    try {
        const response = await fetch(
          `${API_URL}/asignatura?codigo=eq.${codMateria}`, {
          headers: this.headers
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch student technologies');
        }
        
        return await response.json();
      } catch (error) {
        console.error(`Error trayendo la materia ${codMateria}:`, error);
        throw error;
      }
  },


  // Add a subject to a student
  async addStudentSubject(studentSubject) {
    try {
      const response = await fetch(`${API_URL}/matricula`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(studentSubject)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add subject to student');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding subject to student:', error);
      throw error;
    }
  },

  // Add a subject to a student
  async deleteStudentSubject(studentCode, subjectCode) {
    try {
      const response = await fetch(`${API_URL}/matricula?codigo_alumno=eq.${studentCode}&codigo_asignatura=eq.${subjectCode}`, {
        method: 'DELETE',
        headers: this.headers,
        body: JSON.stringify(studentSubject)
      });
        
      if (!response.ok) {
        throw new Error('Failed to add subject to student');
      }
        
      return await response.json();
    } catch (error) {
      console.error('Error adding subject to student:', error);
      throw error;
    }
  }
};