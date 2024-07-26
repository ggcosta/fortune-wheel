"use client";

import { useState } from "react";
import { editAwardStock, editAwardChance } from "@/_actions/awardActions";

export default function AwardCard ({ award }: { award: any }) {
  const [stockAmount, setStockAmount] = useState(award.stockAmount || 0);
  const [newStockAmount, setNewStockAmount] = useState(award.stockAmount || 0);
  const [chance, setChance] = useState(award.chanceWeight || 0);
  const [newChance, setNewChance] = useState(award.chanceWeight || 0);


  const handleStockInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStockAmount(Number(e.target.value));
  }

  const handleChanceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChance(Number(e.target.value));
  }

  const handleEditStock = async (id: string, stockAmount: number) => {
    await editAwardStock(id, stockAmount);
    setStockAmount(newStockAmount);
  }

  const handleEditChance = async (id: string, chance: number) => {
    await editAwardChance(id, chance);
    setChance(newChance);
  }

  return (
    <div className="border-2 border-gray-300 p-5 my-5 rounded-2xl">
      <h1 className="font-bold">{award.name}</h1>
      <p>Amount given: {award.amountGiven}</p>
      <p>Stock amount: {stockAmount}</p>
      <p>Chance Weight: {chance}</p>
      <input
        className="w-20 border-4 border-blue-200 mr-2"
        type="number"
        value={newStockAmount}
        onChange={handleStockInputChange}
      />
      <button className="text-blue-500" onClick={() => {handleEditStock(award._id, newStockAmount)}}>Edit Stock</button>
      <br />
      <input
        className="w-20 border-4 border-blue-200 mr-2"
        type="number"
        value={newChance}
        onChange={handleChanceInputChange}
      />
      <button className="text-blue-500" onClick={() => {handleEditChance(award._id, newChance)}}>Edit Chance</button>
    </div>
  );

}