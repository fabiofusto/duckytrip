import useLoginModal from "@/hooks/modals/useLoginModal";
import useRegisterModal from "@/hooks/modals/useRegisterModal";
import { User } from "@prisma/client";
import { FC } from "react";
import { BiUserPlus } from "react-icons/bi";
import { MdLogin } from "react-icons/md";
import styled from "styled-components";

interface GreenBarProps {
  currentUser?: User | null;
}

const GreenBarStyled = styled.div`
  width: 100%;
  height: 30px;
  background-color: var(--iconColor);

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  padding-right: 50px;

  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    color: var(--textColor);
    transition: all 150ms;

    &:hover {
      scale: 1.05;
    }
  }

  .sign-in {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    color: var(--textColor);
    transition: all 150ms;

    &:hover {
      scale: 1.05;
    }
  }

  .user-hello {
    font-weight: 600;
    color: var(--textColor);
  }
`;

const GreenBar: FC<GreenBarProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  return (
    <GreenBarStyled>
      {currentUser ? (
        <div className="user-hello"> Welcome back, {currentUser.name}</div>
      ) : (
        <>
          <div className="login" onClick={loginModal.onOpen}>
            <MdLogin size={22} />
            <span className="login-text">Login</span>
          </div>
          <div className="sign-in" onClick={registerModal.onOpen}>
            <BiUserPlus size={22} />
            <span className="sign-in-text">Sign in</span>
          </div>
        </>
      )}
    </GreenBarStyled>
  );
};

export default GreenBar;
