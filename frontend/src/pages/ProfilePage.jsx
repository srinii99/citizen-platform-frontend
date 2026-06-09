import {
  useEffect,
  useState
} from "react";

import api from "../api/api";

function ProfilePage() {

  const [profile, setProfile] =
    useState({

      name: "",
      gender: "",
      age: "",
      income: "",
      state: "",
      district: "",
      city: "",
      residence_area: "",
      caste_category: "",
      pwd_status: false,
      pwd_percentage: "",
      minority_status: false,
      is_student: false,
      employment_status: "",
      occupation_category: "",
      bpl_status: false,
      distress_status: false
    });

  // ✅ Fetch profile
  const fetchProfile = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.get(
          "/profile",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setProfile({

        ...profile,

        ...response.data
      });

    } catch (err) {

      console.log(err);
    }
  };

  // ✅ Handle change
  const handleChange = (e) => {

    setProfile({

      ...profile,

      [e.target.name]:
        e.target.value
    });
  };

  // ✅ Save profile
  const saveProfile = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await api.post(
        "/profile",
        profile,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert(
        "Profile updated"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Error updating profile"
      );
    }
  };

  useEffect(() => {

    fetchProfile();

  }, []);

  return (

    <div>

      <h1>My Profile</h1>

      <br />

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={profile.name || ""}
        onChange={handleChange}
      />

      <br /><br />

      <select
        name="gender"
        value={profile.gender || ""}
        onChange={handleChange}
      >

        <option value="">
          Select Gender
        </option>

        <option value="MALE">
          Male
        </option>

        <option value="FEMALE">
          Female
        </option>

        <option value="OTHER">
          Other
        </option>

      </select>

      <br /><br />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={profile.age || ""}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="number"
        name="income"
        placeholder="Income"
        value={profile.income || ""}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="state"
        placeholder="State"
        value={profile.state || ""}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={saveProfile}>
        Save Profile
      </button>

    </div>
  );
}

export default ProfilePage;