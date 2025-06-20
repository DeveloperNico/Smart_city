import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Button = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <StyledWrapper style={{ display: isVisible ? 'flex' : 'none' }}>
      <button className="button" onClick={scrollToTop}>
        <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#000000">
          <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;

  .button {
    height: 50px;
    width: 50px;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
    background-color: white;
    border: 2px solid #b00193;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    transition: all 0.5s;
    justify-content: center;
    align-items: center;
  }

  .button::after {
    content: "Top";
    position: absolute;
    width: auto;
    background-color: white;
    font-size: 1em;
    box-sizing: border-box;
    padding: 10px 15px;
    border-radius: 25px;
    top: -50px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    transition: all 0.5s;
    transform: scale(0);
    pointer-events: none;
  }

  .svg {
    transition: all 0.5s;
  }

  .button:hover {
    transform: translateY(-3px);
    background-color: #b00193;
  }

  .button:hover .svg {
    fill: white;
    transform: scale(1.2);
  }

  .button:hover::after {
    transform: scale(1);
  }

  .button:active {
    transform: translateY(2px);
  }
`;

export default Button;
