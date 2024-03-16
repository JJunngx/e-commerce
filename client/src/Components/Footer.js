import React from "react";
import classes from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={`${classes.footer} d-flex align-items-center`}>
      <div className={`container d-flex  ${classes.list}`}>
        <div>
          <h6 className="text-white mb-3">CUSTOMER SERVICES</h6>
          <ul className="list-unstyled">
            <li>Help & contact Us</li>
            <li>Returns & Refunds</li>
            <li>Online Stores</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className={classes.marginList}>
          <h6 className="text-white mb-3">COMPANY</h6>
          <ul className="list-unstyled">
            <li>what We Do</li>
            <li>Avaiable Services</li>
            <li>Lasest Posts</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className={classes.marginList}>
          <h6 className="text-white mb-3">SOCIAL MEDIA</h6>
          <ul className="list-unstyled">
            <li>Twitter</li>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Pinterest</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
