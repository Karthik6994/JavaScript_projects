async function fetchCrypto(coin = "bitcoin", date = "") {
  try {
    if (date) {
      const [year, month, day] = date.split("-");
      const formattedDate = `${day}-${month}-${year}`;

      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin.toLowerCase()}/history?date=${formattedDate}`
      );
      if (!res.ok) throw new Error("Coin not found or invalid date");
      const data = await res.json();

      document.getElementById("cryptoImg").src = data.image?.small || "";
      document.getElementById("cryptoImg").style.display = data.image ? "block" : "none";
      document.getElementById("cryptoName").textContent = `${data.name} (${data.symbol.toUpperCase()})`;
      document.getElementById("cryptoPrice").textContent =
        data.market_data?.current_price?.usd
          ? `$${data.market_data.current_price.usd.toLocaleString()} (on ${date})`
          : "No data for this date";
    } else {
      const detailsRes = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.toLowerCase()}`);
      if (!detailsRes.ok) throw new Error("Coin not found");
      const details = await detailsRes.json();

      const priceRes = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coin.toLowerCase()}&vs_currencies=usd`
      );
      const priceData = await priceRes.json();

      document.getElementById("cryptoImg").src = details.image.small;
      document.getElementById("cryptoImg").style.display = "block";
      document.getElementById("cryptoName").textContent = `${details.name} (${details.symbol.toUpperCase()})`;
      document.getElementById("cryptoPrice").textContent = `$${priceData[coin.toLowerCase()].usd.toLocaleString()}`;
    }
  } catch (error) {
    document.getElementById("cryptoName").textContent = "Not found";
    document.getElementById("cryptoPrice").textContent = "Please try another coin or date";
    document.getElementById("cryptoImg").style.display = "none";
  }
}

document.getElementById("searchBtn").addEventListener("click", () => {
  const coin = document.getElementById("cryptoInput").value.trim();
  const date = document.getElementById("dateInput").value;
  if (coin) {
    fetchCrypto(coin, date);
  }
});

fetchCrypto("bitcoin");
