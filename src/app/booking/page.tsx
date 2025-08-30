"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // ✅ Correct import for App Router

// Define the shape of the form data
interface FormData {
  name: string;
  email: string;
  phone: string;
  brand: string;
  product: string;
  date: string;
  time: string;
  notes: string;
  serviceType: string;
}

// Define the shape of the errors object
interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  time?: string;
  serviceType?: string;
}

// Reusable Input component
interface InputProps {
  label: string;
  type: string;
  name: keyof FormData;
  placeholder?: string;
  error?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
  placeholder,
  error,
  value,
  onChange,
}) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
        } focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
      required={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const App = () => {
  const router = useRouter(); // ✅ Initialize the hook

  const TIMESLOTS = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const [services, setServices] = useState<string[]>([]);
  const [loadingServices, setLoadingServices] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    brand: "",
    product: "",
    date: "",
    time: "",
    notes: "",
    serviceType: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        const res = await fetch("/api/Service/create_service");
        const data = await res.json();
        console.log("Fetched services:", data.data);

        if (data.success && Array.isArray(data.data)) {
          setServices(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch services", err);
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const getUserIdFromCookie = () => {
      const profileCookie = Cookies.get("profile");
      if (profileCookie) {
        try {
          const profileData = JSON.parse(profileCookie);
          if (profileData && profileData.userId) {
            return profileData.userId;
          }
        } catch (error) {
          console.error("Failed to parse profile cookie:", error);
        }
      }
      return "";
    };

    setUserId(getUserIdFromCookie());
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof FormData]: value,
    }));
  };

  const handleTimeSelect = (time: string) => {
    setFormData((prevData) => ({ ...prevData, time }));
    setErrors((prevErrors) => ({ ...prevErrors, time: undefined }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.time) newErrors.time = "A time slot is required.";
    if (!formData.serviceType) newErrors.serviceType = "Service type is required.";
    if (!userId) newErrors.name = "User is not logged in.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitMessage(null);
    setIsSuccess(null);

    if (validate()) {
      setIsSubmitting(true);

      const submissionData = {
        ...formData,
        userId: userId,
      };
      console.log("Submitting booking data:", submissionData);
      try {
        const response = await fetch("/api/bookings/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        });

        if (response.ok) {
          setSubmitMessage("Booking created successfully!");
          setIsSuccess(true);
          handleReset();

          setTimeout(() => {
            router.push("/User_booking");
          }, 1000);
        } else {
          const errorData = await response.json();
          setSubmitMessage(
            errorData.message || "Failed to create booking. Please try again."
          );
          setIsSuccess(false);
        }
      } catch (error) {
        setSubmitMessage(
          "An error occurred. Please check your network connection."
        );
        setIsSuccess(false);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setSubmitMessage("Please correct the errors in the form.");
      setIsSuccess(false);
    }
  };
  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      brand: "",
      product: "",
      date: "",
      time: "",
      notes: "",
      serviceType: "",
    });
    setErrors({});
    setSubmitMessage(null);
    setIsSuccess(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900 p-4 font-sans">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl max-w-lg w-full animate-slide-up">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Book a Service
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Please fill out the form below to book your service appointment.
        </p>

        {submitMessage && (
          <div
            className={`p-3 rounded-lg text-sm text-center mb-4 ${isSuccess
                ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
              }`}
          >
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Inputs (same as before) */}
            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="John Doe"
              error={errors.name}
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="john.doe@example.com"
              error={errors.email}
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              placeholder="123-456-7890"
              error={errors.phone}
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              label="Brand"
              type="text"
              name="brand"
              placeholder="e.g., Apple, Samsung"
              value={formData.brand}
              onChange={handleChange}
            />
            <Input
              label="Product"
              type="text"
              name="product"
              placeholder="e.g., MacBook Pro, Galaxy S21"
              value={formData.product}
              onChange={handleChange}
            />
            <Input
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

            {/* ✅ Service Type Dropdown (dynamic) */}
            <div className="md:col-span-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Service Type
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border ${errors.serviceType
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              >
                <option value="">
                  {loadingServices ? "Loading services..." : "Select a service"}
                </option>
                {services.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.serviceType && (
                <p className="mt-1 text-xs text-red-500">{errors.serviceType}</p>
              )}
            </div>

            {/* Time Slot Selection (unchanged) */}
            <div className="md:col-span-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select a Time
              </label>
              <div className="flex flex-wrap gap-2">
                {TIMESLOTS.map((timeSlot) => (
                  <button
                    key={timeSlot}
                    type="button"
                    onClick={() => handleTimeSelect(timeSlot)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300
                      ${formData.time === timeSlot
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }
                      border border-gray-300 dark:border-gray-600`}
                  >
                    {timeSlot}
                  </button>
                ))}
              </div>
              {errors.time && (
                <p className="mt-1 text-xs text-red-500">{errors.time}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder="Describe the issue or service needed..."
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-1/2 bg-transparent text-gray-600 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg border border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              disabled={isSubmitting}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;