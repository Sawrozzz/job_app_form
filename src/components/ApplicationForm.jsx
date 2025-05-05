import React, { useState } from "react";

import form_image from "../assets/form_image.png";

import { Upload } from "lucide-react";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    location: "",
    gender: "",
    age: "",
    email: "",
    about: "",
  });

  const handleChangeFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitFormData = (e) => {
    e.preventDefault();
    console.log("Data's are", formData);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white p-4 md:p-10">
      <div className="w-full md:w-1/2 hidden md:flex justify-center mb-8 md:mb-0">
        <img
          src={form_image}
          alt="Caregiver and Patient"
          className="w-[80%] max-w-md h-auto"
        />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 max-w-lg bg-white">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Application Form
        </h2>
        <form className="space-y-4" onSubmit={handleSubmitFormData}>
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChangeFormData}
              placeholder="FirstName"
              className="w-1/2 p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChangeFormData}
              placeholder="LastName"
              className="w-1/2 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChangeFormData}
            placeholder="Phone Number"
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <select
            name="location"
            value={formData.location}
            onChange={handleChangeFormData}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Location</option>
            <option value="New York">New York</option>
            <option value="California">California</option>
          </select>

          <div className="flex gap-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChangeFormData}
              className="w-1/2 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChangeFormData}
              placeholder="Age"
              className="w-1/2 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChangeFormData}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <textarea
            name="about"
            value={formData.about}
            onChange={handleChangeFormData}
            placeholder="About You...."
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>

          <div className="flex items-center gap-4 justify-between ">
            <label className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-md cursor-pointer hover:bg-blue-200 transition">
              <input type="file" className="hidden" />
              Upload CV
              <Upload />
            </label>

            <button
              type="submit"
              className="bg-blue-200 cursor-pointer px-6 py-2 rounded-md hover:bg-blue-300 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
