import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const CarTuning = ({ car_id }) => {
  const [tunings, setTunings] = useState([]);
  const [selectedTunings, setSelectedTunings] = useState([]);
  const [existingTunings, setExistingTunings] = useState([]);
  const [formData, setFormData] = useState({
    vehicle_id: car_id || "",
    tunings: [],
  });

  const router = useRouter();

  // Fetch all tunings
  useEffect(() => {
    const fetchTunings = async () => {
      try {
        const response = await axios.get(
          "https://topspeed-performance.de/api/vehicle/tuning"
        );
        setTunings(response.data);
      } catch (error) {
        console.error("Error fetching tunings:", error);
      }
    };

    fetchTunings();
  }, []);

  // Fetch existing vehicle tunings by vehicle_id
  useEffect(() => {
    if (car_id) {
      const fetchExistingTunings = async () => {
        try {
          const response = await axios.get(
            "https://topspeed-performance.de/api/vehicle/tuning-by-id",
            { params: { vehicle_id: car_id } }
          );
          if (response.data) setExistingTunings(response.data);
        } catch (error) {
          console.error("Error fetching existing tunings:", error);
        }
      };

      fetchExistingTunings();
    }
  }, [car_id]);

  // Handle multiple tuning selection
  const handleTuningSelect = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    const tuning = tunings.find((t) => t.id === selectedId);
    if (tuning && !selectedTunings.some((t) => t.id === selectedId)) {
      setSelectedTunings((prev) => [...prev, { ...tuning, price: 0 }]);
    }
  };

  // Handle individual tuning input changes
  const handleTuningInputChange = (index, field, value) => {
    setSelectedTunings((prev) =>
      prev.map((tuning, i) =>
        i === index ? { ...tuning, [field]: value } : tuning
      )
    );
  };

  // Remove a selected tuning
  const removeTuning = (index) => {
    setSelectedTunings((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      vehicle_id: car_id,
      tunings: selectedTunings.map((tuning) => ({
        tuning_id: tuning.id,
        difference_power: tuning.difference_power || 0,
        difference_torque: tuning.difference_torque || 0,
        max_power: tuning.max_power || 0,
        max_torque: tuning.max_torque || 0,
        power_chart: tuning.power_chart || "",
        torque_chart: tuning.torque_chart || "",
        tuning_stage: tuning.name || "",
        price: tuning.price || 0, // Include price here
      })),
    };

    try {
      const response = await axios.post(
        "https://topspeed-performance.de/api/vehicle/tuning/add",
        submissionData
      );
      console.log("databedor", submissionData )
      console.log("Tuning added successfully:", response.data);
      alert(`Tuning added successfully: ${response.data.message}`);
    } catch (error) {
      console.error("Error adding tuning:", error);
    }
  };

  // Navigate to tuning-eigenschaften page
  const navigateToEigenschaften = (tuningId) => {
    router.push({
      pathname: "/admin/car/tuning-eigenschaften/tuning-eigenschaften",
      query: { car_id, tuning_id: tuningId },
    });
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <h3 className="mb-4">Car Tuning Form</h3>

        {/* Existing Vehicle Tunings */}
        {existingTunings.length > 0 && (
          <div className="alert alert-info">
            <h4 className="font-weight-bold">Existing Vehicle Tunings</h4>
            <div className="row">
              {existingTunings.map((tuning) => (
                <div key={tuning.id} className="col-12 col-md-6 mb-4">
                  <div className="border rounded shadow-sm p-3 bg-light">
                    <p>
                      <strong>Tuning Stage:</strong> {tuning.tuning_stage}
                    </p>
                    <p>
                      <strong>Difference Power:</strong>{" "}
                      {tuning.difference_power} HP
                    </p>
                    <p>
                      <strong>Difference Torque:</strong>{" "}
                      {tuning.difference_torque} Nm
                    </p>
                    <p>
                      <strong>Power chart:</strong> {tuning.power_chart}
                    </p>
                    <p>
                      <strong>Torque chart:</strong> {tuning.torque_chart}
                    </p>
                    <p>
                      <strong>Price:</strong> ${tuning.price}
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm mt-2"
                      onClick={() => navigateToEigenschaften(tuning.id)}
                    >
                      View Eigenschaften
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vehicle ID */}
        <div className="form-group row">
          <label htmlFor="vehicle_id" className="col-sm-2 col-form-label">
            Vehicle ID:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              id="vehicle_id"
              value={car_id}
              className="form-control"
              disabled
            />
          </div>
        </div>

        {/* Tuning Selection */}
        <div className="form-group row">
          <label htmlFor="tuning_id" className="col-sm-2 col-form-label">
            Choose Tuning:
          </label>
          <div className="col-sm-10">
            <select
              id="tuning_id"
              className="form-control"
              onChange={handleTuningSelect}
            >
              <option value="">Select a Tuning</option>
              {tunings.map((tuning) => (
                <option key={tuning.id} value={tuning.id}>
                  {tuning.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Tunings */}
        {selectedTunings.map((tuning, index) => (
          <div key={tuning.id} className="border rounded p-3 mb-4 shadow-sm">
            <h4 className="text-primary">Tuning: {tuning.name}</h4>
            <button
              type="button"
              className="btn btn-danger btn-sm float-right"
              onClick={() => removeTuning(index)}
            >
              Remove
            </button>
            <div className="form-group mt-3">
              <label>Difference Power (HP):</label>
              <input
                type="number"
                value={tuning.difference_power || ""}
                className="form-control"
                onChange={(e) =>
                  handleTuningInputChange(index, "difference_power", e.target.value)
                }
              />
            </div>
            <div className="form-group mt-3">
              <label>Difference Torque (Nm):</label>
              <input
                type="number"
                value={tuning.difference_torque || ""}
                className="form-control"
                onChange={(e) =>
                  handleTuningInputChange(index, "difference_torque", e.target.value)
                }
              />
            </div>
            <div className="form-group mt-3">
              <label>Max Power (HP):</label>
              <input
                type="number"
                value={tuning.max_power || ""}
                className="form-control"
                onChange={(e) =>
                  handleTuningInputChange(index, "max_power", e.target.value)
                }
              />
            </div>
            <div className="form-group mt-3">
              <label>Max Torque (Nm):</label>
              <input
                type="number"
                value={tuning.max_torque || ""}
                className="form-control"
                onChange={(e) =>
                  handleTuningInputChange(index, "max_torque", e.target.value)
                }
              />
            </div>
            <div className="form-group mt-3">
              <label>Power Chart Data:</label>
              <input
                type="text"
                value={tuning.power_chart || ""}
                className="form-control"
                onChange={(e) =>
                  handleTuningInputChange(index, "power_chart", e.target.value)
                }
              />
            </div>
            <div className="form-group mt-3">
              <label>Torque Chart Data:</label>
              <input
                type="text"
                value={tuning.torque_chart || ""}
                className="form-control"
                onChange={(e) =>
                  handleTuningInputChange(index, "torque_chart", e.target.value)
                }
              />
            </div>
            <div className="form-group mt-3">
              <label>Price ($):</label>
              <input
                type="number"
                value={tuning.price || ""}
                className="form-control"
                onChange={(e) =>
                  handleTuningInputChange(index, "price", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" className="btn btn-success btn-block">
            Submit Tunings
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarTuning;
