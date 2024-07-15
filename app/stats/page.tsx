"use client";

import { useEffect, useState } from 'react';
import { getAwards } from "@/_actions/awardActions";
import AwardsList from "@/app/stats/AwardsList";

export default function Stats() {
  const [awards, setAwards] = useState([]);

  const fetchAwards = async () => {
    const res = await getAwards();
    setAwards(res.data);
  }

  useEffect(() => {
    fetchAwards();
  }, []);

  return (
    <div className="m-10">
      <AwardsList awards={awards} />
    </div>
  );
}