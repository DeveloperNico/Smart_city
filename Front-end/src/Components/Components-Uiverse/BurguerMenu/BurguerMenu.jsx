import React from 'react';
import styled from 'styled-components';

const Checkbox = ({ isOpen, onClick }) => {
  return (
    <StyledWrapper onClick={onClick}>
      <label className="burger" htmlFor="burger">
        <span className={isOpen ? 'open' : ''} />
        <span className={isOpen ? 'open' : ''} />
        <span className={isOpen ? 'open' : ''} />
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .burger {
    position: relative;
    width: 40px;
    height: 30px;
    background: transparent;
    cursor: pointer;
    display: block;
  }

  .burger span {
    display: block;
    position: absolute;
    height: 4px;
    width: 100%;
    background: black;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
  }

  .burger span:nth-of-type(1) {
    top: 0px;
    transform-origin: left center;
  }

  .burger span:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left center;
  }

  .burger span:nth-of-type(3) {
    top: 100%;
    transform-origin: left center;
    transform: translateY(-100%);
  }

  .burger span.open:nth-of-type(1) {
    transform: rotate(45deg);
    top: 0px;
    left: 5px;
  }

  .burger span.open:nth-of-type(2) {
    width: 0%;
    opacity: 0;
  }

  .burger span.open:nth-of-type(3) {
    transform: rotate(-45deg);
    top: 28px;
    left: 5px;
  }
`;

export default Checkbox;
