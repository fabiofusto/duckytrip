"use client";

import clsx from "clsx";
import { FC, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../ui/Button";
import { ModalBackground } from "@/styled-components/Modal.styled";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState<boolean>(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      <ModalBackground onClick={handleClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          {/*content*/}
          <div
            className={clsx(
              "translate duration-300 h-full",
              showModal ? "translate-y-0" : "translate-y-full",
              showModal ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="translate modal-content">
              {/*header*/}
              <div className="modal-header">
                <button onClick={handleClose} className="close-button">
                  <IoMdClose size={18} />
                </button>
                <div className="title">{title}</div>
              </div>
              {/*body*/}
              <div className="modal-body">{body}</div>
              {/*footer*/}
              <div className="modal-footer">
                <div className="button-container">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      variant="outline"
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </ModalBackground>
    </>
  );
};

export default Modal;
