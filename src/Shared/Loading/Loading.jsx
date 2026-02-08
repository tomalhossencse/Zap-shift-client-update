import React from "react";
import Container from "../../Utility/Container";
import { DNA } from "react-loader-spinner";

const Loading = () => {
  return (
    <Container
      className={"min-h-screen text-center items-center flex justify-center"}
    >
      {/* <span className="loading loading-infinity loading-2xl text-6xl"></span> */}

      <DNA
        visible={true}
        height="120"
        width="120"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </Container>
  );
};

export default Loading;
