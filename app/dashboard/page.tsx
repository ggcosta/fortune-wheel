"use client";

import { useEffect, useState } from "react";
import { getAwards, resetAllAwardsGiven, deleteAllAwards } from "@/_actions/awardActions";
import AwardsList from "@/app/dashboard/AwardsList";

export default function Dashboard() {
  const [awards, setAwards] = useState([]);

  const fetchAwards = async () => {
    const res = await getAwards();
    setAwards(res.data);
  };

  const handleResetAll = async () => {
    await resetAllAwardsGiven();
    const res = await getAwards();
    setAwards(res.data);
  };

  const handleDeleteAll = async () => {
    await deleteAllAwards();
    const res = await getAwards();
    setAwards(res.data);
  }

  useEffect(() => {
    fetchAwards();
  }, []);

  return (
    <div className="m-10">
      {awards.length > 0 ? (
        <>
          <AwardsList awards={awards} />
          <button
            onClick={handleResetAll}
            className="mt-4 p-2 bg-red-500 text-white rounded"
          >
            Reset amounts given
          </button>
          <button
            onClick={handleDeleteAll}
            className="mt-4 ml-5 p-2 bg-red-500 text-white rounded"
          >
            Delete all awards
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
