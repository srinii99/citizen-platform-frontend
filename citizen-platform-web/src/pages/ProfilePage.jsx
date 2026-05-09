import {
  useEffect,
  useState
} from "react";

import api from "../api/api";

import DashboardLayout from
  "../layouts/DashboardLayout";

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

      const response = await api.get(
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

  // ✅ Handle text/select inputs
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

      alert("Profile updated");

    } catch (err) {

      console.log(err);

      alert("Error updating profile");
    }
  };

  useEffect(() => {

    fetchProfile();

  }, []);

  return (

    <DashboardLayout>

      <h1>My Profile</h1>

      <br />

      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={profile.name || ""}
        onChange={handleChange}
      />

      <br /><br />

      {/* Gender */}
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

      {/* Age */}
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={profile.age || ""}
        onChange={handleChange}
      />

      <br /><br />

      {/* Income */}
      <input
        type="number"
        name="income"
        placeholder="Income"
        value={profile.income || ""}
        onChange={handleChange}
      />

      <br /><br />

      {/* State */}
      <input
        type="text"
        name="state"
        placeholder="State"
        value={profile.state || ""}
        onChange={handleChange}
      />

      <br /><br />

      {/* District */}
      <input
        type="text"
        name="district"
        placeholder="District"
        value={profile.district || ""}
        onChange={handleChange}
      />

      <br /><br />

      {/* City */}
      <input
        type="text"
        name="city"
        placeholder="City"
        value={profile.city || ""}
        onChange={handleChange}
      />

      <br /><br />

      {/* Residence Area */}
      <select
        name="residence_area"
        value={profile.residence_area || ""}
        onChange={handleChange}
      >

        <option value="">
          Residence Area
        </option>

        <option value="URBAN">
          Urban
        </option>

        <option value="RURAL">
          Rural
        </option>

      </select>

      <br /><br />

      {/* Caste Category */}
      <select
        name="caste_category"
        value={profile.caste_category || ""}
        onChange={handleChange}
      >

        <option value="">
          Select Category
        </option>

        <option value="GENERAL">
          General
        </option>

        <option value="OBC">
          OBC
        </option>

        <option value="SC">
          SC
        </option>

        <option value="ST">
          ST
        </option>

        <option value="PVTG">
          PVTG
        </option>

        <option value="DNT">
          DNT
        </option>

      </select>

      <br /><br />

      {/* Employment Status */}
      <select
        name="employment_status"
        value={profile.employment_status || ""}
        onChange={handleChange}
      >

        <option value="">
          Employment Status
        </option>

        <option value="EMPLOYED">
          Employed
        </option>

        <option value="UNEMPLOYED">
          Unemployed
        </option>

        <option value="SELF_EMPLOYED">
          Self Employed
        </option>

      </select>

      <br /><br />

      {/* Occupation */}
      <input
        type="text"
        name="occupation_category"
        placeholder="Occupation"
        value={
          profile.occupation_category || ""
        }
        onChange={handleChange}
      />

      <br /><br />

      {/* PWD */}
      <label>

        <input
          type="checkbox"
          checked={
            profile.pwd_status || false
          }
          onChange={(e) =>
            setProfile({
              ...profile,
              pwd_status:
                e.target.checked
            })
          }
        />

        Person with Disability

      </label>

      <br /><br />

      {
        profile.pwd_status && (

          <>
            <input
              type="number"
              name="pwd_percentage"
              placeholder="PWD Percentage"
              value={
                profile.pwd_percentage || ""
              }
              onChange={handleChange}
            />

            <br /><br />
          </>
        )
      }

      {/* Minority */}
      <label>

        <input
          type="checkbox"
          checked={
            profile.minority_status || false
          }
          onChange={(e) =>
            setProfile({
              ...profile,
              minority_status:
                e.target.checked
            })
          }
        />

        Minority Category

      </label>

      <br /><br />

      {/* Student */}
      <label>

        <input
          type="checkbox"
          checked={
            profile.is_student || false
          }
          onChange={(e) =>
            setProfile({
              ...profile,
              is_student:
                e.target.checked
            })
          }
        />

        Student

      </label>

      <br /><br />

      {/* BPL */}
      <label>

        <input
          type="checkbox"
          checked={
            profile.bpl_status || false
          }
          onChange={(e) =>
            setProfile({
              ...profile,
              bpl_status:
                e.target.checked
            })
          }
        />

        BPL Category

      </label>

      <br /><br />

      {/* Distress */}
      <label>

        <input
          type="checkbox"
          checked={
            profile.distress_status || false
          }
          onChange={(e) =>
            setProfile({
              ...profile,
              distress_status:
                e.target.checked
            })
          }
        />

        Distress / Hardship Condition

      </label>

      <br /><br />

      {/* Save Button */}
      <button onClick={saveProfile}>
        Save Profile
      </button>

    </DashboardLayout>
  );
}

export default ProfilePage;