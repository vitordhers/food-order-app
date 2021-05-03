import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export default interface IconProps extends FontAwesomeIconProps {
  color?: string;
  slot?: "start" | "end";
}
