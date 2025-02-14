import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const CarDetails = ({ vehicleDetails, vehicleTuning }) => {
  // Initialize the data arrays
  let rpm = [];
  let power = [];
  let torque = [];
  const tuningData = [];

  // Extract and convert the vehicle data
  if (vehicleDetails) {
    // RPM Data
    rpm = (vehicleDetails?.rpm?.split(",") || []).map((item) => Number(item));

    // OEM Power Data
    power = (vehicleDetails?.oem_power_chart?.split(",") || []).map((item) =>
      Number(item)
    );

    // OEM Torque Data
    torque = (vehicleDetails?.oem_torque_chart?.split(",") || []).map((item) =>
      Number(item)
    );
  }

  // Prepare tuning data arrays
  if (vehicleTuning && vehicleTuning.length > 0) {
    vehicleTuning.forEach((tuning) => {
      const tuningPower = (tuning?.power_chart?.split(",") || []).map((item) =>
        Number(item)
      );
      const tuningTorque = (tuning?.torque_chart?.split(",") || []).map(
        (item) => Number(item)
      );

      let price = tuning.price; // Use tuning.price if it's not null
      const standardPower = Number(vehicleDetails?.standard_power) || 0;

      if (price === null) {
        // Calculate price only if tuning.price is null
        if (tuning.tuning_stage === "Stage 1" && standardPower < 300) {
          price = 400;
        } else if (tuning.tuning_stage === "Stage 2" && standardPower < 300) {
          price = 500;
        } else if (tuning.tuning_stage === "Stage 1" && standardPower >= 300) {
          price = 500;
        } else if (tuning.tuning_stage === "Stage 2" && standardPower >= 300) {
          price = 600;
        } else if (tuning.tuning_stage === "Stage 3") {
          price = 1200;
        } else if (tuning.tuning_stage === "Truck Stage 1") {
          price = 800;
        } else if (tuning.tuning_stage === "ECO") {
          price = 400;
        }
      }

      tuningData.push({
        tuningStage: tuning.tuning_stage,
        power: tuningPower,
        torque: tuningTorque,
        finalPower:
          (Number(vehicleDetails?.standard_power) || 0) +
          (Number(tuning?.difference_power) || 0),
        finalTorque:
          (Number(vehicleDetails?.standard_torque) || 0) +
          (Number(tuning?.difference_torque) || 0),
        price: price, // Add price to the tuning data
      });
    });
  }

  return (
    <section className="sub-bg">
      <div className="container">
        {/* Vehicle Info */}
        <div className="row">
          <div className="col-md-8 mt-50">
            <h4>
              {vehicleDetails ? `${vehicleDetails.full_name}` : "Loading..."}
            </h4>
          </div>
        </div>

        <div className="col-12 mt-40">
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#4F4F4F", color: "#ffffff" }}>
                    Parameter
                  </th>
                  <th style={{ backgroundColor: "#2c2c2c", color: "#ffffff" }}>
                    Original
                  </th>
                  {tuningData.map((tuning, index) => (
                    <th
                      key={index}
                      style={{
                        backgroundColor: "#b22222", // Deep red for tuning stage columns
                        color: "#ffffff", // White text for contrast
                        fontWeight: "bold",
                      }}
                    >
                      {tuning.tuningStage}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th style={{ backgroundColor: "#f0f0f0", color: "#000000" }}>
                    Pferdestärken (PS)
                  </th>
                  <td style={{ backgroundColor: "#e0e0e0", color: "#000000" }}>
                    {vehicleDetails?.standard_power || "Loading..."}
                  </td>
                  {tuningData.map((tuning, index) => (
                    <td
                      key={index}
                      style={{
                        backgroundColor: "#ffe5e5", // Light red for rows
                        color: "#b22222", // Deep red text for emphasis
                      }}
                    >
                      <strong>{tuning.finalPower}</strong> PS
                    </td>
                  ))}
                </tr>
                <tr>
                  <th style={{ backgroundColor: "#f0f0f0", color: "#000000" }}>
                    Drehmoment (Nm)
                  </th>
                  <td style={{ backgroundColor: "#e0e0e0", color: "#000000" }}>
                    {vehicleDetails?.standard_torque || "Loading..."}
                  </td>
                  {tuningData.map((tuning, index) => (
                    <td
                      key={index}
                      style={{
                        backgroundColor: "#ffe5e5", // Light red for rows
                        color: "#b22222", // Deep red text for emphasis
                      }}
                    >
                      <strong>{tuning.finalTorque}</strong> Nm
                    </td>
                  ))}
                </tr>
                <tr>
                  <th style={{ backgroundColor: "#f0f0f0", color: "#000000" }}>
                    Price (€)
                  </th>
                  <td style={{ backgroundColor: "#e0e0e0", color: "#000000" }}>
                    -
                  </td>
                  {tuningData.map((tuning, index) => (
                    <td
                      key={index}
                      style={{
                        backgroundColor: "#ffe5e5", // Light red for rows
                        color: "#b22222", // Deep red text for emphasis
                      }}
                    >
                      <strong>{tuning.price} €</strong>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="row mt-30">
          {tuningData.map((tuning, index) => (
            <div key={index} className="col-12 col-md-6">
              <div className="flex flex-col items-center p-4">
              <h4 className="text-2xl font-semibold text-gray-200">{tuning.tuningStage} Charts</h4>



                {/* Labels with matching colors */}
                <div className="row mt-2 g-1 justify-content-start">
                  {[
                    { label: "OEM Power", color: "#4B0082" }, 
                    { label: "OEM Torque", color: "#006400" }, 
                    { label: `${tuning.tuningStage} Power`, color: "#2c2c2c" }, 
                    { label: `${tuning.tuningStage} Torque`, color: "#8B0000" }, 
                  ].map(({ label, color }, i) => (
                    <div key={i} className="col-auto">
                      <span style={{ color, fontWeight: "bold" }}>{label}</span>
                    </div>
                  ))}
                </div>

                {/* Chart Component */}
                <LineChart
                  width={
                    window.innerWidth < 768
                      ? window.innerWidth * 0.95
                      : window.innerWidth * 0.31
                  } 
                  height={300}
                  series={[
                    { curve: "linear", data: power, color: "#4B0082" }, 
                    { curve: "linear", data: torque, color: "#006400" }, 
                    { curve: "linear", data: tuning.power, color: "#2c2c2c" },
                    { curve: "linear", data: tuning.torque, color: "#8B0000" },
                  ]}
                  xAxis={[{ scaleType: "point", data: rpm }]}
                  tooltip={{ trigger: "item" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
