import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  getProfile,
  updateProfile,
} from "../api/userApi";


const CompleteProfilePage =
  () => {

    const navigate =
      useNavigate();

 
    const [formData,
      setFormData] =
      useState({

        name: "",

        age: "",

        gender: "MALE",

        income: "",

        state: "",

        district: "",

        caste: "",

        occupation: "",

        is_disabled: false,

        is_student: false,

        is_farmer: false,

        marital_status:
          "SINGLE",
      });


    const loadProfile =
      async () => {

        try {

          const response =
            await getProfile();

          const user =
            response.data;

          if (!user) return;

          setFormData({

            name:
              user.name || "",

            age:
              user.age || "",

            gender:
              user.gender || "MALE",

            income:
              user.income || "",

            state:
              user.state || "",

            district:
              user.district || "",

            caste:
              user.caste || "",

            occupation:
              user.occupation || "",

            is_disabled:
              user.is_disabled || false,

            is_student:
              user.is_student || false,

            is_farmer:
              user.is_farmer || false,

            marital_status:
              user.marital_status ||
              "SINGLE",
          });

        } catch (err) {

          console.log(err);
        }
      };


    useEffect(() => {

      loadProfile();

    }, []);
    


    const handleChange =
      (e) => {

        const {
          name,
          value,
          type,
          checked,
        } = e.target;

        setFormData({

          ...formData,

          [name]:

            type === "checkbox"
              ? checked
              : value,
        });
      };


    const handleSubmit =
      async (e) => {

        e.preventDefault();

        try {

          await updateProfile(
            formData
          );

          console.log("FORM DATA:", formData);

          const response = await updateProfile(formData);

          console.log("UPDATE RESPONSE:", response);

          toast.success(
            "Profile completed"
          );

          navigate(
            "/dashboard"
          );

        } catch (err) {

          console.error(err);

          toast.error(
            "Failed to save profile"
          );
        }
      };


    return (

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow mt-10">

        <h1 className="text-3xl font-bold mb-6">

          Complete Your Profile

        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >

          <input
            name="name"
            value={formData.name}
            placeholder="Full Name"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="age"
            value={formData.age}
            type="number"
            placeholder="Age"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="gender"
                 value={formData.gender}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >

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

          <input
            name="income"
                 value={formData.income}
            type="number"
             value={formData.income}
            placeholder="Annual Income"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="state"
                 value={formData.state}
            placeholder="State"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="district"
                 value={formData.district}
            placeholder="District"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="caste"
                 value={formData.caste}
            placeholder="Caste"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="occupation"
                 value={formData.occupation}
            placeholder="Occupation"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="marital_status"
                 value={formData.marital_status}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >

            <option value="SINGLE">
              Single
            </option>

            <option value="MARRIED">
              Married
            </option>

            <option value="WIDOW">
              Widow
            </option>

          </select>


          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              name="is_student"
              checked={formData.is_student}
              onChange={handleChange}
            />

            Student

          </label>


          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              name="is_farmer"
              checked={formData.is_farmer}
              onChange={handleChange}
            />

            Farmer

          </label>


          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              name="is_disabled"
              checked={formData.is_disabled}
              onChange={handleChange}
            />

            Disabled

          </label>


          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-xl col-span-2"
          >

            Save Profile

          </button>

        </form>

      </div>
    );
  };

export default CompleteProfilePage;