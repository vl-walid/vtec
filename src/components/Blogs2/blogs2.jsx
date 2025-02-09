import React from "react";
import Image from 'next/image'; // Import Image from next/image

const Blogs2 = () => {
  return (
    <section className="app-blog section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-10">
            <div className="s-head text-center mb-80">
              <h6 className="stit mb-30">
                <span className="left"></span> Blog and News
                <span className="right"></span>
              </h6>
              <h2>Read Latest Articles and Tips Latest News & Blog</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="item md-mb50">
              <div className="row">
                <div className="col-md-5">
                  <div className="img">
                    <Image
                      src="/img/mobile-app/blog/1.jpg"
                      alt="Blog Image 1"
                      width={500}  // Set appropriate width
                      height={350} // Set appropriate height
                    />
                  </div>
                </div>
                <div className="col-md-7 valign">
                  <div className="cont">
                    <div className="full-width">
                      <div className="tag">
                        <a href="#0">Design & Arts</a>
                      </div>
                      <div className="title">
                        <h5>
                          Everything You Want Know About Creating Voice
                          Interfaces
                        </h5>
                      </div>
                      <div className="info">
                        <a href="#0">
                          <span>Post By :</span>
                          Lisa A. Cowles
                        </a>
                        <a href="#0">
                          <span>Comments :</span>
                          (05)
                        </a>
                      </div>
                      <a href="#0" className="butn-bord-red rounded buton">
                        <span>Read More</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="item">
              <div className="row">
                <div className="col-md-5">
                  <div className="img">
                    <Image
                      src="/img/mobile-app/blog/2.jpg"
                      alt="Blog Image 2"
                      width={500}  // Set appropriate width
                      height={350} // Set appropriate height
                    />
                  </div>
                </div>
                <div className="col-md-7 valign">
                  <div className="cont">
                    <div className="full-width">
                      <div className="tag">
                        <a href="#0">Design & Arts</a>
                      </div>
                      <div className="title">
                        <h5>
                          Everything You Want Know About Creating Voice
                          Interfaces
                        </h5>
                      </div>
                      <div className="info">
                        <a href="#0">
                          <span>Post By :</span>
                          Lisa A. Cowles
                        </a>
                        <a href="#0">
                          <span>Comments :</span>
                          (05)
                        </a>
                      </div>
                      <a href="#0" className="butn-bord-red rounded buton">
                        <span>Read More</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs2;
