import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/navbar";
import WorksHeader from "../../components/Works-header/works-header";
import LightTheme from "../../layouts/Light";
import CarDetails from "../../components/Car-details/car-details";
import CarAdditionalOptions from "../../components/Car-additional-options/car-additional-options";
import Footer from "../../components/Footer/footer";
import Head from "next/head";

const Cardetailsvg = () => {
  const fixedHeader = useRef(null);
  const MainContent = useRef(null);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);

  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [tuningDetails, setTuningDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [selectedVehicleName, setSelectedVehicleName] = useState(null);
  const [selectedVehicleBrand, setSelectedVehicleBrand] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    const fetchVehicleDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.post("http://127.0.0.1:8000/api/vehicle/details", {
          vehicle_id: id,
        });
        setVehicleDetails(response.data.vehicle);
        setTuningDetails(response.data.tuning);
        setSelectedVehicleName(response.data.vehicle.full_name);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching vehicle details:", err);
        setError("Error fetching vehicle details from the server.");
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <LightTheme>
        <Head>
          <title>Error - Vehicle Details</title>
        </Head>
        <div className="circle-bg">
          <div className="circle-color fixed">
            <div className="gradient-circle"></div>
            <div className="gradient-circle two"></div>
          </div>
        </div>
        <Navbar nr={navbarRef} lr={logoRef} theme="themeL" />
        <WorksHeader
          sliderRef={fixedHeader}
          brand={selectedVehicleBrand}
          vehicle_name={selectedVehicleName}
        />
        <div className="main-content">
          <p>{error}</p>
        </div>
        <Footer />
      </LightTheme>
    );
  }

  const vehicleId = vehicleDetails ? vehicleDetails.id : null;
  const tuningIds = tuningDetails ? tuningDetails.map(tuning => tuning.id) : [];
  const tuningNames = tuningDetails ? tuningDetails.map(tuning => tuning.tuning_stage) : [];

  return (
    <LightTheme>
      <Head>
        <title>{selectedVehicleName}</title>
      </Head>
      <div className="circle-bg">
        <div className="circle-color fixed">
          <div className="gradient-circle"></div>
          <div className="gradient-circle two"></div>
        </div>
      </div>
      <Navbar nr={navbarRef} lr={logoRef} theme="themeL" />
      <WorksHeader
        sliderRef={fixedHeader}
        vehicle_name={selectedVehicleName}
      />
      <div className="main-content" ref={MainContent}>
        {vehicleDetails && tuningDetails ? (
          <>
            <CarDetails vehicleDetails={vehicleDetails} vehicleTuning={tuningDetails} />
            <CarAdditionalOptions additionalOptions={{ vehicleId, tuningIds, tuningNames }} />
          </>
        ) : (
          <p>No vehicle or tuning details available</p>
        )}
        <Footer />
      </div>
    </LightTheme>
  );
};

export default Cardetailsvg;
