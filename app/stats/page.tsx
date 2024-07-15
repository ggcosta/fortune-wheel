import { getAwards } from "@/_actions/awardActions";
import AwardsList from "@/app/stats/AwardsList";

export default async function Stats() {
  const res = await getAwards();
  const awards = res.data;

  return (
    <div className="m-10">
      <AwardsList initialAwards={awards} />
    </div>
  );
}