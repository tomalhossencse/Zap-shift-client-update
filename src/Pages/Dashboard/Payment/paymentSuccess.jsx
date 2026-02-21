import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../../hooks/useAxios";
const PaymentSuccess = () => {
  const axiosSecure = useAxios();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => console.log(res.data));
    }
  }, [sessionId, axiosSecure]);

  return (
    <div>
      <h2 className="text-5xl text-green-500">Payment Successful</h2>
    </div>
  );
};

export default PaymentSuccess;
