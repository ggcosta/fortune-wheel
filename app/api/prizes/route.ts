import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "prizes.json");

const readPrizes = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}));
  }
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

const writePrizes = (prizes: any) => {
  fs.writeFileSync(filePath, JSON.stringify(prizes, null, 2));
};


export async function GET() {
  const prizes = readPrizes();
  return NextResponse.json(prizes);
};

export async function POST(request: Request) {
  const prizes = readPrizes();

  try {
    const { prize } = await request.json();
    console.log(prize);
    const prizeIndex = prizes.prizes_given.findIndex((item: any) => item.name === prize);
    console.log("test1")
    if (prizeIndex !== -1) {
      prizes.prizes_given[prizeIndex].amountGiven += 1;
    } else {
      prizes.prizes_given.push({ name: prize, amountGiven: 1 });
    }
    console.log("test2")
    writePrizes(prizes);
    console.log("test3")
    return NextResponse.json(prizes);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}

export async function DELETE() {
  const emptyPrizes = { prizes_given: [] };
  writePrizes(emptyPrizes);
  return NextResponse.json(emptyPrizes);
}