import React from "react";

const Report = () => {
  return (
    <div>
      <div>
        <label>Dashboard / Management</label>
      </div>

      <div
        style={{
          paddingTop: "100px",
          margin: "20px",
          textAlign: "center",
        }}
      >
          <button className="btn" id="trueBtn">Reviewer Management</button>
          <div style={{paddingTop: "100px"}} />
          <button className="btn" id="falseBtn">Author Management</button>
      </div>
    </div>
  );
};

export default Report;