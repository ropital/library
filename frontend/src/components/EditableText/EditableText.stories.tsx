import { Meta } from "@storybook/react";
import { EditableText } from ".";

export default {
  title: "EditableText/EditableText",
  component: EditableText,
} as Meta;

export const Default = () => (
  <div className="container">
    <EditableText />

    <style jsx>{`
      .container {
      }
    `}</style>
  </div>
);
