import axios from "axios";
import * as cheerio from "cheerio";
import { extractPrice } from "../utils";
import { extractCurrency } from "../utils";
import { extractDescription } from "../utils";

export async function scrapeAmazonProduct(url: string) {
  if (!url) {
    return;
  }

  /*curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_588e43ba-zone-unblocker:ubaxmqkf77js -k https://lumtest.com/myip.json */

  //brightdata proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };
  try {
    //fetch the product page
    const response = await axios.get(url, options);
    // console.log(response.data);
    const $ = cheerio.load(response.data);

    //extract the product title
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $(".priceTopay span.a-price-whole"),
      $("a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base")
      // $('.a-price.a-text-price .a-offscreen')
    );
    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $("#.a-size-base.a-color-price")
    );
    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "CURRENTLY UNAVAILABLE!";
    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    const imageUrls = Object.keys(JSON.parse(images));
    const currency = extractCurrency($('.a-price-symbol'));
    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");
    const description = extractDescription($);

    //construct data object with scrapped information

    const data = {
        url,
        currency: currency || '$',
        image: imageUrls[0],
        title,
        currentPrice: Number(currentPrice) || Number(originalPrice),
        originalPrice: Number(originalPrice) || Number(currentPrice),
        priceHistory: [],
        discountRate: Number(discountRate),
        category: 'category',
        reviewsCount: 100,
        stars: 4.5,
        isOutOfStock: outOfStock,
        description: description,
        lowestPrice: Number(currentPrice) || Number(originalPrice),
        highestPrice: Number(originalPrice) || Number(currentPrice),
        average: Number(currentPrice) || Number(originalPrice),
    }
    //console.log(data);
  } catch (error: any) {
    throw new Error(`failed to scrape product ${error.message}`);
  }
}
