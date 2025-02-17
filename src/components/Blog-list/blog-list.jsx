/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch blogs from API with pagination
  const fetchBlogs = async (page) => {
    try {
      const response = await axios.get(
        `https://topspeed-performance.de/api/blog-overviews?page=${page}`
      );
      setBlogs(response.data.data); // Assuming the 'data' field contains blog data
      setTotalPages(response.data.last_page); // Assuming 'last_page' field contains total number of pages
    } catch (error) {
      console.error("Error fetching blogs:", error);
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
                  className="item mb-80 fadeInUp"
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
                          
                              <a className="tag">
                                <span>
                                  {new Date(blogItem.date_added).toLocaleDateString()}
                                </span>
                              </a>
                          
                            <span>/</span>
                          </div>
                          <h5>
                            <Link legacyBehavior href={`/blog-details/${blogItem.id}`}>
                              <a>{blogItem.main_title}</a>
                            </Link>
                          </h5>

                          <div className="btn-more mt-30">
                            <Link legacyBehavior href={`/blog-details/${blogItem.id}`}>
                              <a className="simple-btn">Mehr lesen</a>
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
                    {/* Only one child (the number or icon) inside Link */}
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

export default BlogList;
