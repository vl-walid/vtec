/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const MyBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch blogs from API with pagination
  const fetchBlogs = async (page) => {
    try {
      const response = await axios.get(
        `https://back-end.topspeed-performance.de/api/blog-overviews?page=${page}`
      );
      setBlogs(response.data.data); // Assuming the 'data' field contains blog data
      setTotalPages(response.data.last_page); // Assuming 'last_page' field contains total number of pages
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Function to delete a blog overview
  const deleteBlogOverview = async (id) => {
    try {
      await axios.delete(`https://back-end.topspeed-performance.de/api/blog-overview/${id}`);
      // Refresh the list after deletion
      setBlogs(blogs.filter((blogItem) => blogItem.id !== id));
      alert("Blog overview deleted successfully");
    } catch (error) {
      console.error("Error deleting blog overview:", error);
      alert("Failed to delete blog overview");
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage); // Fetch blogs when currentPage changes
  }, [currentPage]);

  return (
    <section className="blog-pg blog-list section-padding pt-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="posts mt-80">
              {blogs.map((blogItem) => (
                <div
                  className="item mb-80 wow fadeInUp"
                  key={blogItem.id}
                  data-wow-delay=".3s"
                >
                  <div className="row">
                    <div className="col-lg-6 valign">
                      <div className="img md-mb50">
                        <img src={blogItem.main_image} alt={blogItem.main_title} />
                      </div>
                    </div>
                    <div className="col-lg-6 valign">
                      <div className="cont">
                        <div>
                          <div className="info">
                          <Link legacyBehavior href={`blog-details-hinzufuegen/${blogItem.id}`}>
                              <a className="tag">
                                <span>
                                  {new Date(blogItem.date_added).toLocaleDateString()}
                                </span>
                              </a>
                            </Link>
                            <span>/</span>
                          </div>
                          <h5>
                          <Link legacyBehavior href={`blog-details-hinzufuegen/${blogItem.id}`}>
                              <a>{blogItem.main_title}</a>
                            </Link>
                          </h5>

                          <div className="btn-more mt-30">
                            <Link legacyBehavior href={`blog-details-hinzufuegen/${blogItem.id}`}>
                              <a className="simple-btn">Blog Details</a>
                            </Link>

                            {/* Delete Blog Button */}
                            <Link legacyBehavior href="#">
                            <a
                             className="butn bord curve mt-40 wow fadeInUp ml-4"
                              data-wow-delay=".4s"
                              onClick={() => deleteBlogOverview(blogItem.id)}
                            >
                              Delete Blog
                            </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <span key={index}>
                    <Link legacyBehavior href="#">
                      <a onClick={() => setCurrentPage(index + 1)}>{index + 1}</a>
                    </Link>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBlogList;
