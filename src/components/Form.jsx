import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { UploadCloud } from "lucide-react";
import form_image from "../assets/form_image.png";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  countryCode:Yup.string().required("Enter country code"),
  gender: Yup.string().required("Gender is required"),
  age: Yup.string().required("Age is required"),
  employee_status: Yup.string().required("Employment status is required"),
  start_date: Yup.string().required("Start date is required"),
  resume: Yup.mixed().required("Resume is required"),
});

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      countryCode: "+1",
    },
  });

  const onSubmit = (data) => {
    const fullPhone = `${data.countryCode} ${data.phone}`
     const finalData = { ...data, phone: fullPhone };
    console.log("Submitted Data:", finalData);
    setTimeout(() => reset(), 2000);
  };

  const input =
    "border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500";

  const selectedResume = watch("resume");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-6 bg-gray-50">
      <div className="w-full lg:w-1/2 hidden md:flex justify-center mb-8 lg:mb-0">
        <img
          src={form_image}
          alt="Nurse and patient"
          className="max-w-xs lg:max-w-md"
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-1/2 bg-white p-8 rounded-xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center">
          Job Application Form
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <input
              {...register("firstName")}
              placeholder="First Name"
              className={input}
            />
            <p className="text-sm text-red-500">{errors.firstName?.message}</p>
          </div>
          <div className="w-full">
            <input
              {...register("lastName")}
              placeholder="Last Name"
              className={input}
            />
            <p className="text-sm text-red-500">{errors.lastName?.message}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <input
              {...register("email")}
              placeholder="Email"
              className={input}
            />
            <p className="text-sm text-red-500">{errors.email?.message}</p>
          </div>
          <div className="w-full">
            <div className="flex gap-2">
              <select
                {...register("countryCode")}
                className="border border-gray-300 rounded-md p-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="+1" >🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+977">🇳🇵 +977</option>
              </select>
              <input
                {...register("phone")}
                placeholder="Phone"
                className="border border-gray-300 rounded-md p-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-sm text-red-500">
              {errors.countryCode?.message}
            </p>
            <p className="text-sm text-red-500">{errors.phone?.message}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <select {...register("gender")} className={input}>
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <p className="text-sm text-red-500">{errors.gender?.message}</p>
          </div>
          <div className="w-full">
            <select {...register("age")} className={input}>
              <option value="">Age</option>
              {Array.from({ length: 83 }, (_, i) => 18 + i).map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
            <p className="text-sm text-red-500">{errors.age?.message}</p>
          </div>
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
                    value={status}
                    {...register("employee_status")}
                    className="accent-blue-600"
                  />
                  {status}
                </label>
              )
            )}
          </div>
          <p className="text-sm text-red-500">
            {errors.employee_status?.message}
          </p>
        </div>

        <div className="relative cursor-pointer flex flex-col gap-1">
          <p className="text-start">Available start date</p>
          <input type="date" {...register("start_date")} className={input} />
          <p className="text-sm text-red-500">{errors.start_date?.message}</p>
        </div>

        <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
          <input
            type="file"
            id="resume-upload"
            onChange={(e) => setValue("resume", e.target.files[0])}
            className="hidden"
          />
          <label
            htmlFor="resume-upload"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <UploadCloud className="text-gray-500" size={28} />
            <span className="text-sm text-gray-600">
              {selectedResume
                ? selectedResume.name
                : "Choose file or drag here"}
            </span>
          </label>
          <p className="text-sm text-red-500">{errors.resume?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 cursor-pointer rounded-md hover:bg-gray-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {isSubmitSuccessful && (
          <p className="text-green-600 text-center font-medium">
            Form submitted successfully!
          </p>
        )}
      </form>
    </div>
  );
}
