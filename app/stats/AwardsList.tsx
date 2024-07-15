// components/AwardsList.js
"use client"; // This directive makes the component a Client Component

import { deleteAllAwards, getAwards } from "@/_actions/awardActions";
import { useState, useEffect } from 'react';

export default function AwardsList({ initialAwards }: { initialAwards: any[] }) {
  const [awards, setAwards] = useState(initialAwards);

  const handleDeleteAll = async () => {
    await deleteAllAwards();
    const res = await getAwards();
    setAwards(res.data);
  };

  return (
    <div className="m-10">
      {!awards ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {awards.map(
              (award: { _id: string; name: string; amountGiven: number }) => (
                <li key={award._id}>
                  {award.name}: {award.amountGiven}
                </li>
              )
            )}
          </ul>
          <button onClick={handleDeleteAll} className="mt-4 p-2 bg-red-500 text-white rounded">
            Delete All Stats
          </button>
        </>
      )}
    </div>
  );
}
