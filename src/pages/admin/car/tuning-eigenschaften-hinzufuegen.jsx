import React, { useState, useEffect } from "react";

import LightTheme from "../../../layouts/Light";
import NavbarFullMenu from "../../../components/Navbar-full-menu/navbar-full-menu";
import PageHeader from "../../../components/Page-header/page-header";
import Footer from "../../../components/Footer/footer";
import TuningComponent from "../../../components/Tuning-eigenschaften/tuning";
import AddCharacteristic from"../../../components/Tuning-eigenschaften/eigenschaften";
const TuningEingeschaftenHinzufuegen = () => {
 
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
      {/* Pass the engineId as a prop to the NewCarForm component */}
      <TuningComponent/>
      <AddCharacteristic/>
      <Footer />
    </LightTheme>
  );
};

export default TuningEingeschaftenHinzufuegen;
