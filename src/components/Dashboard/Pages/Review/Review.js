import React from "react";
import "./Table.css";

const Review = () => {
  return (
    <div
      style={{
        paddingTop: "20px",
        margin: "20px",
        borderRadius: "5px",
        textAlign: "center",
        height: "250px",
        backgroundColor: "#795548",
      }}
    >
      <h1>REVIEW</h1>

      <form>
        <table>
          <thead>
            <tr>
              <th><input type="checkbox"></input></th>
              <th>No.</th>
              <th>Title</th>
              <th>Topic</th>
              <th>Pages</th>
              <th>Submit Date</th>
              <th>Author Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox"></input></td>
              <td></td>
              <td>Preschool Education</td>
              <td>Education</td>
              <td>367</td>
              <td>21/9/2021</td>
              <td>Tomas John</td>
              <td>New</td>
              <td>View</td>
            </tr>
            <tr>
              <td><input type="checkbox"></input></td>
              <td></td>
              <td>Kinematics and Health</td>
              <td>Health</td>
              <td>567</td>
              <td>13/11/2019</td>
              <td>James Lee</td>
              <td>New</td>
              <td>View</td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Within Scope"></input>
        <input type="submit" value="Out of Scope"></input>
      </form>
    </div>
  );
};

export default Review;
