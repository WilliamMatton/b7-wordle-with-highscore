import type { FC } from "react";

type Props = {
  msg : string;
};

const ErrorMsg : FC<Props> = ({ msg }) => {
  return(
    <small className="optionsError">{msg}</small>
  );
}

export default ErrorMsg;