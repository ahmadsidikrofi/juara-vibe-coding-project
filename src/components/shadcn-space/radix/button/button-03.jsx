import React, { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ButtonShineHoverDemo = forwardRef(({ text, className, icon, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      {...props}
      className={cn("text-white bg-blue-500 hover:bg-blue-500/80 relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] cursor-pointer", className)}>
      {icon} {text}
    </Button>
  );
});

ButtonShineHoverDemo.displayName = "ButtonShineHoverDemo";

export default ButtonShineHoverDemo;
