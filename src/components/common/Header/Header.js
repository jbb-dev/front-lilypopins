import React from "react";
import "./Header.css";

const header = (props) => {
  return (
    <>
      <div className="main-head">
        <div className="header-title">
          <h3 id="header">{props.title}</h3>
        </div>
        {props.home ?
          <div className="header-logout"> 
            <i class="fas fa-sign-out-alt fa-2x" onClick={() => props.logout()}></i>
          </div>
        : null }
      </div>
    </>
  );
};

export default header;
