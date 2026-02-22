import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h1>This payment history page</h1>
      <h2 className="text-5xl text-green-400">
        Payment History : {payments.length}
      </h2>
      <div className="m-6">
        <div className="overflow-x-auto bg-base-100 rounded-md p-4">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Parcel Info</th>
                <th>Recipient Info</th>
                <th>Tracking Number</th>
                <th>Payment Info</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay, index) => (
                <tr key={pay._id}>
                  <th>{index + 1}</th>
                  <td>{pay.parcelName}</td>
                  <td>{pay.customerEmail}</td>
                  <td>{pay.trackingId}</td>
                  <td>{pay.amount} tk</td>
                  <td>
                    <button className="btn">Action</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
