import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../components/Navbar/navbar";
import Intro3 from "../../components/Intro3/intro3";
import AboutUs from "../../components/About-us/about-us";
import Services from "../../components/Services/services";
import Numbers2 from "../../components/Numbers2/numbers2";
import Footer from "../../components/Footer/footer";
import LightTheme from "../../layouts/Light";
import Mycar from "../../components/Mycar/my-car";
import Services3 from "../../components/Services3/services3";
import MinimalArea2 from "../../components/Minimal-Area2/minimal-area2";
import appData from '../../data/app.json';
import CookiesConsent from "../../components/Agreement/agreement";

const Demos = () => {
  const [isMobile, setIsMobile] = useState(false);
  const fixedSlider = useRef(null);
  const MainContent = useRef(null);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1100);
    };

    // Initial check for screen size
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (fixedSlider.current && MainContent.current) {
        const slidHeight = fixedSlider.current.offsetHeight;
        MainContent.current.style.marginTop = slidHeight + "px";
      }
    }, 1000);

    const handleScroll = () => {
      const navbar = navbarRef.current;
      const logo = logoRef.current;

      if (navbar && logo) { // Check if refs are not null
        if (window.pageYOffset > 300) {
          navbar.classList.add("nav-scroll");
          logo.setAttribute("src", appData.darkLogo);
        } else {
          navbar.classList.remove("nav-scroll");
          logo.setAttribute("src", appData.lightLogo);
        }
      }
    };

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listeners and interval on unmount
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <LightTheme>
      <CookiesConsent />
      <Navbar nr={navbarRef} lr={logoRef} />
      <Intro3 />
        <Mycar img="/img/patrn1.png" />

        <MinimalArea2 />
        <Services3 />
        <Services style="4item" />
        <AboutUs />
        <Numbers2 />
        <Footer />

    </LightTheme>
  );
};

export default Demos;
