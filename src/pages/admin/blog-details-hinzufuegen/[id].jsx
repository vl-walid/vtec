import React from "react";
import { useRouter } from 'next/router';
import blog2Data from "../../../data/blog2.json";
import LightTheme from "../../../layouts/Light";
import Navbar from "../../../components/Navbar/navbar";
import PageHeader from "../../../components/Page-header/page-header";
import Footer from "../../../components/Footer/footer";
import MyBlogList from "../../../components/Upload/my-blogs";
//import AddBlogForm from "../../../components/Blog-overview/blog-overview-upload";
import UploadBlogDetails from "../../../components/Upload/bolg-details-upload";
import UpdateBlogOverview from "../../../components/Blog-overview/blog-overview-update";

const NewBlogDetailsLight = () => {
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);

  React.useEffect(() => {
    var navbar = navbarRef.current,
      logo = logoRef.current;
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


  const router = useRouter();
  var { id } = router.query; // Get the blog ID from the URL

  return (
    <LightTheme>
      <div className="circle-bg">
        <div className="circle-color fixed">
          <div className="gradient-circle"></div>
          <div className="gradient-circle two"></div>
        </div>
      </div>
      <Navbar nr={navbarRef} lr={logoRef} theme="themeL" />
      <PageHeader
        className="sub-bg"
        title="Unsere Neuigkeiten."
        paragraph="Alle aktuellen Nachrichten und Veranstaltungen unseres kreativen Teams."
      />
      <UpdateBlogOverview blogId={id}/>

      <UploadBlogDetails id={id}/>

      <Footer />
    </LightTheme>
  );
};

export default NewBlogDetailsLight;
