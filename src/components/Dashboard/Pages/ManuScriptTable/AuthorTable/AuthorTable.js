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

  // GET - (WORKING FINE)
  useEffect(() => {
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
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
  }, []);

  // STANDARD GET REQUEST
  const viewDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&docID=D1`;
  const [viewData, setViewData] = useState([]);

  // GET - (WORKING FINE)
  useEffect(() => {
    fetch(viewDataUrl, {
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
        setViewData(data);
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  const [viewDocument, setViewDocument] = useState(null);
  console.log(viewDocument);

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
                  {viewData.map((item) =>
                    <td key={item.documentMetaDataObject.documentID}>{item.documentMetaDataObject.documentID}</td>
                  )}
                  <td>Submit Date :</td>
                  {viewData.map((item) =>
                    <td key={item.documentMetaDataObject.documentID}>{item.documentMetaDataObject.dateOfSubmission}</td>
                  )}
                </tr>
                <tr>
                  <td>Title :</td>
                  {viewData.map((item) =>
                    <td key={item.documentMetaDataObject.documentID}>{item.documentMetaDataObject.title}</td>
                  )}
                  <td>Topic :</td>
                  {viewData.map((item) =>
                    <td key={item.documentMetaDataObject.documentID}>{item.documentMetaDataObject.topic}</td>
                  )}
                </tr>
                <tr>
                  <td>Author Name :</td>
                  {viewData.map((item) =>
                    <td key={item.documentMetaDataObject.documentID}>{item.documentMetaDataObject.authorUsername}</td>
                  )}
                  <td>Author Remarks :</td>
                  {viewData.map((item) =>
                    <td key={item.documentMetaDataObject.documentID}><textarea readOnly>{item.documentMetaDataObject.authorRemarks}</textarea></td>
                  )}
                </tr>
                <tr>
                  <td>Editor Name :</td>
                  {viewData.map((item) =>
                    <td key={item.documentMetaDataObject.documentID}>{item.documentMetaDataObject.editorID}</td>
                  )}
                  <td>Editor Remarks :</td>
                  {viewData.map((item) =>
                    <td key={item.documentMetaDataObject.documentID}><textarea readOnly>{item.documentMetaDataObject.editorRemarks}</textarea></td>
                  )}
                </tr>
                <tr>
                  <td>Status :</td>
                  {viewData.map((item) =>
                    <td key={item.documentMetaDataObject.documentID}>{item.documentMetaDataObject.documentStatus}</td>
                  )}
                  <td>Print Date :</td>
                  {viewData.map((item) =>
                    <td key={item.documentMetaDataObject.documentID}>{item.documentMetaDataObject.printDate}</td>
                  )}
                </tr>
                <tr>
                  <td>Journal Issue :</td>
                  {viewData.map((item) =>
                    <td key={item.documentMetaDataObject.documentID} colSpan="3"><textarea readOnly>{item.documentMetaDataObject.journalIssue}</textarea></td>
                  )}
                </tr>
              </tbody>
            </table>
          </>}
          handleClose={handleOpen}
        />}
      </div>
    </div>
  );
};

export default AuthorTable;
