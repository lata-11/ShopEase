"use server";
import { scrapeAmazonProduct } from "../scraper";
import { connectToDB } from "../mongoose";

export async function scrapeAndStoreProduct(productUrl:string) {
  if (!productUrl) return;

  try {
    connectToDB();
    const scrapeProduct = await
    scrapeAmazonProduct(productUrl);
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}
