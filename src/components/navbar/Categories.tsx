"use client";

import { FC } from "react";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/constants/categories";
import styled from "styled-components";
import { Padding } from "@/styled-components/Padding.styled";

const CategoriesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
`;

const Categories: FC = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  return (
    <>
      {pathname === "/" && (
        <Padding>
          <CategoriesWrapper>
            {categories.map((item) => (
              <CategoryBox
                key={item.label}
                label={item.label}
                icon={item.icon}
                selected={category === item.label}
              />
            ))}
          </CategoriesWrapper>
        </Padding>
      )}
    </>
  );
};

export default Categories;
