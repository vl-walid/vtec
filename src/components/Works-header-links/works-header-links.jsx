import React from "react";
import fadeWhenScroll from "../../common/fadeWhenScroll";

const WorksHeaderLinks = ({currentData }) => {
  React.useEffect(() => {
    fadeWhenScroll(document.querySelectorAll(".fixed-slider .capt .parlx"));
  }, []);

  return (
    <header className="works-header fixed-slider valign sub-bg marginnavbar">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12"> 
            <div className="capt mt-50 text-center"> 
              <div className="parlx">
                <h1 className="color-font">{currentData.first}</h1>
                <p>VTEC</p>
              </div>
              <div className="custom-font valign">
                <span className="full-width"><h4>{currentData.second}</h4></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WorksHeaderLinks;
