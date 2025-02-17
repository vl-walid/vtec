import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image"; // Import Image component

const AddCharacteristic = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null); // Store image or null
  const [imageUrl, setImageUrl] = useState(""); // Store the uploaded image URL
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [characteristics, setCharacteristics] = useState([]); // State to store characteristics

  // Fetch all characteristics when the component mounts
  useEffect(() => {
    const fetchCharacteristics = async () => {
      try {
        const response = await axios.get("https://topseed-performance.de/api/characteristics");
        setCharacteristics(response.data); // Store the fetched characteristics
      } catch (err) {
        console.error("Error fetching characteristics:", err);
        setError("Error fetching characteristics from the server.");
      }
    };

    fetchCharacteristics();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the image file
      uploadImage(file); // Trigger the image upload
    }
  };

  // Upload the image to Cloudinary
  const uploadImage = async (selectedFile) => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "vtec-chiptuning"); // Use your preset name here

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd7enl4lj/image/upload",
        formData
      );
      setImageUrl(res.data.secure_url); // Set the image URL after successful upload
      console.log("Uploaded Image URL:", res.data.secure_url); // Debugging the response
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Form validation
    if (!name) {
      setError("Please fill in all fields.");
      return;
    }

    // Generate 'code' from 'name'
    const code = name.toLowerCase().replace(/\s+/g, '-'); // Replace spaces with hyphens and convert to lowercase

    const formData = new FormData();
    formData.append("name", name);
    formData.append("code", code); // Send the code to backend

    // Send image URL to backend
    if (imageUrl) {
      formData.append("image", imageUrl); // Send the Cloudinary image URL
    } else {
      formData.append("image", null); // Send null if no image
    }

    try {
      const response = await axios.post("https://topseed-performance.de/api/add-characteristic", formData);
      setSuccess("Characteristic added successfully!");
      setName("");
      setImage(null);
      setImageUrl(""); // Reset the image URL after successful submission

      // Update characteristics list
      setCharacteristics([...characteristics, response.data]);
    } catch (err) {
      console.error("Error adding characteristic:", err);
      setError("Error adding characteristic.");
    }
  };

  return (
    <section className="sub-bg">
      <div className="container">
        <h3>Add New Characteristic</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* Form to add a new characteristic */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Characteristic Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              required
            />
          </div>

          {/* Image Upload Input */}
          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary">Add Characteristic</button>
        </form>

        {/* Display all existing characteristics */}
        <h3 className="mt-5">All Characteristics</h3>
        {characteristics.length > 0 ? (
          <div className="row mt-30 line-height-35">
            {characteristics.map((characteristic) => {
              const imageSrc = characteristic.image;
              return (
                <div
                  key={characteristic.id}
                  className="col-lg-3 col-md-4 col-4 mb-3 mr-5 p-1 d-flex align-items-center butn curve"
                  style={{ backgroundColor: "#2b2d42", color: "white" }}
                >
                  <div className="">
                    {/* Replace <img> with <Image> */}
                    <Image
                      src={imageSrc}
                      alt={characteristic.name}
                      className="img-fluid"
                      width={100} // Set appropriate width
                      height={100} // Set appropriate height
                      objectFit="contain" // Keeps the aspect ratio intact
                    />
                  </div>
                  <div className="ml-3">
                    <span>{characteristic.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No characteristics available.</p>
        )}
      </div>
    </section>
  );
};

export default AddCharacteristic;
