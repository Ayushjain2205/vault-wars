// API utilities for fetching token prices and other data

/**
 * Fetches the current price of Sonic ($S) token in USD using CoinGecko API
 */
export async function getSonicPrice(): Promise<number> {
  try {
    const params = new URLSearchParams({
      ids: "sonic-3",
      vs_currencies: "usd",
    });

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?${params}`
    );
    const data = await response.json();

    if (data["sonic-3"]?.usd) {
      return data["sonic-3"].usd;
    }

    console.error("Price data not found in response:", data);
    return 0.8637; // Fallback price if data is not available
  } catch (error) {
    console.error("Error fetching Sonic price:", error);
    return 0.8637; // Return default price as fallback
  }
}

/**
 * Fetches the current price ratio of ETH/Sonic ($S)
 * Returns how many $S tokens you get for 1 ETH
 */
export async function getSonicEthRatio(): Promise<number> {
  try {
    // For development/testing, using a fixed ratio
    // TODO: Replace with actual Sonic DEX API call
    return 1000; // 1 ETH = 1000 $S (this is a placeholder value)

    // Actual implementation would look something like:
    // const response = await fetch('SONIC_DEX_API_ENDPOINT');
    // const data = await response.json();
    // return data.ethToSonicRatio;
  } catch (error) {
    console.error("Error fetching Sonic/ETH ratio:", error);
    return 1000; // Return default ratio as fallback
  }
}
