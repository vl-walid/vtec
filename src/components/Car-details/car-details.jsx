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

        {/* Table for tuning data */}
        <div className="col-md-12 mt-40">
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

        {/* Charts Section */}
        <div className="row mt-30">
          {tuningData.map((tuning, index) => (
            <div key={index} className="col-md-6">
              <h5>{tuning.tuningStage} Charts</h5>
              <LineChart
                width={400}
                height={300}
                series={[
                  { curve: "linear", data: power, label: "OEM Power" },
                  { curve: "linear", data: torque, label: "OEM Torque" },
                  {
                    curve: "linear",
                    data: tuning.power,
                    label: `${tuning.tuningStage} Power`,
                  },
                  {
                    curve: "linear",
                    data: tuning.torque,
                    label: `${tuning.tuningStage} Torque`,
                  },
                ]}
                xAxis={[{ scaleType: "point", data: rpm }]}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
