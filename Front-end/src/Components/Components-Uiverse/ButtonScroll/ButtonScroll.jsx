import React from 'react';
import styled from 'styled-components';

const Button = ({ onClick, className }) => {
  return (
    <StyledWrapper className={className} onClick={onClick}>
      <div className="main__action">
        <div className="main__scroll">
          <div className="main__scroll-box">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M11.9997 13.1716L7.04996 8.22186L5.63574 9.63607L11.9997 16L18.3637 9.63607L16.9495 8.22186L11.9997 13.1716Z" fill="rgba(255, 255, 255, 1)" />
            </svg>
          </div>
          <span className="main__scroll-text">About Us</span>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  cursor: pointer;
  z-index: 999;
  position: relative;

  .main__scroll {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .main__scroll-box {
    width: 40px;
    height: 40px;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  .main__scroll-text {
    color: rgba(255, 255, 255, 1);
    font-family: 'Poppins', sans-serif;
    font-size: 16px; /* menor */
  }

  .main__action:hover .main__scroll-box {
    animation: scroll-down 2s infinite;
  }

  @keyframes scroll-down {
    0%, 100% {
      transform: translateY(0rem);
      opacity: 1;
    }

    35% {
      transform: translateY(0.5rem);
      opacity: 0;
    }

    70% {
      transform: translateY(-0.5rem);
      opacity: 0;
    }
  }
`;

export default Button;
