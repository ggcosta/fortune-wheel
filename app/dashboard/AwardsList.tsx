"use client";

import AwardCard from "@/app/dashboard/AwardCard";

export default function AwardsList({ awards }: { awards: any }) {
  return (
    <div className="flex flex-row flex-wrap justify-between">
        {awards.map(
          (award: {
            _id: string;
            name: string;
            amountGiven: number;
            stockAmount: number;
          }) => (
            <div key={award._id}>
              <AwardCard award={award} />
            </div>
          )
        )}
    </div>
  );
}
