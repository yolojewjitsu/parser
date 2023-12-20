const axios = require('axios');
const cheerio = require('cheerio');

async function fetchStockInfo(artId) {
  try {
    const response = await axios.get(`https://www.wildberries.ru/catalog/${artId}/detail.aspx`);
    const $ = cheerio.load(response.data);

    const stockInfo = {};

    // Находим блок с остатками
    $('.j-size-amount').each((index, element) => {
      const size = $(element).text().trim();
      const quantity = parseInt($(element).siblings('.j-size-amount-value').text().trim(), 10);

      stockInfo[size] = quantity;
    });

    return stockInfo;
  } catch (error) {
    console.error(`Error fetching data for artId ${artId}: ${error.message}`);
    return null;
  }
}

async function main() {

  const artIds = [146972802, 160740830, 190879343, 160737571, 178144226, 190456385, 160738996, 183271022, 182770058, 189785767, 36328331, 154611222, 190627235, 67508839, 178142953, 166416619, 183270278, 183269075, 183266945, 173462958, 166417437];
  const result = [];

  for (const artId of artIds) {
    const stockInfo = await fetchStockInfo(artId);

    if (stockInfo) {
      result.push({
        art: artId,
        stock: stockInfo,
      });
    }
  }

  console.log(result);
}

main();
