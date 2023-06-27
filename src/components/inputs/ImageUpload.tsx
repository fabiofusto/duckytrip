/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FC, useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";
import styled from "styled-components";

declare global {
  // eslint-disable-next-line no-var
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUploadBox = styled.div`
  position: relative;
  cursor: pointer;

  border-style: dashed;
  border-width: 2px;
  border-color: var(--iconSecondaryColor);

  padding: 5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--iconSecondaryColor);

  .label {
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 1.75rem;
  }

  .image-wrapper {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;

    .image {
      object-fit: cover;
    }
  }

  transition: color 150ms;
  &:hover {
    border-color: var(--textColor);
    color: var(--textColor);
  }
`;

const ImageUpload: FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="rpg0ma6q"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <ImageUploadBox onClick={() => open?.()}>
            <TbPhotoPlus size={50} />
            <div className="label">Click to upload</div>
            {value && (
              <div className="image-wrapper">
                <Image alt="upload" fill src={value} className="image" />
              </div>
            )}
          </ImageUploadBox>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
