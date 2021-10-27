import React, { useState } from "react";
import EditorAuthorTable from "./EditorAuthorTable/EditorAuthorTable";
import ReviewerTable from "./ReviewerTable/ReviewerTable";

const ManuScriptTable = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>Dashboard Toggle</button>
      {/* condition for reviewer */}
      {toggle?<ReviewerTable />:<EditorAuthorTable />}

    </div>
  );
};

export default ManuScriptTable;
