import { Meta } from "@storybook/react";
import React, { useRef } from "react";
import { Modal } from ".";
import { useDialog } from "../useDialog";

export default {
  title: "Dialog/Modal",
  component: Modal,
} as Meta;

export const Default = () => {
  const { isOpen, onOpen, onClose } = useDialog();

  const ref = useRef<HTMLButtonElement>(null);

  return (
    <div id="__next">
      <button onClick={onOpen} className="button">
        Open
      </button>
      <button ref={ref} className="button">
        Focused after closing
      </button>

      <Modal isOpen={isOpen} onClose={onClose} finalFocusRef={ref}>
        <div className="inner">
          <h2 id="title">Title</h2>
          <div>Contents</div>
          <button onClick={onClose} className="button">
            Close
          </button>
        </div>
      </Modal>

      <style jsx>{`
        .inner {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 300px;
        }

        .button {
          border: 1px solid black;
          border-radius: 3px;
          padding: 4px 6px;
          margin-right: 10px;
        }

        .button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
        }
      `}</style>
    </div>
  );
};
