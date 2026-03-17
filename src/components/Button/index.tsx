import React from "react";

import { TButtonTypes } from "@/constants/types";

import { ButtonContent, StyledButton } from "./styled";

interface IButtonProps extends React.ComponentProps<"button"> {
  isLoading?: boolean;
  loading?: boolean;
  variant?: TButtonTypes;
  type?: "button" | "submit" | "reset";
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    { children, variant = "primary", type = "button", loading, ...rest },
    ref,
  ) => {
    return (
      <StyledButton type={type} $variant={variant} {...rest} ref={ref}>
        {!loading}
        {children && <ButtonContent>{children}</ButtonContent>}
      </StyledButton>
    );
  },
);

export default React.memo(Button);
