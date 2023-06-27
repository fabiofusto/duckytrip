"use client";

import { FC, useMemo } from "react";
import UserMenu from "./UserMenu";
import { User } from "@prisma/client";
import Categories from "./Categories";
import styled from "styled-components";
import { mediaQueries } from "@/lib/styled-components";
import { usePathname, useRouter } from "next/navigation";
import { Padding } from "@/styled-components/Padding.styled";
import Search from "./Search";
import GreenBar from "./GreenBar";

interface NavbarProps {
  currentUser?: User | null;
}

const NavbarWrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: 10;
  background-color: var(--backgroundColor);

  .divider {
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom-width: 2px;
    border-bottom-color: var(--dividerColor);
  }
`;

const UpperNavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mediaQueries("md")("gap: 0;")}
  ${mediaQueries("sm")("justify-content: space-between; width: 100wh;")}
`;

type ActionsProps = { isHome?: boolean };
const Actions = styled.div<ActionsProps>`
  width: ${(props) => (props.isHome ? "55%;" : "100%")}
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mediaQueries("md")("justify-content: space-between;")}
  gap: 0.5rem;
`;

const LogoText = styled.span`
  font-weight: 800;
  font-size: 1.5rem;
  line-height: 2rem;
  ${mediaQueries("md")("font-size: 1.875rem; line-height: 2.25rem;")}
  color: var(--iconColor);
  cursor: pointer;
`;

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = useMemo(() => pathname === "/", [pathname]);

  return (
    <NavbarWrapper>
      <GreenBar currentUser={currentUser} />
      <div className="divider">
        <Padding>
          <UpperNavbarWrapper>
            <LogoText onClick={() => router.push("/")}>DuckyTrip</LogoText>
            <Actions isHome={isHome}>
              {isHome && <Search />}
              <UserMenu currentUser={currentUser} />
            </Actions>
          </UpperNavbarWrapper>
        </Padding>
      </div>
      <Categories />
    </NavbarWrapper>
  );
};

export default Navbar;
