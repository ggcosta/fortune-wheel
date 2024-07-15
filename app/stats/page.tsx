"use client";

import { useEffect, useState } from 'react';
import { getAwards, deleteAllAwards } from "@/_actions/awardActions";
import AwardsList from "@/app/stats/AwardsList";

export default function Stats() {
  const [awards, setAwards] = useState([]);

  const fetchAwards = async () => {
    const res = await getAwards();
    setAwards(res.data);
  }

  const handleDeleteAll = async () => {
    await deleteAllAwards();
    const res = await getAwards();
    setAwards([]);
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  return (
    <div className="m-10">
      <AwardsList awards={awards} />
      <button onClick={handleDeleteAll} className="mt-4 p-2 bg-red-500 text-white rounded">
            Delete All Stats
          </button>
    </div>
  );
}