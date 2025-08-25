"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
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
}

// Define the shape of the errors object
interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  time?: string;
}

// Define the props for the reusable Input component
interface InputProps {
  label: string;
  type: string;
  name: keyof FormData;
  placeholder?: string;
  error?: string;
}

// Main component for the booking form
const App = () => {
  // Array of available time slots
  const TIMESLOTS = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  // Initial state for the form data
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    brand: "",
    product: "",
    date: "",
    time: "",
    notes: ""
  });

  // State for validation errors
  const [errors, setErrors] = useState<FormErrors>({});

  // Handle input changes with explicit typing for the event
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name as keyof FormData]: value }));
  };

  // Handle time slot selection
  const handleTimeSelect = (time: string) => {
    setFormData(prevData => ({ ...prevData, time }));
    setErrors(prevErrors => ({ ...prevErrors, time: undefined }));
  };

  // Validate the form data
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission with explicit typing for the event
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form data submitted:", JSON.stringify(formData, null, 2));
      // You can add your API call or other logic here
      alert("Form submitted successfully! Check the console for data.");
    } else {
      alert("Please correct the errors in the form.");
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      brand: "",
      product: "",
      date: "",
      time: "",
      notes: ""
    });
    setErrors({});
  };

  // Common input component to reduce repetition and ensure consistent styling
  const Input: React.FC<InputProps> = ({ label, type, name, placeholder, error }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        className={`w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
        required={error ? true : false}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900 p-4 font-sans">
      <div
        className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl max-w-lg w-full transform transition-all duration-500 ease-out animate-slide-up"
        style={{
          animation: 'slide-up 0.6s ease-out forwards',
          opacity: 0,
        }}
      >
        <style>
          {`
            @keyframes slide-up {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
        </style>
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Book a Service
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Please fill out the form below to book your service appointment.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="John Doe"
              error={errors.name}
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="john.doe@example.com"
              error={errors.email}
            />
            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              placeholder="123-456-7890"
              error={errors.phone}
            />
            <Input
              label="Brand"
              type="text"
              name="brand"
              placeholder="e.g., Apple, Samsung"
            />
            <Input
              label="Product"
              type="text"
              name="product"
              placeholder="e.g., MacBook Pro, Galaxy S21"
            />
            <Input
              label="Date"
              type="date"
              name="date"
            />

            {/* Time Slot Selection */}
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
                    className={`
                      px-4 py-2 rounded-lg font-semibold transition-all duration-300
                      ${formData.time === timeSlot
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }
                      border border-gray-300 dark:border-gray-600
                    `}
                  >
                    {timeSlot}
                  </button>
                ))}
              </div>
              {errors.time && <p className="mt-1 text-xs text-red-500">{errors.time}</p>}
            </div>

          </div>

          <div className="mb-4">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-1/2 bg-transparent text-gray-600 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg border border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
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
