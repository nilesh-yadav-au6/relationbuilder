import React from "react";
import UserTable from "./UserTable";
import Relation from "./Relation";
import Result from "./Result";

function HomePage() {
  return (
    <>
      <div className="homepage">
        <div>
          <UserTable />
        </div>
        <div>
          <Relation />
        </div>
        <Result />
      </div>
    </>
  );
}

export default HomePage;
