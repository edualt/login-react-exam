import React, { useEffect, useState } from "react";
import { getProfile } from "../../api/services/auth";
import "./profile.css";
import { Grid, Button } from "@mui/material";
import useAuth from "../../hooks/useAuth";

export const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getProfile();
      if (response.status === 200) {
        setUserData(response.data);
      } else {
        console.error("Failed to fetch user profile");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      container
      className="gridContainer"
      alignItems="center"
      justifyContent="center"
      width={1}
    >
      <div className="profileContainer">
        <div className="profileHeader">
          <img
            src={userData.image}
            alt={`${userData.firstName} ${userData.lastName}`}
            className="profileImage"
          />
          <div className="profileName">
            <h2>{`${userData.firstName} ${userData.lastName}`}</h2>
            <p className="profileRole">{userData.company.title}</p>
            <p className="profileEmail">{userData.email}</p>
            <p className="profileGender">{userData.gender.toUpperCase()}</p>
          </div>
        </div>
        <div className="profileDetails">
          <div className="profileItem">
            <span className="profileLabel">Edad</span>
            <span className="profileValue">{userData.age} Años</span>
          </div>
          <div className="profileItem">
            <span className="profileLabel">Peso</span>
            <span className="profileValue">{userData.weight} KGs</span>
          </div>
          <div className="profileItem">
            <span className="profileLabel">Altura</span>
            <span className="profileValue">{userData.height} cm</span>
          </div>
          <div className="profileItem">
            <span className="profileLabel">Número telefónico</span>
            <span className="profileValue">{userData.phone}</span>
          </div>
          <div className="profileItem">
            <span className="profileLabel">Enfermedades</span>
            <span className="profileValue">Hypertension, Diabetes</span>
          </div>
          <div className="profileItem">
            <span className="profileLabel">Dirección</span>
            <span className="profileValue">
              {userData.address.address},<br />
              {userData.address.city}, {userData.address.state},<br />
              {userData.address.country}, {userData.address.postalCode}
            </span>
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#1B6DA1", margin: "12px 0", width: "80%" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </Grid>
  );
};

export default Profile;
