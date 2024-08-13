import React from "react";
import SetProfile from "../components/setProfile";
import FallingSquares from "../components/background";
import Container from "@mui/material/Container";

function SetProfilePage() {
  return (
    <div className="App">
      <header className="App-header">
        <FallingSquares />

        <Container maxWidth="sm" sx={{ zIndex: 2 }}>
          <SetProfile />
        </Container>
      </header>
    </div>
  );
}

export default SetProfilePage;
