import React, { ComponentProps, ReactNode, VFC } from "react";
import { Draggable as BDraggable } from "react-beautiful-dnd";

type Props = Omit<ComponentProps<typeof BDraggable>, "children"> & {
  className?: string;
  children: ReactNode;
};

export const Draggable: VFC<Props> = ({ className, children, ...props }) => {
  return (
    <BDraggable {...props}>
      {(provided) => (
        <div
          className={className}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </BDraggable>
  );
};
