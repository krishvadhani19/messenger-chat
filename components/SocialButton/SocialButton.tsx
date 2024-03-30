import React from "react";
import "./SocialButton.scss";

type SocialButtonProps = {
  icon: JSX.Element;
  onClick: () => void;
};

const SocialButton = ({ icon, onClick }: SocialButtonProps) => {
  return (
    <div className="social-button-container" onClick={onClick}>
      {icon}
    </div>
  );
};

export default SocialButton;
