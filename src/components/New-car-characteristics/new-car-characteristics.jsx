import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image"; // Import Image from next/image for optimization

const NewCarCharacteristics = ({ vehicleID }) => {
  const router = useRouter();
  const [characteristics, setCharacteristics] = useState([]); // To store characteristics from API
  const [addCharacteristic, setAddCharacteristic] = useState([]); // Selected characteristic IDs
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission status

  // Fetch characteristics from the API on component mount
  useEffect(() => {
    const fetchCharacteristics = async () => {
      try {
        const response = await axios.get("https://topseed-performance.de/api/vehicles-characteristics");
        setCharacteristics(response.data.characteristics || []);
      } catch (error) {
        console.error("Error fetching characteristics:", error);
      }
    };

    fetchCharacteristics();
  }, []);

  // Sanitize image names for correct mapping
  const sanitizeImageName = (name) => {
    switch (name) {
      case "Dtc OFF":
        return "dtc-removal";
      case "Cold Start Noise":
        return "cold-start-noise";
      case "Hardcut Popcorn Limiter (Diesel Only)":
        return "pop-bang-crackle-map";
      case "Gpf/Opf OFF":
        return "gpf_removal";
      case "Dpf/Fap OFF":
        return "dpf-off";
      case "Readiness Calibration":
        return "readiness_calibration";
      case "Bmw Sports Display":
        return "bmw";
      case "Adblue/Src OFF":
        return "adblue";
      case "Maf OFF":
        return "maf_removal";
      case "Speed Limit OFF":
        return "bune";
      case "TQ Monitoring Off":
        return "detac";
      case "Pop&Bang":
        return "pop-bang-crackle-map";
      case "Start/Stop Disable":
        return "start-stop-off";
      case "Tva Off":
        return "anti-lag";
      case "Immo OFF":
        return "immo-off";
      case "Sap Delete":
        return "sap_removal";
      case "Evap Removal":
        return "evap_removal";
      case "Swirl Flaps":
        return "flaps";
      case "Exhaust Flap Removal":
        return "flaps";
      case "O2/Lamba OFF":
        return "lambda-o2-off";
      case "Hot Start":
        return "launch_control";
      case "Egr OFF":
        return "egr";
      default:
        return name.replace(/[^a-zA-Z0-9]/g, "_");
    }
  };

  // Toggle characteristic selection by ID
  const toggleCharacteristic = (id) => {
    setAddCharacteristic((prev) =>
      prev.includes(id) ? prev.filter((charId) => charId !== id) : [...prev, id]
    );
  };

  // Submit selected characteristics
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Log the data to be sent to the backend for inspection
      console.log("Data to be sent to the backend:", {
        vehicle_id: vehicleID,
        characteristics: addCharacteristic, // Directly use the IDs
      });

      // Send data to the backend
      const response = await axios.post("https://topseed-performance.de/api/vehicle/add-characteristics", {
        vehicle_id: vehicleID,
        characteristics: addCharacteristic, // Send only the IDs
      });

      alert("Characteristics successfully assigned!");
      console.log("Response from server:", response.data);

      // Clear selection after successful submission
      setAddCharacteristic([]);
    } catch (error) {
      console.error("Error submitting characteristics:", error);
      alert("Failed to submit characteristics. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="sub-bg">
      <div className="container">
        <div className="row">
          <h3>Zus&#228;tzliche Optionen</h3>
        </div>
        <div className="row mt-30 line-height-35">
          {characteristics && characteristics.length > 0 ? (
            characteristics.map((option) => {
              const sanitizedImageName = sanitizeImageName(option.characteristic_name);

              return (
                <div
                  key={option.characteristic_id}
                  className={`col-lg-3 col-md-4 col-4 mb-3 mr-5 p-1 d-flex align-items-center butn curve ${
                    addCharacteristic.includes(option.characteristic_id) && "bg-dark"
                  }`}
                  style={{ backgroundColor: "#2b2d42", color: "white" }}
                  onClick={() => toggleCharacteristic(option.characteristic_id)}
                >
                  <div>
                    {/* Replace <img> with <Image> from next/image */}
                    <Image
                      src={`/img/caroptions/${sanitizedImageName}.png`} // Image source based on sanitized name
                      alt={option.characteristic_name} // Alt text for accessibility
                      width={100} // Specify width for the image
                      height={100} // Specify height for the image
                      className="img-fluid" // Ensure the image is responsive
                    />
                  </div>
                  <div className="ml-3">
                    <span>{option.characteristic_name}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No characteristics available</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="row mt-30">
          <button
            className="btn btn-primary mr-2"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewCarCharacteristics;
