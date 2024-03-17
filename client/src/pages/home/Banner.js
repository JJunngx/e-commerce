import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Button from "react-bootstrap/Button";

const StyledDive = styled.div`
  position: absolute;
  top: 50%;
  left: 60px;
  transform: translate(0, -50%);
  width: 400px;
`;
const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="position-relative fst-italic">
      <img
        src={`https://asm3-njs-tongthe.onrender.com/images/banner1.jpg`}
        alt="banner1"
        className="w-100 "
      />
      <StyledDive>
        <p className="text-uppercase text-body-tertiary">
          new inspiration 2020
        </p>
        <h1 className="text-uppercase">20% off on new season</h1>

        <Button
          variant="dark"
          onClick={() => navigate("/shop")}
          className="rounded-0 fst-italic"
        >
          Browse collections
        </Button>
      </StyledDive>
    </div>
  );
};

export default Banner;
