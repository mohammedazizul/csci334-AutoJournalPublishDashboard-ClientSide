import React, { useState } from "react";
import EditorAuthorTable from "./EditorAuthorTable/EditorAuthorTable";
import ReviewerTable from "./ReviewerTable/ReviewerTable";

const ManuScriptTable = () => {
  const [isReviewer, setIsReviewer] = useState(false);
  console.log("isReviewer: ", isReviewer);

  return (
    <div>
      <button onClick={() => setIsReviewer(true)}>Show Reviewer</button>
      {/* condition for reviewer */}
      {isReviewer && <ReviewerTable />}

      <EditorAuthorTable />
    </div>
  );
};

export default ManuScriptTable;
