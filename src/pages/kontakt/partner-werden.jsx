import React from "react";
import Navbar from "../../components/Navbar/navbar";
import Intro2 from "../../components/Intro2/intro2";
import ContactArch from "../../components/Contact-arch/contact-arch";
import ProjectDescription from "../../components/Project-description/project-description";
import ProjectIntroduction from "../../components/Project-introduction/project-introduction";
import Services from "../../components/Services/services";
import Video2 from "../../components/Video2/video2";
import CallToAction from "../../components/Call-to-action/call-to-action";
import Footer from "../../components/Footer/footer";
import LightTheme from "../../layouts/Light";
import Portfolio from "../../components/Portfolio/portfolio";
import FullTestimonials from "../../components/Full-testimonials/full-testimonials";
import Team2 from "../../components/Team2/team2";
import Blogs2 from "../../components/blogs/Blogs2/blogs2";

const PartnerWerden = () => {
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);

  React.useEffect(() => {
    var navbar = navbarRef.current;
    if (window.pageYOffset > 300) {
      navbar.classList.add("nav-scroll");
    } else {
      navbar.classList.remove("nav-scroll");
    }
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        navbar.classList.add("nav-scroll");
      } else {
        navbar.classList.remove("nav-scroll");
      }
    });
  }, [navbarRef]);
  return (
    <LightTheme>
      <Navbar nr={navbarRef} lr={logoRef} theme="themeL" />
      <Intro2 />
      <ProjectDescription />
      <ProjectIntroduction />
      <ContactArch />
      <div className="map" id="ieatmaps">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.9857753732217!2d12.4090413761598!3d51.44005511562151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a659fd9c060123%3A0x618056ab5b3fd1c9!2sAm%20Bahndamm%209%2C%2004509%20Krostitz!5e0!3m2!1sfr!2sde!4v1727959904187!5m2!1sfr!2sde"
            loading="lazy"
          ></iframe>
        </div>
      <Footer />
    </LightTheme>
  );
};

export default PartnerWerden;
