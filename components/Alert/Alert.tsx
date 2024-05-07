// file imports
import "./alert.scss";
import { FORM_STATUS } from "@/constants/auth-constants";

// module imports
import classNames from "classnames";
import { FaCircleCheck } from "react-icons/fa6";
import { TbAlertTriangle } from "react-icons/tb";

interface AlertPropsType {
  type: "success" | "error";
  message: string;
}

const Alert = ({ message, type }: AlertPropsType) => {
  const isError = type === FORM_STATUS.ERROR;
  return (
    <div className={classNames("alert-container", { isError })}>
      {isError ? <TbAlertTriangle size={18} /> : <FaCircleCheck size={18} />}

      <div>{message}</div>
    </div>
  );
};

export default Alert;
