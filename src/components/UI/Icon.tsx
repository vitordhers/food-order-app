import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import IconProps from "./IconProps.interface";

const Icon: React.FC<IconProps> = ({ icon }) => {
  const faIcon = require(`@fortawesome/free-brands-svg-icons/${icon}`);
  console.log(icon);
  return <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>;
};

export default Icon;
