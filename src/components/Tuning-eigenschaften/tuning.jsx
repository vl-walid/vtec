import React, { useState, useEffect } from "react";
import axios from "axios";

const TuningComponent = () => {
  const [tuningData, setTuningData] = useState([]);
  const [newTuning, setNewTuning] = useState({ name: "" });

  // Fetch tuning data when the component mounts
  useEffect(() => {
    axios
      .get(`https://back-end.topspeed-performance.de/api/vehicle/tuning`)
      .then((response) => {
        setTuningData(response.data);
      })
      .catch((error) => console.error("Error fetching tuning data:", error));
  }, []);

  // Handle input change for new tuning
  const handleTuningChange = (e) => {
    const { name, value } = e.target;
    setNewTuning((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit new tuning
  const handleTuningSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://back-end.topspeed-performance.de/api/vehicle/tuning`, newTuning);
      setTuningData([...tuningData, newTuning]); // Add to the local state
      setNewTuning({ name: "" }); // Reset form
      alert("Tuning added successfully!");
    } catch (error) {
      console.error("Error adding tuning:", error);
      alert("There was an error adding the tuning.");
    }
  };

  return (
    <div className="container mt-4">
      <h4>Tuning Einstellungen</h4>

      {/* Add New Tuning */}
      <form onSubmit={handleTuningSubmit} className="mb-4">
        <h5>Neues Tuning Hinzuf&uuml;gen</h5>
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={newTuning.name}
            onChange={handleTuningChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Tuning Hinzuf&uuml;gen
        </button>
      </form>

      {/* Tuning Data Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {tuningData.map((tuning) => (
            <tr key={tuning.id}>
              <td>{tuning.id}</td>
              <td>{tuning.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TuningComponent;
