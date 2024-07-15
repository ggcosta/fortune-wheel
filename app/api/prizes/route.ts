import { NextResponse } from "next/server";
import Award from "@/models/Award";

export async function GET() {
  try {
    const awards = await Award.find();

    return NextResponse.json({ awards }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await Award.create(body);

    return NextResponse.json(
      { message: "Award created successfully" },
      { status: 201, headers: { "Content-Type": "application/json" }} 
    );
  } catch (error){
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE() {}
