import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const CarEigenschaften = ({ car_id, tuning_id }) => {
  const [characteristics, setCharacteristics] = useState([]);
  const [carCharacteristics, setCarCharacteristics] = useState([]);
  const [vehicleDetails, setVehicleDetails] = useState(null);

  // Fetch all available characteristics
  useEffect(() => {
    const fetchCharacteristics = async () => {
      try {
        const response = await axios.get(`https://topspeed-performance.de/api/characteristics`);
        setCharacteristics(response.data);
      } catch (error) {
        console.error("Error fetching characteristics:", error);
      }
    };

    fetchCharacteristics();
  }, []);

  // Memoized fetch for vehicle and tuning details
  const fetchVehicleAndTuningDetails = useCallback(async () => {
    if (car_id && tuning_id) {
      try {
        const vehicleResponse = await axios.get(
          `https://topspeed-performance.de/api/vehicle/stage-and-name`, 
          { params: { vehicle_id: car_id, tuning_id: tuning_id } }
        );
        setVehicleDetails(vehicleResponse.data);
        console.log(vehicleResponse.data);
      } catch (error) {
        console.error("Error fetching vehicle or tuning details:", error);
      }
    }
  }, [car_id, tuning_id]);

  useEffect(() => {
    fetchVehicleAndTuningDetails();
  }, [fetchVehicleAndTuningDetails]);

  // Memoized fetch for car characteristics
  const fetchCarCharacteristics = useCallback(async () => {
    if (car_id && tuning_id) {
      try {
        const response = await axios.get(
          `https://topspeed-performance.de/api/vehicle/characteristics-by-tuning-id`,
          { params: { vehicle_id: car_id, tuning_id } }
        );
        setCarCharacteristics(response.data);
      } catch (error) {
        console.error("Error fetching car characteristics:", error);
      }
    }
  }, [car_id, tuning_id]);

  useEffect(() => {
    fetchCarCharacteristics();
  }, [fetchCarCharacteristics]);

  // Handle "Add to Vehicle" button click
  const addToVehicle = async (characteristic_id) => {
    try {
      console.log({
        vehicle_id: car_id,
        tuning_id: tuning_id,
        characteristic_id: characteristic_id,
      });

      await axios.post(
        `https://topspeed-performance.de/api/vehicle/add-characteristics-tuning`,
        null,
        { params: { vehicle_id: car_id, tuning_id: tuning_id, characteristic_id } }
      );

      fetchCarCharacteristics();
      setCharacteristics((prev) => prev.filter((char) => char.id !== characteristic_id));
    } catch (error) {
      console.error("Error adding characteristic to vehicle:", error);
    }
  };

  // Handle the removal of a characteristic
  const removeCharacteristic = async (id) => {
    try {
      await axios.delete(
        `https://topspeed-performance.de/api/vehicle/tuning/characteristic-delete/`,
        {
          data: {
            vehicle_id: car_id,
            tuning_id: tuning_id,
            characteristic_id: id,
          },
        }
      );

      fetchCarCharacteristics();
    } catch (error) {
      console.error("Error removing characteristic:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">
        Characteristics for {vehicleDetails?.full_name} - Stage: {vehicleDetails?.stage}
      </h3>

      <div className="row">
        <div className="col-12 col-md-6">
          <h4>Current Characteristics</h4>
          {carCharacteristics.length > 0 ? (
            <div className="list-group">
              {carCharacteristics.map((char) => (
                <div key={char.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{char.name}:</strong> {char.value}
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => removeCharacteristic(char.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No characteristics found for this car and tuning.</p>
          )}
        </div>

        <div className="col-12 col-md-6">
          <h4 className="mt-4 mt-md-0">Available Characteristics</h4>
          {characteristics.length > 0 ? (
            <div className="list-group">
              {characteristics.map((char) => (
                <div key={char.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{char.name}:</strong> {char.value}
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={() => addToVehicle(char.id)}>
                    Add to Vehicle
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No available characteristics found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarEigenschaften;
