import React from "react";
import LightTheme from "../../layouts/Light";
import NavbarFullMenu from "../../components/Navbar-full-menu/navbar-full-menu";
import PageHeader from "../../components/Page-header/page-header";
import Footer from "../../components/Footer/footer";
import MyBlogList from "../../components/Upload/my-blogs";
import AddBlogForm from "../../components/Blog-overview/blog-overview-upload";
import { useRouter } from "next/router"; // Import the useRouter hook

const NewBlogLight = () => {
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(true); // Loading state
  const router = useRouter(); // Next.js router for navigation

  // Use useCallback to memoize the verifyToken function
  const verifyToken = React.useCallback(async () => {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token);

    if (!token) {
      console.log('No token found, user is not authenticated');
      router.push('/'); // Redirect to login page if no token
      return;
    }

    try {
      const response = await fetch('https://back-end.topspeed-performance.de/api/verify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Fixed string interpolation issue
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Token is valid');
        setIsLoading(false); // Set loading state to false, content can now render
      } else {
        console.log('Token is invalid');
        router.push('/'); // Redirect to login page if token is invalid
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      router.push('/'); // Redirect to login page in case of error
    }
  }, [router]); // Add router to dependency array

  // Call verifyToken only once when the component mounts
  React.useEffect(() => {
    verifyToken();
  }, [verifyToken]); // Make sure verifyToken is in the dependency array

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while token is being verified
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
        title="Unsere Neuigkeiten."
        paragraph="Alle aktuellen Nachrichten und Veranstaltungen unseres kreativen Teams."
      />
      <AddBlogForm />
      <MyBlogList />
      <Footer />
    </LightTheme>
  );
};

export default NewBlogLight;
