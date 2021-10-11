import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

function WelcomePage() {
  return (
    <div>
      <Container>
        <Button>
          <Link to="/login" replace>
            Register UserAcc
          </Link>
        </Button>
        <Button>
          <Link to="/register-business" replace>
            Register UserAcc
          </Link>
        </Button>
        <Button>
          <Link to="/register-user" replace>
            Register UserAcc
          </Link>
        </Button>
        <Button>
          <Link to="/home" replace>
            Continue without Login
          </Link>
        </Button>
      </Container>
    </div>
  );
}

export default withRouter(WelcomePage);
