import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../../hooks/useAxios";
const PaymentSuccess = () => {
  const axiosSecure = useAxios();
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div>
      <h2 className="text-5xl text-green-500">Payment Successful</h2>
      <p>TransactionId : {paymentInfo?.transactionId} </p>
      <p>TrackingId : {paymentInfo?.trackingId} </p>
    </div>
  );
};

export default PaymentSuccess;
