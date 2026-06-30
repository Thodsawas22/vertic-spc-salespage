export default async function handler(req, res) {
  // Allow CORS for local testing if needed
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    
    // Retrieve environment variables
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
    const LINE_CHANNEL_TOKEN = process.env.LINE_CHANNEL_TOKEN;
    const LINE_GROUP_ID = process.env.LINE_GROUP_ID;

    if (!GOOGLE_SCRIPT_URL || !LINE_CHANNEL_TOKEN || !LINE_GROUP_ID) {
      console.error("Missing Environment Variables on Vercel!");
      return res.status(500).json({ error: 'Server configuration missing.' });
    }

    // 1. Forward data to Google Apps Script (to append row)
    // Create form data params to match how it was sent before
    const params = new URLSearchParams();
    for (const key in data) {
      params.append(key, data[key]);
    }
    
    let orderId = "VTC-XXXX";
    try {
      const gasResponse = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      // Try to parse the JSON response from our simplified Apps Script
      const gasResult = await gasResponse.json();
      if (gasResult && gasResult.orderId) {
        orderId = gasResult.orderId;
      }
    } catch (e) {
      console.error("Error communicating with Google Sheet:", e);
      // We don't block the LINE message if GAS fails
    }

    // 2. Send Text Message to LINE Messaging API
    const textMessage = `${orderId}\nCOD${data.totalPrice || "0"}\n${data.customerName || "-"}\n${data.customerAddress || "-"}\n${data.customerPhone || "-"}`;

    const linePayload = {
      "to": LINE_GROUP_ID,
      "messages": [
        {
          "type": "text",
          "text": textMessage
        }
      ]
    };

    try {
      const lineResponse = await fetch("https://api.line.me/v2/bot/message/push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${LINE_CHANNEL_TOKEN}`
        },
        body: JSON.stringify(linePayload)
      });
      
      const lineResult = await lineResponse.json();
      console.log("LINE API Response:", lineResult);
    } catch (e) {
      console.error("Error sending LINE message:", e);
    }

    return res.status(200).json({ success: true, orderId: orderId });

  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
