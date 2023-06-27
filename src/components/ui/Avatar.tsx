"use client";

import { FC } from "react";
import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      style={{ borderRadius: "var(--borderRadiusXl)" }}
      height="30"
      width="30"
      alt="avatar"
      src={src || "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
