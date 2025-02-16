/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import axios from "axios";

const AddBlogForm = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    date_added: "",
    main_image_url: "", // This will store the Cloudinary image URL
  });
  const [selectedFile, setSelectedFile] = useState(null); // For the file selected for upload
  const [loading, setLoading] = useState(false); // Loading state for image upload
  const [imageUrl, setImageUrl] = useState(""); // To store uploaded image URL

  // Handle text field changes
  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Upload the image to Cloudinary
  const uploadImage = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "vtec-chiptuning"); // Replace with your Cloudinary upload preset

    setLoading(true);

    try {
      // Upload image to Cloudinary
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd7enl4lj/image/upload",
        formData
      );
      setImageUrl(res.data.secure_url); // Store the URL of the uploaded image
      setBlogData({ ...blogData, main_image_url: res.data.secure_url }); // Save the image URL in blogData
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("date_added", blogData.date_added);
    formData.append("main_image_url", blogData.main_image_url); // Send the Cloudinary image URL

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/blog-overview",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        alert("Blog added successfully!");
        setBlogData({
          title: "",
          date_added: "",
          main_image_url: "",
        });
        setImageUrl(""); // Reset image URL
        setSelectedFile(null); // Clear selected file
        window.location.reload(); // Reload the page
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("Error adding blog!");
    }
  };

  // Set the current date
  const setCurrentDate = () => {
    const today = new Date().toISOString().slice(0, 10);
    setBlogData({ ...blogData, date_added: today });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Neuen Blog hinzuf&uuml;gen</h2>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-sm bg-light"
      >
        <div className="row">
          {/* Blog Title */}
          <div className="col-md-6 mb-3">
            <label htmlFor="title" className="form-label">
              Blog-Titel
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={blogData.title}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          {/* Blog Date */}
          <div className="col-md-6 mb-3">
            <label htmlFor="date_added" className="form-label">
              Datum
            </label>
            <div className="input-group">
              <input
                type="date"
                name="date_added"
                id="date_added"
                value={blogData.date_added}
                onChange={handleChange}
                required
                className="form-control"
              />
              <button
                type="button"
                onClick={setCurrentDate}
                className="btn btn-primary ms-2"
              >
                Auf Heute setzen
              </button>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="main_image" className="form-label">
              Hauptbild hochladen
            </label>
            <input
              type="file"
              name="main_image"
              id="main_image"
              onChange={handleFileSelect}
              className="form-control"
            />
            <button
              type="button"
              onClick={uploadImage}
              disabled={loading || !selectedFile}
              className="btn btn-secondary mt-2"
            >
              {loading ? "Uploading..." : "Hochladen Bild"}
            </button>
          </div>
        </div>

        {imageUrl && (
          <div className="row">
            <div className="col-md-6 mb-3">
              <p>Image uploaded successfully:</p>
              <img src={imageUrl} alt="Uploaded" style={{ width: "300px" }} />
            </div>
          </div>
        )}

        {/* Submit Button */}
        {/* Submit Button */}
        <div className="row">
          <div className="col-md-6">
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={!blogData.main_image_url} // Disable if main_image_url is null or empty
            >
              Neuen Blog hinzuf&uuml;gen
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBlogForm;
