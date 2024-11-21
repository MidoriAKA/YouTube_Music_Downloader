import { useState } from "react";
import { GenButton } from "@generic/GenButton";

export const App = () => {

  return (
    <div className="container">
      <h1>Download Music</h1>
      <GenButton
        text="Download"
        onClick={() => {
          console.log("Download button clicked.");
        }}
      />
    </div>
  );
};
