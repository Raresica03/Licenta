import React, { useEffect, useState } from 'react';
import { getUniversities, createUniversity, updateUniversity, deleteUniversity } from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';

const UniversityList: React.FC = () => {
  const { user, role } = useAuth();
  const [universities, setUniversities] = useState<any[]>([]);
  const [newUniversity, setNewUniversity] = useState('');
  const [editUniversityId, setEditUniversityId] = useState<number | null>(null);
  const [editUniversityName, setEditUniversityName] = useState('');

  useEffect(() => {
    loadUniversities();
  }, []);

  const loadUniversities = async () => {
    try {
      const response = await getUniversities();
      setUniversities(response.data);
    } catch (error) {
      console.error('Failed to load universities:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await createUniversity({ name: newUniversity });
      setNewUniversity('');
      loadUniversities();
    } catch (error) {
      console.error('Failed to create university:', error);
    }
  };

  const handleUpdate = async () => {
    if (editUniversityId !== null) {
      try {
        await updateUniversity(editUniversityId, { id: editUniversityId, name: editUniversityName });
        setEditUniversityId(null);
        setEditUniversityName('');
        loadUniversities();
      } catch (error) {
        console.error('Failed to update university:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUniversity(id);
      loadUniversities();
    } catch (error) {
      console.error('Failed to delete university:', error);
    }
  };

  return (
    <div>
      <h2>Universities</h2>
      {role}
      <ul>
        {universities.map(university => (
          <li key={university.id}>
            {university.name}
            {role === 'Admin' && (
              <>
                <button onClick={() => { setEditUniversityId(university.id); setEditUniversityName(university.name); }}>Edit</button>
                <button onClick={() => handleDelete(university.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      {role === 'Admin' && (
        <div>
          <h3>Create University</h3>
          <input
            type="text"
            value={newUniversity}
            onChange={(e) => setNewUniversity(e.target.value)}
            placeholder="University Name"
          />
          <button onClick={handleCreate}>Create</button>
          {editUniversityId !== null && (
            <div>
              <h3>Edit University</h3>
              <input
                type="text"
                value={editUniversityName}
                onChange={(e) => setEditUniversityName(e.target.value)}
                placeholder="University Name"
              />
              <button onClick={handleUpdate}>Update</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UniversityList;
