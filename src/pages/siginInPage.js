import React from "react";
import SignIn from "../components/signIn";
import FallingSquares from "../components/background";
import Container from "@mui/material/Container";

function SignInPage() {
  return (
    <div className="App">
      <header className="App-header">
        <FallingSquares />

        <Container maxWidth="sm" sx={{ zIndex: 2 }}>
          <SignIn />
        </Container>
      </header>
    </div>
  );
}

export default SignInPage;
