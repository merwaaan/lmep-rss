import fs from "fs/promises";
import * as cheerio from "cheerio";

(async function run() {
  try {
    const response = await fetch(
      "https://www.c-lab.fr/emission/la-madeleine-en-pixel.rss"
    );

    const responseText = await response.text();

    const $ = cheerio.load(responseText, { xmlMode: true });

    $("itunes\\:email").text("lamadeleineenpixels@gmail.com");

    await fs.writeFile("./la-madeleine-en-pixel.rss", $("rss").toString());
  } catch (error) {
    console.error(error);
  }
})();
