import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image"; // Import Image from next/image

const UpdateBlogOverview = ({ blogId }) => {
  const [blogOverview, setBlogOverview] = useState({
    main_title: "",
    main_image_url: "", // This stores the Cloudinary image URL
  });
  const [selectedFile, setSelectedFile] = useState(null); // For file selected for upload
  const [loading, setLoading] = useState(false); // Loading state for image upload
  const [imageUrl, setImageUrl] = useState(''); // To store uploaded image URL
  const router = useRouter();

  // Fetch the blog overview details based on blogId
  useEffect(() => {
    console.log("Blog ID:", blogId); // Debugging the blogId
    const fetchBlogOverview = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/blog-overview/${blogId}`
        );
        setBlogOverview({
          main_title: response.data.main_title,
          main_image_url: response.data.main_image,
        });
        setImageUrl(response.data.main_image);
      } catch (error) {
        console.error("Error fetching blog overview:", error);
      }
    };
  
    fetchBlogOverview();
  }, [blogId]);
  

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Upload the image to Cloudinary
  const uploadImage = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'vtec-chiptuning'); // Replace with your Cloudinary upload preset

    setLoading(true);

    try {
      // Upload image to Cloudinary
      const res = await axios.post('https://api.cloudinary.com/v1_1/dd7enl4lj/image/upload', formData);
      setImageUrl(res.data.secure_url); // Store the URL of the uploaded image
      setBlogOverview({ ...blogOverview, main_image_url: res.data.secure_url }); // Save the image URL in blogOverview
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };

  // Handle form submission to update the blog overview
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://127.0.0.1:8000/api/blog-overview/${blogId}`, {
        main_title: blogOverview.main_title,
        main_image: blogOverview.main_image_url, // Send the Cloudinary image URL
      });
      alert("Blog overview updated successfully");
      router.push(`/blog-details/${blogId}`); // Navigate to the updated blog page after successful update
    } catch (error) {
      console.error("Error updating blog overview:", error);
      alert("Failed to update blog overview");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogOverview((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Update Blog Overview</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
        {/* Blog Title */}
        <div className="mb-3">
          <label htmlFor="main_title" className="form-label">Blog Title</label>
          <input
            type="text"
            name="main_title"
            id="main_title"
            value={blogOverview.main_title}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label htmlFor="main_image" className="form-label">Upload New Main Image</label>
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
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>

        {imageUrl && (
          <div className="mb-3">
            <p>Current Image:</p>
            {/* Use next/image for optimized image rendering */}
            <Image
              src={imageUrl}
              alt="Uploaded"
              width={300} // Specify the width and height to match design
              height={200}
              objectFit="cover" 
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-success w-100"
        >
          Update Blog Overview
        </button>
      </form>
    </div>
  );
};

export default UpdateBlogOverview;
