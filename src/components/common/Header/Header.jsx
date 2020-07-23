import React from "react";
import "./Header.css";

const header = (props) => {
  return (
    <>
      <div className="main-head">
          <h3 id="header">{props.title}</h3>
      </div>
    </>
  );
};

export default header;
