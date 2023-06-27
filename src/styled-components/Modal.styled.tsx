import { mediaQueries } from "@/lib/styled-components";
import styled from "styled-components";

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  overflow-y: auto;
  overflow-x: hidden;

  position: fixed;
  inset: 0px;

  z-index: 50;

  outline: 2px solid transparent;
  outline-offset: 2px;

  background-color: rgb(50 50 50 / 0.7);

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  .modal-container {
    position: relative;

    width: 100%;
    ${mediaQueries("lg")("width: 50%;")}
    ${mediaQueries("xl")("width: 40%;")}

    margin: 1.5rem auto:

    height: 100%;
    ${mediaQueries("lg")("height: auto;")}
    ${mediaQueries("md")("height: auto;")}
  }

  .modal-content {
    height: 100%;
    ${mediaQueries("lg")("height: auto;")}
    ${mediaQueries("md")("height: auto;")}

    border-width: 0;
    border-radius: var(--borderRadiusLg);

    position: relative;

    display: flex;
    flex-direction: column;

    width: 100%;

    outline: 2px solid transparent;
    outline-offset: 2px;

    background-color: var(--backgroundColor);

    &:focus {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1.5rem;

    border-bottom-width: 1px;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    border-bottom-color: var(--dividerColor);

    position: relative;

    .close-button {
      position: absolute;
      left: 2.25rem;

      padding: 0.25rem;

      border-width: 0;

      color: var(--textColor);
      transition: all 150ms;

      &:hover {
        color: var(--errorColor);
        scale: 1.1;
      }
    }

    .title {
      font-size: 1.125rem;
      line-height: 1.75rem;
      font-weight: 600;
      color: var(--textColor);
    }
  }

  .modal-body {
    position: relative;

    padding: 1.5rem;

    flex: 1 1 auto;
  }

  .modal-footer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.5rem;

    .button-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 100%;
    }
  }
`;

export const SearchModalBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .calendar-container {
    background-color: white;

    border-radius: 0.75rem;
    border-width: 1px;
    border-color: var(--borderColor);

    overflow: hidden;
  }
`;

export const AuthModalContainer = styled.div<{ marginTop?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${(props) => props.marginTop && "margin-top: 0.75rem;"}

  .footer-content {
    color: var(--textColor);
    text-align: center;
    margin-top: 1rem;
    font-weight: 300;
    color: var(--iconSecondaryHoverColor);

    span {
      color: var(--textColor);
      cursor: pointer;
      &:hover {
        text-decoration-line: underline;
      }
    }
  }
`;

export const RentModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    ${mediaQueries("md")("grid-template-columns: repeat(2, minmax(0, 1fr));")};
    gap: 0.75rem;
    max-height: 50vh;
    overflow-y: auto;

    .category-grid-item {
      grid-column: span 1 / span 1;
    }
  }
`;

export const ReserveModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .calendar-container {
    background-color: white;

    border-radius: 0.75rem;
    border-width: 1px;
    border-color: var(--borderColor);

    overflow: hidden;

    .price-container {
      padding: 1rem;

      display: flex;
      align-items: center;
      justify-content: space-between;

      font-weight: 600;
      font-size: 1.125rem;
      line-height: 1.75rem;
    }
  }
`;
