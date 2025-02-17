import React, { useState } from "react";
import axios from "axios";

const SearchCar = () => {
  const [search, setSearch] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://topseed-performance.de/api/vehicles/search",
        {
          params: { full_name: search },
        }
      );
      setVehicles(response.data);
    } catch (error) {
      setError("Something went wrong while fetching the vehicles.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActiveStatus = async (vehicleId, currentStatus) => {
    try {
      const newStatus = currentStatus ? 0 : 1;  // Toggle the status
      await axios.patch(
        `https://topseed-performance.de/api/vehicles/${vehicleId}/toggle-active`,  // Path with vehicle ID
        {
          vehicle_id: vehicleId,  // Send vehicle_id
          is_active: newStatus,    // Send new is_active status
        }
      );
  
      // Update the vehicle list with the new status
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.id === vehicleId
            ? { ...vehicle, is_active: newStatus }
            : vehicle
        )
      );
    } catch (error) {
      console.error("Error toggling vehicle status:", error);
    }
  };
  

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4" style={{ color: "red" }}>
        Fahrzeug Suche
      </h1>
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by vehicle name"
            value={search}
            onChange={handleSearchChange}
            style={{ border: "2px solid red", color: "black" }}
          />
          <button
            className="btn btn-danger"
            type="submit"
            style={{ backgroundColor: "red", borderColor: "black" }}
          >
            Suchen
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center">
          <div
            className="spinner-border text-danger"
            role="status"
            aria-hidden="true"
          ></div>
          <p>Loading...</p>
        </div>
      )}
      {error && <p className="text-danger text-center">{error}</p>}

      {vehicles.length > 0 && (
        <div className="row">
          {vehicles.map((vehicle) => (
            <div className="col-md-6 mb-4" key={vehicle.id}>
              <div
                className="card"
                style={{
                  border: "2px solid grey",
                  backgroundColor: "black",
                  color: "white",
                  position: "relative", // To position the button inside the card
                }}
              >
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "red" }}>
                    {vehicle.full_name}
                  </h5>
                  <p className="card-text">
                    <strong>ID:</strong> {vehicle.id}
                  </p>
                  <p className="card-text">
                    <strong>Engine ID:</strong> {vehicle.engine_id}
                  </p>
                  <p className="card-text">
                    <strong>Standard Power:</strong> {vehicle.standard_power}
                  </p>
                  <p className="card-text">
                    <strong>Standard Torque:</strong> {vehicle.standard_torque}
                  </p>
                  <p className="card-text">
                    <strong>Fuel:</strong> {vehicle.fuel}
                  </p>
                  <p className="card-text">
                    <strong>ECU:</strong> {vehicle.ecu}
                  </p>
                  <p className="card-text">
                    <strong>RPM:</strong> {vehicle.rpm}
                  </p>
                  <p className="card-text">
                    <strong>OEM Power Chart:</strong>{" "}
                    {vehicle.oem_power_chart}
                  </p>
                  <p className="card-text">
                    <strong>OEM Torque Chart:</strong>{" "}
                    {vehicle.oem_torque_chart}
                  </p>
                  <p className="card-text">
                    <strong>Created At:</strong> {vehicle.created_at}
                  </p>
                  <p className="card-text">
                    <strong>Updated At:</strong> {vehicle.updated_at}
                  </p>
                  <p className="card-text">
                    <strong>Active:</strong>{" "}
                    {vehicle.is_active ? "Yes" : "No"}
                  </p>

                  {/* Toggle Button */}
                  <button
                    className={`btn btn-sm ${
                      vehicle.is_active ? "btn-danger" : "btn-success"
                    }`}
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                    }}
                    onClick={() =>
                      handleToggleActiveStatus(vehicle.id, vehicle.is_active)
                    }
                  >
                    {vehicle.is_active ? "Deaktivieren" : "Aktivieren"}
                  </button>

                  <div className="d-flex justify-content-between mt-3">
                    <a
                      href={`/chiptuning/${vehicle.id}`}
                      className="btn btn-outline-danger btn-sm"
                      style={{ borderColor: "red", color: "red" }}
                    >
                      Details ansehen
                    </a>
                    <a
                      href={`/admin/car/car-tuning/${vehicle.id}`}
                      className="btn btn-danger btn-sm"
                      style={{ backgroundColor: "red", borderColor: "black" }}
                    >
                      Tuning hinzufügen
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchCar;
