import { ReactNode, useRef, VFC } from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";
import { useModal, UseModalProps } from "./useModal";

export type ModalProps = Omit<UseModalProps, "modalRef"> & {
  children: ReactNode;
};

const ModalPortal: VFC<ModalProps> = ({ children, ...props }) => {
  return props.isOpen
    ? ReactDom.createPortal(
        <ModalBox {...props}>{children}</ModalBox>,
        document.body
      )
    : null;
};

const ModalBox: VFC<ModalProps> = ({ children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  useModal({ ...props, modalRef: ref });

  return (
    <>
      <div className={styles.overlay} onClick={props.onClose} />
      <div role="dialog" aria-modal="true" className={styles.dialog} ref={ref}>
        {children}
      </div>
    </>
  );
};

export const Modal = ModalPortal;
