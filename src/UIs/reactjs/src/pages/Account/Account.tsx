import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateProfile } from "../../services/authService";

const Account: React.FC = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile(user.id);
        if (response.data.firstName && response.data.lastName) {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setPhoneNumber(response.data.phoneNumber);
          setDateOfBirth(response.data.dateOfBirth);
          setProfileCompleted(true);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, [user, navigate]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateProfile({
        userId: user?.id,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
      });
      setMessage(response.data.message);
      setProfileCompleted(true);
      navigate("/user-dashboard");
    } catch (error) {
      setMessage("Profile update failed!");
    }
  };

  if(!user){
    return null;
  }

  if (profileCompleted) {
    return (
      <div>
        <h2>Profile</h2>
        <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
        <p>Phone Number: {phoneNumber}</p>
        <p>Date of Birth: {dateOfBirth}</p>
        <button onClick={() => setProfileCompleted(false)}>Edit Profile</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleProfileUpdate}>
      <h2>Complete Profile</h2>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </div>
      <button type="submit">Update Profile</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Account;
