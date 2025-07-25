"use client";
import {
  MiniKit,
  tokenToDecimals,
  Tokens,
  PayCommandInput,
} from "@worldcoin/minikit-js";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { awardMerits } from "@/lib/merits";

const sendPayment = async () => {
  try {
    const res = await fetch(`/api/initiate-payment`, {
      method: "POST",
    });

    const { id } = await res.json();
    if (process.env.NODE_ENV !== "production") {
      console.log(id);
    }

    const payload: PayCommandInput = {
      reference: id,
      to: "0x1285CdcF8b518AdFDccB2B7b008d1EAA2238Bc4A", // Test address
      tokens: [
        {
          symbol: Tokens.WLD,
          token_amount: tokenToDecimals(0.011, Tokens.WLD).toString(),
        },
        {
          symbol: Tokens.USDCE,
          token_amount: tokenToDecimals(0.011, Tokens.USDCE).toString(),
        },
      ],
      description: "Watch this is a test",
    };
    if (MiniKit.isInstalled()) {
      return await MiniKit.commandsAsync.pay(payload);
    }
    return null;
  } catch (error: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.log("Error sending payment", error);
    }
    return null;
  }
};

export const handlePay = async () => {
  if (!MiniKit.isInstalled()) {
    if (process.env.NODE_ENV !== "production") {
      console.error("MiniKit is not installed");
    }
    return false;
  }
  const sendPaymentResponse = await sendPayment();
  const response = sendPaymentResponse?.finalPayload;
  if (!response) {
    return false;
  }

  if (response.status == "success") {
    const res = await fetch(`/api/confirm-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: response }),
    });
    const payment = await res.json();
    if (payment.success) {
      // Congrats your payment was successful!
      if (process.env.NODE_ENV !== "production") {
        console.log("SUCCESS!");
      }
      if (MiniKit.walletAddress) {
        await awardMerits(MiniKit.walletAddress, '20', 'Payment completed');
      }
      return true;
    } else {
      // Payment failed
      if (process.env.NODE_ENV !== "production") {
        console.log("FAILED!");
      }
      return false;
    }
  }
  return false;
};

export const PayBlock = () => {
  return (
    <Button onClick={handlePay} variant="primary" size="lg">
      Pay
    </Button>
  );
};
