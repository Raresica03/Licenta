import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBuildings, createBuilding, updateBuilding, deleteBuilding } from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';

const BuildingList: React.FC = () => {
  const { facultyId } = useParams<{ facultyId: string }>();
  const { user, role } = useAuth();
  const [buildings, setBuildings] = useState<any[]>([]);
  const [newBuilding, setNewBuilding] = useState('');
  const [editBuildingId, setEditBuildingId] = useState<number | null>(null);
  const [editBuildingName, setEditBuildingName] = useState('');

  useEffect(() => {
    loadBuildings();
  }, [facultyId]);

  const loadBuildings = async () => {
    try {
      const response = await getBuildings(parseInt(facultyId!));
      setBuildings(response.data);
    } catch (error) {
      console.error('Failed to load buildings:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await createBuilding({ name: newBuilding, facultyId: parseInt(facultyId!) });
      setNewBuilding('');
      loadBuildings();
    } catch (error) {
      console.error('Failed to create building:', error);
    }
  };

  const handleUpdate = async () => {
    if (editBuildingId !== null) {
      try {
        await updateBuilding(editBuildingId, { id: editBuildingId, name: editBuildingName, facultyId: parseInt(facultyId!) });
        setEditBuildingId(null);
        setEditBuildingName('');
        loadBuildings();
      } catch (error) {
        console.error('Failed to update building:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBuilding(id);
      loadBuildings();
    } catch (error) {
      console.error('Failed to delete building:', error);
    }
  };

  return (
    <div>
      <h2>Buildings</h2>
      <ul>
        {buildings.map(building => (
          <li key={building.id}>
            {building.name}
            {role === 'Admin' && (
              <>
                <button onClick={() => { setEditBuildingId(building.id); setEditBuildingName(building.name); }}>Edit</button>
                <button onClick={() => handleDelete(building.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      {role === 'Admin' && (
        <div>
          <h3>Create Building</h3>
          <input
            type="text"
            value={newBuilding}
            onChange={(e) => setNewBuilding(e.target.value)}
            placeholder="Building Name"
          />
          <button onClick={handleCreate}>Create</button>
          {editBuildingId !== null && (
            <div>
              <h3>Edit Building</h3>
              <input
                type="text"
                value={editBuildingName}
                onChange={(e) => setEditBuildingName(e.target.value)}
                placeholder="Building Name"
              />
              <button onClick={handleUpdate}>Update</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BuildingList;
