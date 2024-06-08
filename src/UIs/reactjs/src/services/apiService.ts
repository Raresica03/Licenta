import axios from 'axios';

const UNIVERSITY_URL = 'https://localhost:5001/api/university';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const getUniversities = () => {
  return axios.get(UNIVERSITY_URL, getAuthHeader());
};

export const createUniversity = (university: any) => {
  return axios.post(UNIVERSITY_URL, university, getAuthHeader());
};

export const updateUniversity = (id: number, university: any) => {
  return axios.put(`${UNIVERSITY_URL}/${id}`, university, getAuthHeader());
};

export const deleteUniversity = (id: number) => {
  return axios.delete(`${UNIVERSITY_URL}/${id}`, getAuthHeader());
};



const FACULTY_URL = 'https://localhost:5001/api/faculty';

export const getFaculties = (universityId: number) => {
  return axios.get(`${FACULTY_URL}/University/${universityId}`, getAuthHeader());
};

export const createFaculty = (faculty: any) => {
  return axios.post(FACULTY_URL, faculty, getAuthHeader());
};

export const updateFaculty = (id: number, faculty: any) => {
  return axios.put(`${FACULTY_URL}/${id}`, faculty, getAuthHeader());
};

export const deleteFaculty = (id: number) => {
  return axios.delete(`${FACULTY_URL}/${id}`, getAuthHeader());
};




const BUILDING_URL = 'https://localhost:5001/api/building';

export const getBuildings = (facultyId: number) => {
  return axios.get(`${BUILDING_URL}/Faculty/${facultyId}`, getAuthHeader());
};

export const createBuilding = (building: any) => {
  return axios.post(BUILDING_URL, building, getAuthHeader());
};

export const updateBuilding = (id: number, building: any) => {
  return axios.put(`${BUILDING_URL}/${id}`, building, getAuthHeader());
};

export const deleteBuilding = (id: number) => {
  return axios.delete(`${BUILDING_URL}/${id}`, getAuthHeader());
};




const ROOM_API = 'https://localhost:5001/api/room';

export const getRooms = (buildingId: number) => {
  return axios.get(`${ROOM_API}/Building/${buildingId}`, getAuthHeader());
};

export const createRoom = (room: any) => {
  return axios.post(ROOM_API, room, getAuthHeader());
};

export const updateRoom = (id: number, room: any) => {
  return axios.put(`${ROOM_API}/${id}`, room, getAuthHeader());
};

export const deleteRoom = (id: number) => {
  return axios.delete(`${ROOM_API}/${id}`, getAuthHeader());
};
