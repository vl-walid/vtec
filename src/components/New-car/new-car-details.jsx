import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link';



const NewCarForm = ({ engineId, vehicleData }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    standard_power: "",
    standard_torque: "",
    fuel: "",
    ecu: "",
    rpm: "0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000", // Default values
    oem_power_chart: "",
    oem_torque_chart: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Populate the form with the provided vehicle data
  useEffect(() => {
    if (vehicleData) {
      setFormData({
        full_name: vehicleData.full_name || "",
        standard_power: vehicleData.standard_power || "",
        standard_torque: vehicleData.standard_torque || "",
        fuel: vehicleData.fuel || "",
        ecu: vehicleData.ecu || "",
        rpm: vehicleData.rpm || "",
        oem_power_chart: vehicleData.oem_power_chart || "",
        oem_torque_chart: vehicleData.oem_torque_chart || "",
      });
    }
  }, [vehicleData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Ensure `rpm` is sent as a valid string (comma-separated if needed)
    const formattedFormData = {
      ...formData,
      engine_id: engineId,
      rpm: Array.isArray(formData.rpm) ? formData.rpm.join(", ") : formData.rpm, // Ensure correct format
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/vehicle/create", formattedFormData);
      setIsSubmitted(true);
      alert("Vehicle details added successfully!");
    } catch (error) {
      console.error("Error adding vehicle:", error);
      alert("There was an error adding the vehicle. Please check your input.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="full_name">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="standard_power">Standard Power</label>
                <input
                  type="number"
                  className="form-control"
                  id="standard_power"
                  name="standard_power"
                  value={formData.standard_power}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="standard_torque">Standard Torque</label>
                <input
                  type="number"
                  className="form-control"
                  id="standard_torque"
                  name="standard_torque"
                  value={formData.standard_torque}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="fuel">Fuel</label>
                <input
                  type="text"
                  className="form-control"
                  id="fuel"
                  name="fuel"
                  value={formData.fuel}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="ecu">ECU</label>
                <input
                  type="text"
                  className="form-control"
                  id="ecu"
                  name="ecu"
                  value={formData.ecu}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="rpm">RPM</label>
                <input
                  type="text"
                  className="form-control"
                  id="rpm"
                  name="rpm"
                  value={formData.rpm}
                  onChange={handleInputChange}
                  placeholder="Enter comma-separated values (e.g., 1000, 2000, 3000)"
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="oem_power_chart">OEM Power Chart</label>
                <input
                  type="text"
                  className="form-control"
                  id="oem_power_chart"
                  name="oem_power_chart"
                  placeholder="Diagramm mit 15 Zahlen, getrennt durch ','"
                  value={formData.oem_power_chart}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="oem_torque_chart">OEM Torque Chart</label>
                <input
                  type="text"
                  className="form-control"
                  id="oem_torque_chart"
                  name="oem_torque_chart"
                  placeholder="Diagramm mit 15 Zahlen, getrennt durch ','"
                  value={formData.oem_torque_chart}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Vehicle"}
            </button>
            <a className="btn btn-secondary">
            <Link legacyBehavior href="/">Cancel</Link>
            </a>
          </div>
        </form>
      ) : (
        <div className="alert alert-success mt-4">
          Vehicle details added successfully!
        </div>
      )}
    </div>
  );
};

export default NewCarForm;
