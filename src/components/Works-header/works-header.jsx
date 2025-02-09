import React from "react";
import fadeWhenScroll from "../../common/fadeWhenScroll";

const WorksHeader = ({ sliderRef, brand, vehicle_name }) => {
  React.useEffect(() => {
    fadeWhenScroll(document.querySelectorAll(".fixed-slider .capt .parlx"));
  }, []);

  return (
    <header ref={sliderRef} className="works-header fixed-slider valign sub-bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12"> 
            <div className="capt mt-50 text-center"> 
              <div className="parlx">
                <h1 className="color-font">{vehicle_name}</h1>
                <p>VTEC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WorksHeader;
