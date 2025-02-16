import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image"; // Import Image from next/image

const UploadBlogDetails = ({ id }) => {
  const [details, setDetails] = useState({
    main_paragraph: "",
    summary_paragraph: "",
    additional_image_1: null,
    additional_image_2: null,
  });
  const [blogPostId, setBlogPostId] = useState(null);
  const [blogExists, setBlogExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageUrls, setImageUrls] = useState({ image1: "", image2: "" });

  // Fetch blog details only when `id` is defined
  useEffect(() => {
    if (!id) {
      console.error("Blog ID is not available.");
      return;
    }

    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/blog-posts/${id}`
        );

        if (response.data) {
          setBlogExists(true);
          setDetails({
            main_paragraph: response.data.main_paragraph || "",
            summary_paragraph: response.data.summary_paragraph || "",
            additional_image_1: response.data.additional_image_1 || null,
            additional_image_2: response.data.additional_image_2 || null,
          });
          setImageUrls({
            image1: response.data.additional_image_1 || "",
            image2: response.data.additional_image_2 || "",
          });
          setBlogPostId(response.data.id);
        }
      } catch (error) {
        // Handle error gracefully
        if (error.response && error.response.status === 404) {
          setMessage("Blog post not found!");
        } else {
          console.error("Error fetching blog post:", error);
          setMessage("Error fetching blog details.");
        }
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: e.target.files[0],
    }));
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vlwalid");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dhagemzyp/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleImageUpload = async (imageName) => {
    const file = details[imageName];
    const imageUrl = await uploadImage(file);

    if (imageName === "additional_image_1") {
      setImageUrls((prev) => ({ ...prev, image1: imageUrl }));
    } else if (imageName === "additional_image_2") {
      setImageUrls((prev) => ({ ...prev, image2: imageUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("blog_overview_id", id);
    formData.append("main_paragraph", details.main_paragraph);
    formData.append("summary_paragraph", details.summary_paragraph);
    formData.append("additional_image_1", imageUrls.image1 || "");
    formData.append("additional_image_2", imageUrls.image2 || "");

    try {
      const response = await axios.post(
        blogExists
          ? `http://127.0.0.1:8000/api/blog-posts/${id}/update`
          : "http://127.0.0.1:8000/api/blog-posts-new",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setMessage(
          blogExists ? "Blog updated successfully!" : "Blog created successfully!"
        );
        setBlogExists(true);
      }
    } catch (error) {
      console.error("Error adding/updating blog post:", error);
      setMessage("Error processing blog post!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/blog-posts/${id}`
      );
      if (response.status === 200) {
        setMessage("Blog post deleted successfully!");
        setBlogExists(false);
        setDetails({
          main_paragraph: "",
          summary_paragraph: "",
          additional_image_1: null,
          additional_image_2: null,
        });
        setImageUrls({ image1: "", image2: "" });
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
      setMessage("Error deleting blog post!");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        {blogExists ? "Edit Blog Details" : "Add Blog Details"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-12">
            <label className="form-label">Main Paragraph</label>
            <textarea
              name="main_paragraph"
              value={details.main_paragraph}
              onChange={handleChange}
              required
              className="form-control"
              rows="4"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-12">
            <label className="form-label">Summary Paragraph</label>
            <textarea
              name="summary_paragraph"
              value={details.summary_paragraph}
              onChange={handleChange}
              className="form-control"
              rows="4"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Additional Image 1</label>
            <input
              type="file"
              name="additional_image_1"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control"
            />
            <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={() => handleImageUpload("additional_image_1")}
              disabled={!details.additional_image_1}
            >
              Upload Image 1
            </button>
            {imageUrls.image1 && (
              <Image
                src={imageUrls.image1}
                alt="Uploaded Image 1"
                width={600} // Adjust width based on the image size you want
                height={300} // Adjust height as needed
                className="img-fluid mt-2"
                style={{
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Additional Image 2</label>
            <input
              type="file"
              name="additional_image_2"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control"
            />
            <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={() => handleImageUpload("additional_image_2")}
              disabled={!details.additional_image_2}
            >
              Upload Image 2
            </button>
            {imageUrls.image2 && (
              <Image
                src={imageUrls.image2}
                alt="Uploaded Image 2"
                width={600} // Adjust width based on the image size you want
                height={300} // Adjust height as needed
                className="img-fluid mt-2"
                style={{
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className={`btn btn-primary ${loading ? "disabled" : ""}`}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : blogExists
              ? "Update Blog Details"
              : "Add Blog Details"}
          </button>
          {blogExists && (
            <>
              <button
                type="button"
                className="btn btn-danger ms-3"
                onClick={handleDelete}
              >
                Delete Blog Post
              </button>

              <Link legacyBehavior href={`/admin/blog/news-beitraege-details/${blogPostId}`} className="btn btn-info ms-3">
                View Blog
              </Link>
            </>
          )}
        </div>

        {message && <p className="text-center text-success mt-3">{message}</p>}
      </form>
    </div>
  );
};

export default UploadBlogDetails;
