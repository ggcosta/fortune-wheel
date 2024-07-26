function getChancesArray2(data: any): number[] {
  let chances: number[] = [];

  data.forEach((item:any) => {
    chances.push(item.chance);
  });

  return chances;
}

function getIndexByChance(chances: number[]): number {
  const totalChance = chances.reduce((sum, chance) => sum + chance, 0);
  const randomNum = Math.random() * totalChance;

  let cumulativeChance = 0;
  for (let i = 0; i < chances.length; i++) {
    cumulativeChance += chances[i];
    if (randomNum <= cumulativeChance) {
      return i;
    }
  }

  return -1;
}

export { getIndexByChance, getChancesArray2 };