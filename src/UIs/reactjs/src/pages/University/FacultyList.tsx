import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFaculties, createFaculty, updateFaculty, deleteFaculty } from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';

const FacultyList: React.FC = () => {
  const { universityId } = useParams<{ universityId: string }>();
  const { user, role } = useAuth();
  const [faculties, setFaculties] = useState<any[]>([]);
  const [newFaculty, setNewFaculty] = useState('');
  const [editFacultyId, setEditFacultyId] = useState<number | null>(null);
  const [editFacultyName, setEditFacultyName] = useState('');

  useEffect(() => {
    loadFaculties();
  }, [universityId]);

  const loadFaculties = async () => {
    try {
      const response = await getFaculties(parseInt(universityId!));
      setFaculties(response.data);
    } catch (error) {
      console.error('Failed to load faculties:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await createFaculty({ name: newFaculty, universityId: parseInt(universityId!) });
      setNewFaculty('');
      loadFaculties();
    } catch (error) {
      console.error('Failed to create faculty:', error);
    }
  };

  const handleUpdate = async () => {
    if (editFacultyId !== null) {
      try {
        await updateFaculty(editFacultyId, { id: editFacultyId, name: editFacultyName, universityId: parseInt(universityId!) });
        setEditFacultyId(null);
        setEditFacultyName('');
        loadFaculties();
      } catch (error) {
        console.error('Failed to update faculty:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFaculty(id);
      loadFaculties();
    } catch (error) {
      console.error('Failed to delete faculty:', error);
    }
  };

  return (
    <div>
      <h2>Faculties</h2>
      <ul>
        {faculties.map(faculty => (
          <li key={faculty.id}>
            {faculty.name}
            {role === 'Admin' && (
              <>
                <button onClick={() => { setEditFacultyId(faculty.id); setEditFacultyName(faculty.name); }}>Edit</button>
                <button onClick={() => handleDelete(faculty.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      {role === 'Admin' && (
        <div>
          <h3>Create Faculty</h3>
          <input
            type="text"
            value={newFaculty}
            onChange={(e) => setNewFaculty(e.target.value)}
            placeholder="Faculty Name"
          />
          <button onClick={handleCreate}>Create</button>
          {editFacultyId !== null && (
            <div>
              <h3>Edit Faculty</h3>
              <input
                type="text"
                value={editFacultyName}
                onChange={(e) => setEditFacultyName(e.target.value)}
                placeholder="Faculty Name"
              />
              <button onClick={handleUpdate}>Update</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FacultyList;
