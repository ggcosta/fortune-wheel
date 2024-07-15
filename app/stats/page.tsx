"use client";

import { useState, useEffect } from "react";

export default function Stats() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{ name: string; amountGiven: number }[]>([]);
  
  const fetchData = async () => {
    try {
      const response = await fetch("/api/prizes", {
        headers: {
          Accept: "application/json",
          method: "GET",
        },
      });
      if (response) {
        const data = await response.json();
        console.log(data);
        setStats(data.prizes_given);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAllPrizes = async () => {
    try {
      const response = await fetch("/api/prizes", {
        method: "DELETE",
      });
      const data = await response.json();
      setStats(data.prizes_given);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-10">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {stats.map((item, index) => (
            <li key={index}>
              {item.name}: {item.amountGiven}
            </li>
          ))}
        </ul>
        
      )}
      <button className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={deleteAllPrizes}>Delete All Prizes</button>
    </div>
  );
}
