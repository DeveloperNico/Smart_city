import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="loader" />
        <div className="loader" />
        <div className="loader" />
      </div>
      <p>Loading informations...</p>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30vh;
  text-align: center;

  .container {
    position: relative;
    width: 160px;
    height: 120px;
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
    width: 160px;
    height: 100px;
    margin-left: -80px;
    margin-top: -50px;
    border-radius: 5px;
    background: #07144e;
    animation: dot1_ 3s cubic-bezier(0.55,0.3,0.24,0.99) infinite;
  }

  .loader:nth-child(2) {
    z-index: 11;
    width: 150px;
    height: 90px;
    margin-top: -45px;
    margin-left: -75px;
    border-radius: 3px;
    background: #3c517d;
    animation-name: dot2_;
  }

  .loader:nth-child(3) {
    z-index: 12;
    width: 40px;
    height: 20px;
    margin-top: 50px;
    margin-left: -20px;
    border-radius: 0 0 5px 5px;
    background: rgb(63, 132, 160);
    animation-name: dot3_;
  }

  p {
    margin-top: 40px;
    color: #000;
    font-size: 18px;
    font-weight: bold;
  }

  @keyframes dot1_ {
    3%,97% {
      width: 160px;
      height: 100px;
      margin-top: -50px;
      margin-left: -80px;
    }

    30%,36% {
      width: 80px;
      height: 120px;
      margin-top: -60px;
      margin-left: -40px;
    }

    63%,69% {
      width: 40px;
      height: 80px;
      margin-top: -40px;
      margin-left: -20px;
    }
  }

  @keyframes dot2_ {
    3%,97% {
      height: 90px;
      width: 150px;
      margin-left: -75px;
      margin-top: -45px;
    }

    30%,36% {
      width: 70px;
      height: 96px;
      margin-left: -35px;
      margin-top: -48px;
    }

    63%,69% {
      width: 32px;
      height: 60px;
      margin-left: -16px;
      margin-top: -30px;
    }
  }

  @keyframes dot3_ {
    3%,97% {
      height: 20px;
      width: 40px;
      margin-left: -20px;
      margin-top: 50px;
    }

    30%,36% {
      width: 8px;
      height: 8px;
      margin-left: -5px;
      margin-top: 49px;
      border-radius: 8px;
    }

    63%,69% {
      width: 16px;
      height: 4px;
      margin-left: -8px;
      margin-top: -37px;
      border-radius: 10px;
    }
  }
`;

export default Loader;
