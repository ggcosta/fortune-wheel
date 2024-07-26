"use server";

import Award from "@/models/Award";
import connectDb from "@/utils/db";

export async function getAwards() {
  try {
    await connectDb();
    console.log("Getting all awards");
    const data = JSON.parse(JSON.stringify(await Award.find()));
    return { data };
  } catch (error) {
    return { errMsg: "Error!" };
  }
}

export async function getChancesArray(data: any) {
  try {
    const awards = await getAwards();
    let chancesArray: number[] = [];
    data.forEach((award: any) => {
      const awardData = awards.data.find(
        (item: any) => item.name === award.option
      );
      chancesArray.push(awardData.chanceWeight);
    });
    return chancesArray;
  } catch (error) {
    return { errMsg: "Error getting chances Array!" };
  }
}

export async function initiateAwards(data: any) {
  try {
    const awards = await getAwards();
    if (awards.data.length > 0) {
      return { message: "Awards already initiated" };
    } else {
      await connectDb();
      for (const award of data) {
        const existingAward = await Award.findOne({ name: award.option });
        if (!existingAward) {
          await Award.create({
            name: award.option,
            amountGiven: 0,
            stockAmount: 100,
            chanceWeight: 1,
          });
          console.log("Award created successfully");
        } else {
          console.log("Award already exists");
        }
      }
      return { message: "Awards initiated" };
    }
  } catch (error) {
    return { errMsg: "Error Initiating Awards!" };
  }
}

export async function addAward(awardName: string) {
  try {
    await connectDb();
    const existingAward = await Award.findOne({ name: awardName });
    if (existingAward) {
      existingAward.amountGiven += 1;
      await existingAward.save();
      console.log("Award already exists. Incremented amountGiven by 1");
      return { message: "Award already exists. Incremented amountGiven by 1" };
    } else {
      await Award.create({ name: awardName, amountGiven: 1, stockAmount: 100 });
      console.log("Award created successfully");
      return { message: "Award created successfully" };
    }
  } catch (error) {
    return { errMsg: "Error!" };
  }
}

export async function deleteAllAwards() {
  try {
    await connectDb();
    console.log("Deleting all awards");
    await Award.deleteMany();
    return { message: "All awards deleted" };
  } catch (error) {
    return { errMsg: "Error!" };
  }
}

export async function resetAllAwardsGiven() {
  try {
    await connectDb();
    console.log("Resetting all awards given");
    await Award.updateMany({}, { amountGiven: 0 });
    return { message: "All awards given reset" };
  } catch (error) {
    return { errMsg: "Error!" };
  }
}

export async function editAwardStock(awardId: string, stockAmount: number) {
  try {
    await connectDb();
    const award = await Award.findById(awardId);
    if (award) {
      award.stockAmount = stockAmount;
      console.log(award);
      await award.save();
      console.log("Stock amount updated successfully");
      return { message: "Stock amount updated successfully" };
    } else {
      return { errMsg: "Award not found" };
    }
  } catch (error) {
    return { errMsg: "Error!" };
  }
}

export async function editAwardChance(awardId: string, chanceWeight: number) {
  try {
    await connectDb();
    const award = await Award.findById(awardId);
    if (award) {
      award.chanceWeight = chanceWeight;
      console.log(award);
      await award.save();
      console.log("Chance weight updated successfully");
      return { message: "Chance weight updated successfully" };
    } else {
      return { errMsg: "Award not found" };
    }
  } catch (error) {
    return { errMsg: "Error!" };
  }
}
