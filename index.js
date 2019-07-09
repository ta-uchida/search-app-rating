const puppeteer = require('puppeteer');
const fs = require('fs');

fs.readFile('./urls', {encoding: "utf-8"}, async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  try {
    console.log('*** success ***');
    data.split('\n').forEach(async d => {
      if (!d) { return; }
      console.log(`url: ${d}`);

      /* Go to the IMDB Movie page and wait for it to load */
      await page.goto(d, {waitUntil: 'networkidle0'});

      /* Run javascript inside of the page */
      let ratingData = await page.evaluate(() => {
        let rating = document.querySelector('div[class="jdjqLd"] div[class="pf5lIe"]').children[0].attributes['aria-label'];
        /* Returning an object filled with the scraped data */
        return rating;
      });

      console.log(ratingData);
    });
  } catch (e) {
    console.error(e);
  }

  await browser.close();
});

// const IMDB_URL = (movie_id) => `https://www.imdb.com/title/${movie_id}/`;
// const MOVIE_ID = `tt6763664`;
// (async () => {
//   /* Initiate the Puppeteer browser */
//   // const browser = await puppeteer.launch();
//
//   // visually debug with Puppeteer
//   // development only
//   const browser = await puppeteer.launch({headless: false});
//
//   const page = await browser.newPage();
//   /* Go to the IMDB Movie page and wait for it to load */
//   await page.goto(IMDB_URL(MOVIE_ID), {waitUntil: 'networkidle0'});
//
// // save screenshot
//   await page.screenshot({path: 'screenshot.png'});
//
//   /* Run javascript inside of the page */
//   let data = await page.evaluate(() => {
//     let title = document.querySelector('div[class="title_wrapper"] > h1').innerText;
//     let rating = document.querySelector('span[itemprop="ratingValue"]').innerText;
//     let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerText;
//     /* Returning an object filled with the scraped data */
//     return {
//       title,
//       rating,
//       ratingCount
//     }
//   });
//   /* Outputting what we scraped */
//   console.log(data);
//   await browser.close();
// })();
