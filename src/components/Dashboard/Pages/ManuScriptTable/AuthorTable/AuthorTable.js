import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../App";
import AuthorData from "../TableData/AuthorData";
import ViewDocumentPopUp from "../../ViewDocumentPopUp/ViewDocumentPopUp";

const AuthorTable = () => {
  const [loggedInUser] = useContext(UserContext);
  console.log("userData: ", loggedInUser);

  // STANDARD GET REQUEST
  const authorDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&authorID=${loggedInUser.personID}`;
  const [authorData, setAuthorData] = useState([]);
  const [updateAuthorData, setUpdateAuthorData] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updateAuthorData) {
      fetch(authorDataUrl, {
        method: "GET",
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data);
        setAuthorData(data);
        if (data) {
          setUpdateAuthorData(false);
        }
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
    }
  }, [authorDataUrl, updateAuthorData]);

  const [viewDocument, setViewDocument] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  }

  const downloadDocument = (e) => {
    e.preventDefault();
    document.getElementById("downloadDocumentForm").submit();
  }

  return (
    <div>
      <label>Dashboard</label>
      <div className="editorAuthorDashboard">
        {/* <div className="filterDiv">
          <table>
            <tbody>
              <tr>
                <td>
                  <select>
                    <option value="">Filter by Topic</option>
                    <option value="history">History</option>
                    <option value="science">Science</option>
                    <option value="social study">Social Study</option>
                    <option value="medicine">Medicine</option>
                    <option value="education">Education</option>
                    <option value="others">Others</option>
                  </select>
                </td>
                <td>
                  <select>
                    <option value="">Filter by Pages</option>
                    <option value="<100">&lt; 100</option>
                    <option value="100-200">100 - 200</option>
                    <option value="200-300">200 - 300</option>
                    <option value="300-400">300 - 400</option>
                    <option value="400-500">400 - 500</option>
                    <option value=">500">&gt; 500</option>
                  </select>
                </td>
                <td>
                  <select>
                    <option value="">Filter by Date</option>
                    <option value="1week">Last one week</option>
                    <option value="1month">Last one month</option>
                    <option value="3months">Last three months</option>
                    <option value="6months">Last half year</option>
                    <option value="1year">Last one year</option>
                    <option value="3years">Last three years</option>
                  </select>
                </td>
                <td>
                  <select>
                    <option value="">Filter by Status</option>
                    <option value="1week">New</option>
                    <option value="1month">Pending Review</option>
                    <option value="3months">Rejected</option>
                    <option value="6months">Under View</option>
                    <option value="1year">Paid</option>
                    <option value="3years">Pending Modify</option>
                    <option value="3years">Pending Payment</option>
                    <option value="3years">Pending Final Check</option>
                    <option value="3years">Published</option>
                    <option value="3years">Cancelled</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
        <div className="authorDashboard">
          <form method="GET">
            <table className="dataTable">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Title</th>
                  <th>Topic</th>
                  <th>Submit Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              {authorData.map((item) => (
                <AuthorData
                  key={item.documentMetaDataObject.documentID}
                  data={item.documentMetaDataObject}
                  setViewDocument={setViewDocument}
                  handleOpen={handleOpen}
                />
              ))}
            </table>
          </form>
          <form target="_blank" method="post" id="docform" action="http://localhost/jess-backend/processes/downloadDocument.php" >
            <input type="hidden" name="documentID" id="documentID" />
          </form>
        </div>
      </div>

      <div>
        {isOpen && <ViewDocumentPopUp
          content={<>
            <table className="downloadManuscriptTable">
              <tbody>
                <tr>
                  <td>No. : </td>
                  <td>{viewDocument[0]}</td>
                  <td>Submit Date :</td>
                  <td>{viewDocument[1]}</td>
                </tr>
                <tr>
                  <td>Title :</td>
                  <td>{viewDocument[2]}</td>
                  <td>Topic :</td>
                  <td>{viewDocument[3]}</td>
                </tr>
                <tr>
                  <td>Author Name :</td>
                  <td>{viewDocument[4]}</td>
                  <td>Author Remarks :</td>
                  <td><textarea value={viewDocument[5]} readOnly></textarea></td>
                </tr>
                <tr>
                  <td>Editor Name :</td>
                  <td>{viewDocument[6]}</td>
                  <td>Editor Remarks :</td>
                  <td><textarea value={viewDocument[7]} readOnly></textarea></td>
                </tr>
                <tr>
                  <td>Status :</td>
                  <td>{viewDocument[8]}</td>
                  <td>Print Date :</td>
                  <td>{viewDocument[9]}</td>
                </tr>
                <tr>
                  <td>Journal Issue :</td>
                  <td colSpan="3">{viewDocument[10]}</td>
                </tr>
                <tr>
                  <td colSpan="4"><button onClick={downloadDocument}>Download</button></td>
                </tr>
              </tbody>
            </table>
            <form target="_blank" method="post" id="downloadDocumentForm" action="http://localhost/jess-backend/processes/downloadDocument.php">
              <input type="hidden" name="documentID" id="documentID" value={viewDocument[0]}/>
            </form>
          </>}
          handleClose={handleOpen}
        />}
      </div>
    </div>
  );
};

export default AuthorTable;
