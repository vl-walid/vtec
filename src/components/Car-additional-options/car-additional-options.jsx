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

  if (error) {
    return <div>{error}</div>; // Simple error handling
  }

  // Check if the characteristics array is empty for all tuning stages
  const hasCharacteristics = characteristics.some(option => option.characteristics.length > 0);

  if (!hasCharacteristics) {
    return null; // Do not render the component if there are no characteristics
  }

  return (
    <section className="sub-bg">
      <div className="container">
        <div className="row">
          <h3>Zus&#228;tzliche Optionen</h3>
        </div>
        <div className="row mt-30 line-height-35">
          {characteristics && characteristics.length > 0 ? (
            characteristics.map((option, index) => ( // Use index to correlate with tuningNames
              <div key={option.vehicle_tuning_id} className="col-12">
                <h4 className="mb-3">Tuning Stage: {tuningNames[index]}</h4> {/* Display tuning stage instead of ID */}
                <div className="row mx-auto">
                  {option.characteristics.map((characteristic) => {
                    // Check if image is null or undefined, then use default image
                    const imageSrc = characteristic.image;

                    return (
                      <div
                        key={characteristic.id}
                        className="col-lg-3 col-md-4 col-10 mb-3 ml-3 mr-5 p-1 d-flex align-items-center butn curve"
                        style={{ backgroundColor: "#2b2d42", color: "white" }}
                      >
                        <div className="">
                          {/* Replace <img> with <Image> */}
                          <Image
                            src={imageSrc}
                            alt={characteristic.name}
                            width={200}  // Adjust the width as needed
                            height={200} // Adjust the height as needed
                            className="img-fluid"
                          />
                        </div>
                        <div className="ml-3">
                          <span>{characteristic.name}</span>
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
