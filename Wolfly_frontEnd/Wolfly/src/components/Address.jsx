import React, { useState } from "react";

const AddressForm = () => {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  // Function to fetch state & country from pincode
  const fetchLocationDetails = async (pincode) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      if (data[0].Status === "Success") {
        setCity(data[0].PostOffice[0].District);
        setState(data[0].PostOffice[0].State);
        setCountry("India"); // This API is mainly for Indian pincodes
      } else {
        alert("Invalid Pincode! Please enter a valid one.");
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">Shipping Address:</label>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Phone Number */}
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Street Address */}
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Street Address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />

        {/* City */}
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          readOnly // Prevent manual input (Auto-filled)
        />

        {/* State (Auto-Fill) */}
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          readOnly // Auto-filled from API
        />

        {/* Zip Code (Triggers Auto-Fill) */}
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Zip Code"
          value={zip}
          onChange={(e) => {
            setZip(e.target.value);
            if (e.target.value.length === 6) {
              fetchLocationDetails(e.target.value);
            }
          }}
        />

        {/* Country (Auto-Fill) */}
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          readOnly
        />
      </div>
    </div>
  );
};

export default AddressForm;
