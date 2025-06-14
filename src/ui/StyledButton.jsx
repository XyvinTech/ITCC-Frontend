import React from "react";
import styled, { css } from "styled-components";

const buttonVariants = css`
  ${(props) =>
    props.variant === "primary" &&
    css`
      border: none;
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
      background-color: #2d9cdb;
      radius: 5px;
    `}
  ${(props) =>
    props.variant === "tab" &&
    css`
      border: 1px solid #d1d1d1;
      font-size: 16px;
      font-weight: 400;
      color: #4a4647;
      background-color: transparent;
      radius: 5px;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: #f5f5f5;
      }
    `}

  ${(props) =>
    props.variant === "secondary" &&
    css`
      border: none;
      font-family: Inter;
      font-size: 16px;
      font-weight: 400;
      color: #4a4647;
      background-color: #f3efef;
      radius: 5px;
    `}


${(props) =>
    props.variant === "third" &&
    css`
      font-family: Inter;
      border: 1px solid red;
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      background-color: red;
      radius: 5px;
    `}
    ${(props) =>
    props.variant === "preview" &&
    css`
      border: none;
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
      background-color: #0c1e8a;
      radius: 5px;
    `}
`;

const disabledStyles = css`
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;

const ButtonContainer = styled.button`
  padding: 10px 20px;
  text-align: center;
  font-family: "Inter", "sans-serif";
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  ${buttonVariants}
  ${disabledStyles}
`;

export const StyledButton = ({
  name,
  variant,
  color,
  onClick,
  disabled,
  type,
}) => {
  return (
    <ButtonContainer
      variant={variant}
      color={color}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {name}
    </ButtonContainer>
  );
};
