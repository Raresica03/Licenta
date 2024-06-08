export interface University {
    id: number;
    name: string;
    faculties?: Faculty[]; // Optional: Include if you want nested faculties
  }

  export interface Faculty {
    id: number;
    name: string;
    universityId: number;
    buildings?: Building[]; // Optional: Include if you want nested buildings
  }
  
  export interface Building {
    id: number;
    name: string;
    facultyId: number;
    rooms?: Room[]; // Optional: Include if you want nested rooms
  }

  export interface Room {
    id: number;
    name: string;
    buildingId: number;
  }

  export interface User {
    id: string;
    email: string;
    username: string;
    // Add any other properties you expect the user object to have
    // For example:
    roles: string[];
  }
  