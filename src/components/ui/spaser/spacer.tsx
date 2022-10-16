type Props = {
  space: string | number;
};

export const Spacer = (props: Props) => {
  const { space } = props;
  return <div style={{ padding: space }} />
};
