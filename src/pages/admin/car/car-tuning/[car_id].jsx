import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

import LightTheme from "../../../../layouts/Light";
import NavbarFullMenu from "../../../../components/Navbar-full-menu/navbar-full-menu";
import PageHeader from "../../../../components/Page-header/page-header";
import Footer from "../../../../components/Footer/footer";
import CarTuning from "../../../../components/Car-tuning-eigenschaften/car-tuning";

const CarTuningEigenschaftenID = () => {
  const router = useRouter(); 
  const { car_id } = router.query;
  const [isLoading, setIsLoading] = useState(true);

  // Use useCallback to memoize the function and avoid re-creation
  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem('authToken');

    console.log('Token:', token);

    if (!token) {
      console.log('No token found, user is not authenticated');
      router.push('/'); 
      return;
    }

    try {
      const response = await fetch('https://back-end.topspeed-performance.de/api/verify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Token is valid');
        setIsLoading(false); 
      } else {
        console.log('Token is invalid');
        router.push('/');
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]); // Include verifyToken in the dependency array

  useEffect(() => {
    if (router.isReady && car_id) {
      console.log(`Car ID: ${car_id}`);
    }
  }, [router.isReady, car_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <LightTheme>
      <div className="circle-bg">
        <div className="circle-color fixed">
          <div className="gradient-circle"></div>
          <div className="gradient-circle two"></div>
        </div>
      </div>
      <NavbarFullMenu theme="light" />
      <PageHeader
        className="sub-bg"
        title="Details des Autos hinzuf&uuml;gen."
        paragraph="Alle aktuellen Auto und Veranstaltungen unseres kreativen Teams."
      />
      <CarTuning car_id={car_id} />
      <Footer />
    </LightTheme>
  );
};

export default CarTuningEigenschaftenID;
