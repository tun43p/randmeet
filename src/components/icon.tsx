import styled from "styled-components";

type Props = {
  color: IconColor;
  icon: React.ReactNode;
};

export enum IconColor {
  blue = "blue",
  green = "green",
  purple = "purple",
  red = "red",
}

export default function IconComponent({ color, icon }: Props) {
  return <StyledIcon className={`icon-${color}`}>{icon}</StyledIcon>;
}

const StyledIcon = styled.div`
  display: flex;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;

  & svg {
    color: white;
    width: 1rem;
    height: 1rem;
  }

  &.icon-blue {
    background: linear-gradient(180deg, #38adef 0%, #2c5f7b 100%);
  }

  &.icon-green {
    background: linear-gradient(180deg, #37e6b1 0%, #2b755f 100%);
  }

  &.icon-purple {
    background: linear-gradient(180deg, #c853a7 0%, #6b1c42 100%);
  }

  &.icon-red {
    background: linear-gradient(180deg, #ea3333 0%, #883636 100%);
  }
`;
