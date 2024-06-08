import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRooms, createRoom, updateRoom, deleteRoom } from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';

const RoomList: React.FC = () => {
  const { buildingId } = useParams<{ buildingId: string }>();
  const { user, role } = useAuth();
  const [rooms, setRooms] = useState<any[]>([]);
  const [newRoom, setNewRoom] = useState('');
  const [editRoomId, setEditRoomId] = useState<number | null>(null);
  const [editRoomName, setEditRoomName] = useState('');

  useEffect(() => {
    loadRooms();
  }, [buildingId]);

  const loadRooms = async () => {
    try {
      const response = await getRooms(parseInt(buildingId!));
      setRooms(response.data);
    } catch (error) {
      console.error('Failed to load rooms:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await createRoom({ name: newRoom, buildingId: parseInt(buildingId!) });
      setNewRoom('');
      loadRooms();
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  const handleUpdate = async () => {
    if (editRoomId !== null) {
      try {
        await updateRoom(editRoomId, { id: editRoomId, name: editRoomName, buildingId: parseInt(buildingId!) });
        setEditRoomId(null);
        setEditRoomName('');
        loadRooms();
      } catch (error) {
        console.error('Failed to update room:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteRoom(id);
      loadRooms();
    } catch (error) {
      console.error('Failed to delete room:', error);
    }
  };

  return (
    <div>
      <h2>Rooms</h2>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            {room.name}
            {role === 'Admin' && (
              <>
                <button onClick={() => { setEditRoomId(room.id); setEditRoomName(room.name); }}>Edit</button>
                <button onClick={() => handleDelete(room.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      {role === 'Admin' && (
        <div>
          <h3>Create Room</h3>
          <input
            type="text"
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
            placeholder="Room Name"
          />
          <button onClick={handleCreate}>Create</button>
          {editRoomId !== null && (
            <div>
              <h3>Edit Room</h3>
              <input
                type="text"
                value={editRoomName}
                onChange={(e) => setEditRoomName(e.target.value)}
                placeholder="Room Name"
              />
              <button onClick={handleUpdate}>Update</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoomList;
