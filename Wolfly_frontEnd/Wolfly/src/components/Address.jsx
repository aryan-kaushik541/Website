import React, { useState,useEffect } from "react";
import { useAddAddressMutation } from "../services/userAuthApi";
import { getToken } from "../services/LocalStorageToken";
import { ToastContainer, toast } from "react-toastify";
const AddressForm = () => {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [addAddress, { isLoading, error }] = useAddAddressMutation();
  const { access_token } = getToken();
  const [addressBac] = useAddAddressMutation({access_token});
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
       
        toast.error("Invalid Pincode", { position: "top-right", autoClose: 1000, theme: "colored" });
        setZip('')
     
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const addressData = {
        village_or_town: street,
        city,
        state,
        pincode: Number(zip),
        phone: Number(phone),
        country,
    };

    try {
        const response = await addAddress({ addressData, access_token }).unwrap();
        console.log(response.msg)
        toast.success(response.msg, { position: "top-right", autoClose: 1000, theme: "colored" });
        setStreet("")
        setCity("")
        setState("")
        setZip("")
        setCountry("")
        setPhone("")
    } catch (err) {
      console.log(err)
      toast.error(err.message || "All Field required", { position: "top-right", autoClose: 1000, theme: "colored" });
        // toast.error(err, { position: "top-right", autoClose: 1000, theme: "colored" });
        
    }
};

  return (
    <>
    <ToastContainer position="top-right" autoClose={1000} hideProgressBar theme="dark" />
    <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">Shipping Address:</label>

      <form onSubmit={handleSubmit} className="mb-6">
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
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">{isLoading ? "Saving..." : "Save Address"}</button>
      </div>
      </form>
    </div>
    </>
  );
};

export default AddressForm;
