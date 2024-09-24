import React from "react";

const Title2 = ({ content, className }) => {
  return (
    <>
      <h2 className={`text-xl font-medium font-serif mb-3 ${className}`}>
        {content}
      </h2>
    </>
  );
};

export default Title2;
