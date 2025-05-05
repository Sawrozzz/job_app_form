import React from "react";
import { UploadCloud } from "lucide-react";

import form_image from "../assets/form_image.png";

export default function Form() {
  const input =
    "border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-6 bg-gray-50">
      <div className="w-full lg:w-1/2 hidden md:flex justify-center mb-8 lg:mb-0">
        <img
          src={form_image}
          alt="Nurse and patient"
          className="max-w-xs lg:max-w-md"
        />
      </div>

      {/* Right Form */}
      <form className="w-full lg:w-1/2 bg-white p-8 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          Job Application Form
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <input type="text" placeholder="FirstName" className={input} />
          <input type="text" placeholder="LastName" className={input} />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input type="email" placeholder="Email" className={input} />
          <input type="tel" placeholder="Phone" className={input} />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <select className={input}>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <select className={input}>
            <option value="">Age</option>
            {Array.from({ length: 83 }, (_, i) => 18 + i).map((age) => (
              <option key={age}>{age}</option>
            ))}
          </select>
        </div>

        <div>
          <p className="font-medium text-start">
            What is your current employment status?
          </p>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {["Employee", "Self-employed", "Unemployed", "Student"].map(
              (status) => (
                <label
                  key={status}
                  className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="status"
                    className="accent-blue-600"
                  />
                  {status}
                </label>
              )
            )}
          </div>
        </div>

        <div className="relative cursor-pointer">
          <input type="date" placeholder="MM/DD/YYYY" className={`${input}`} />
        </div>

        <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
          <input type="file" className="hidden" id="resume-upload" />
          <label
            htmlFor="resume-upload"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <UploadCloud className="text-gray-500" size={28} />
            <span className="text-sm text-gray-600">
              Choose file or drag here
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 cursor-pointer rounded-md hover:bg-gray-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
