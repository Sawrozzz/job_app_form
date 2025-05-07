import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User, Mail, Phone, MessageSquare, Pencil } from "lucide-react";

// Validation Schema with yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  subject: yup.string().required("Subject is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone Number must be 10 digits")
    .required("Phone is required"),
  message: yup.string().required("Message is required"),
});

//resuable component for all input fieldss
const FormInput = ({
  icon: Icon,
  register,
  name,
  placeholder,
  errors,
  type = "text",
}) => (
  <div className="relative">
    <Icon className="absolute left-3 top-3.5 text-gray-400" size={18} />
    <input
      type={type}
      placeholder={placeholder}
      {...register(name)}
      className={`pl-10 pr-4 py-2 w-full rounded-md bg-gray-200 text-gray-900 focus:outline-none ${
        errors[name] && "border border-red-500"
      }`}
    />
    {errors[name] && (
      <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
    )}
  </div>
);

// texyt area componen
const FormTextarea = ({ icon: Icon, register, name, placeholder, errors }) => (
  <div className="md:col-span-2 relative">
    <Icon className="absolute left-3 top-3.5 text-gray-400" size={18} />
    <textarea
      placeholder={placeholder}
      rows={5}
      {...register(name)}
      className={`pl-10 pr-4 py-2 w-full rounded-md bg-gray-200 text-gray-900 focus:outline-none resize-none ${
        errors[name] && "border border-red-500"
      }`}
    ></textarea>
    {errors[name] && (
      <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
    )}
  </div>
);

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch("https://formspree.io/f/mvgarpje", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        alert("Message sent successfully!");
        reset();
      } else {
        alert("Failed to send message. Try again later.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-white">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <p className="text-green-600 font-semibold text-lg">Contact Now</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Get in touch with us
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <FormInput
            icon={User}
            register={register}
            name="name"
            placeholder="Enter Name"
            errors={errors}
          />
          <FormInput
            icon={Mail}
            register={register}
            name="email"
            placeholder="Enter Email"
            type="email"
            errors={errors}
          />
          <FormInput
            icon={Pencil}
            register={register}
            name="subject"
            placeholder="Enter Subject"
            errors={errors}
          />
          <FormInput
            icon={Phone}
            register={register}
            name="phone"
            placeholder="Enter Phone"
            errors={errors}
          />
          <FormTextarea
            icon={MessageSquare}
            register={register}
            name="message"
            placeholder="Enter Message"
            errors={errors}
          />
          <div className="md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
            <button
              type="submit"
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition"
            >
             {isSubmitting ?"Sending...":"Send Message"}
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
