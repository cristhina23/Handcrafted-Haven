import React from "react";

interface ContainerProps {
  class1?: string;
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ class1 = "", children }) => {
  return (
    <section className={class1}>
      <div className="container-xl">{children}</div>
    </section>
  );
};

export default Container;
