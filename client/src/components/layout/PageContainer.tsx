import React from "react";
import { useLocation } from "react-router-dom";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = "",
}) => {
  const location = useLocation();
  const isEventDetail = /^\/events\/[^/]+$/.test(location.pathname); // matches /events/:id

  return (
    <div
      className={`
        bg-dark-4 
        mx-auto w-full 
        md:max-w-5xl md:px-8 md:py-8 
        px-4 py-6 
        transition-colors duration-300 
        h-full relative flex-1  flex-col 
        ${className} ${isEventDetail ? "flex" : ""}
      `} //flex - children's full width
    >
      {children}
    </div>
  );
};
