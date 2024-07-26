"use client";

import { getAwards } from "@/_actions/awardActions";
import { useEffect, useState } from "react";

export default function Stock() {
  const [awards, setAwards] = useState([]);

  const fetchAwards = async () => {
    const res = await getAwards();
    setAwards(res.data);
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  return (
    <div className="m-10">
      {awards.length > 0 ? (
        <>
          <ul>
            {awards.map(
              (award: {
                _id: string;
                name: string;
                amountGiven: number;
                stockAmount: number;
              }) => (
                <li key={award._id}>
                  {award.name}: {award.stockAmount ? award.stockAmount : "?"}
                  <button className="ml-5 text-blue-500">Edit</button>
                </li>
              )
            )}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
