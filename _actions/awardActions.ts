'use server'

import Award from '@/models/Award'
import connectDb from '@/utils/db'

export async function getAwards (){
  try {
    await connectDb();
    console.log("Getting all awards");
    const data = JSON.parse(JSON.stringify(await Award.find()));
    return { data }
  } catch (error) {
    return { errMsg: "Error!" }
  }
}

export async function addAward (award: string){
  try {
    await connectDb();
    const existingAward = await Award.findOne({ name: award });
    if (existingAward) {
      existingAward.amountGiven += 1;
      await existingAward.save();
      console.log("Award already exists. Incremented amountGiven by 1");
      return { message: "Award already exists. Incremented amountGiven by 1" };
    } else {
      await Award.create({ name: award, amountGiven: 1 });
      console.log("Award created successfully");
      return { message: "Award created successfully" };
    }
  } catch (error) {
    return { errMsg: "Error!" };
  }
}

export async function deleteAllAwards (){
  try {
    await connectDb();
    console.log("Deleting all awards");
    await Award.deleteMany();
    return { message: "All awards deleted" };
  } catch (error) {
    return { errMsg: "Error!" };
  }
}