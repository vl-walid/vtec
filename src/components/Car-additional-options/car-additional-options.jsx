import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image'; // Import Image from next/image

const CarAdditionalOptions = ({ additionalOptions }) => {
  const { vehicleId, tuningIds, tuningNames } = additionalOptions;
  const [characteristics, setCharacteristics] = useState([]);
  const [error, setError] = useState(null);

  // Fetch characteristics when vehicleId and tuningIds are available
  useEffect(() => {
    if (vehicleId && tuningIds.length > 0) {
      const fetchCharacteristics = async () => {
        try {
          const response = await axios.post("https://topspeed-performance.de/api/vehicle-characteristics", {
            vehicle_id: vehicleId,
            vehicle_tuning_ids: tuningIds,
          });
          setCharacteristics(response.data);
        } catch (err) {
          console.error("Error fetching characteristics:", err);
          setError("Error fetching characteristics from the server.");
        }
      };

      fetchCharacteristics();
    }
  }, [vehicleId, tuningIds]);

  const hasCharacteristics = characteristics.some(option => option.characteristics.length > 0);

  return (
    <section className="d-flex justify-content-center align-items-center vh-100">
      <div className="container text-center">
        <div className="row ml-50">
          <h3>Zus&#228;tzliche Optionen</h3>
        </div>
        <div className="row mt-30 line-height-35">
          {characteristics && characteristics.length > 0 ? (
            characteristics.map((option, index) => (
              <div key={option.vehicle_tuning_id} className="col-12">
                <h4 className="mb-3">Tuning Stage: {tuningNames[index]}</h4>
                <div className="row justify-content-center">
                  {option.characteristics.map((characteristic) => {
                    const imageSrc = characteristic.image;
                    return (
                      <div
                        key={characteristic.id}
                        className="col-lg-3 col-md-4 col-10 mb-4 p-3 d-flex align-items-center justify-content-center butn curve"
                        style={{ backgroundColor: "#2b2d42", color: "white", margin: "10px" }}
                      >
                        <div className="text-center">
                          <Image
                            src={imageSrc}
                            alt={characteristic.name}
                            width={200}
                            height={200}
                            className="img-fluid"
                          />
                          <div className="mt-2">
                            <span>{characteristic.name}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <p>No additional options available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CarAdditionalOptions;
