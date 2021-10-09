import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        textAlign: "center",
        border: "1px solid black",
        position: "fixed",
        width: "100%",
        bottom: "0",
        backgroundColor: "#9e9e9e",
        color: "white",
        fontFamily: "monospace",
        fontSize: "18px",
      }}
    >
      <h6 style={{ margin: "5px", fontWeight: "400" }}>
        Copyright &copy; 2021 CSCI334 - Group 5. All Rights Reserved.{" "}
      </h6>
    </div>
  );
};

export default Footer;
