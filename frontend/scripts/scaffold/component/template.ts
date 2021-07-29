export const createComponentTemplate = (name: string): string =>
  `import { memo, VFC } from "react";
type Props = {};

const Component: VFC<Props> = ({}) => <div>${name}</div>;

export const ${name} = memo(Component);
`

export const createStorybookTemplate = (
  path: string,
  name: string
): string => `import { Meta } from "@storybook/react";
import { ${name} } from ".";

export default {
  title: "${path}/${name}",
  component: ${name},
} as Meta;

export const Default = () => (
  <div className="container">
    <${name} />

    <style jsx>{\`
      .container {
      }
    \`}</style>
  </div>
);
`

export const createIndexTemplate = (name: string): string =>
  `export * from "./${name}";
`
