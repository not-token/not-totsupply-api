import { ResponseOkCV, UIntCV, hexToCV } from "@stacks/transactions";

export async function fetchSupply() {
  try {
    const response = await fetch(
      "https://api.mainnet.hiro.so/v2/contracts/call-read/SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ/nope/get-total-supply",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sender: "SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ",
          arguments: [],
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const hexResult = data.result;

    const {
      value: { value },
    } = hexToCV(hexResult) as ResponseOkCV<UIntCV>;
    return value;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
