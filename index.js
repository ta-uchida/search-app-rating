const puppeteer = require('puppeteer');
const fs = require('fs');

const getPageData = async (browser, url) => {
  if (!url) { return; }
  console.log(`url: ${url}`);

  let page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle0'});

  let isAppStore = url.indexOf('apps.apple.com') > -1;
  let pageData = await page.evaluate((isAppStore) => {
    let title = document.querySelector('meta[property="og:title"]').content;;
    let rating = '';

    if (isAppStore) {
      rating = document.querySelector('[class="we-star-rating ember-view"]').attributes['aria-label'].value;
    } else {
      rating = document.querySelector('div[class="jdjqLd"] div[class="pf5lIe"]').children[0].attributes['aria-label'].value;
    }

    return { title, rating };
  }, isAppStore);
  await page.close();
  return pageData;
};

fs.readFile('./urls', {encoding: "utf-8"}, async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  (async () => {
    const browser = await puppeteer.launch({headless: true});
    const result = await Promise.all(
        data.split('\n').map(url => getPageData(browser, url))
    );
    console.log(result.filter(r => r !== undefined));
    browser.close();
  })();
});
