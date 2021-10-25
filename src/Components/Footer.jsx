import React from "react";

function Footer() {
  return (
    <footer className="bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-5 col-sm-12">
            <div>
              <div className="footer-logo">
                <h2>BuyLocal.online</h2>
              </div>
              <p>
                <strong>Email: </strong>
                <a href="mailto:website@domain.com">info@buylocal.online</a>
              </p>
            </div>
          </div>
          <div className="col-lg-8 col-md-7 col-sm-12">
            <div className="row">
              <div className="col-md-6 col-lg-4 col-sm-6">
                <h6>Abouts us</h6>
                <ul>
                  <li>
                    <a href="">Businesses</a>
                  </li>
                  <li>
                    <a href="">Consumeres</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 col-lg-4 col-sm-6">
                <h6>Be more Visible Solutions</h6>
                <ul>
                  <li>
                    <a href="">Getting Started</a>
                  </li>
                  <li>
                    <a href="">Services</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 col-lg-4">
                <h6>FAQ</h6>
                <ul>
                  <li>
                    <a href="">Business</a>
                  </li>
                  <li>
                    <a href="">Consumers</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
