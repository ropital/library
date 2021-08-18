import { ComponentProps, ReactNode, VFC } from "react";
import { Droppable as BDroppable } from "react-beautiful-dnd";

type Props = Omit<ComponentProps<typeof BDroppable>, "children"> & {
  className?: string;
  children: ReactNode;
};

export const Droppable: VFC<Props> = ({ children, className, ...props }) => {
  return (
    <BDroppable {...props}>
      {(provided) => (
        <div
          className={className}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </BDroppable>
  );
};
