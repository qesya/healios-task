export const getData = async () => {
  const currentDate = new Date();
  try {
    let resp = await fetch(
      'https://finnhub.io//api/v1/stock/candle?symbol=AMZN&resolution=1&from=1605543327&to=' +
        Math.floor(currentDate.getTime() / 1000),
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Finnhub-Token': 'c0d8luf48v6vf7f7g0j0',
        },
      },
    );
    let json = await resp.json();

    const c = json.c.slice(Math.max(json.c.length - 7, 1));
    const o = json.o.slice(Math.max(json.o.length - 7, 1));
    const h = json.h.slice(Math.max(json.h.length - 7, 1));
    const l = json.l.slice(Math.max(json.l.length - 7, 1));

    const data = [];
    c.map((item, index) =>
      data.push({
        shadowH: h[index],
        shadowL: l[index],
        open: o[index],
        close: item,
      }),
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};
