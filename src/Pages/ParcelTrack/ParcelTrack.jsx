import React from "react";
import { useParams } from "react-router";
import Container from "../../Utility/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { DateFormat } from "../../Utility/DateFormat";

const ParcelTrack = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxiosInstance();

  const { data: trackings = [] } = useQuery({
    queryKey: ["trackings", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
  });
  return (
    <Container className="h-screen p-8">
      <h2 className="text-3xl text-warning font-bold">
        Track Your Package : {trackingId}
      </h2>
      <h3>Log for : {trackings.length}</h3>
      <ul className="timeline timeline-vertical">
        {trackings.map((track) => (
          <li key={track._id}>
            <div className="timeline-start">{DateFormat(track?.createAt)}</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end timeline-box text-xl text-black">
              {track?.details}
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default ParcelTrack;
