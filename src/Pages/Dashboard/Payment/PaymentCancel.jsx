import React from "react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div>
      <h1 className="text-4xl text-red-500">
        Payment Cancelled.Please Try Again
      </h1>
      <Link to={"/dashboard/my-parcels"}>
        <button className="btn btn-primary">Try Again</button>
      </Link>
    </div>
  );
};

export default PaymentCancel;
