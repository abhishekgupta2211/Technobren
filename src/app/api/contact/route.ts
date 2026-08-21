import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Simple in-memory fallback store for demo/dev persistence
const localSubmissions: any[] = [];

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const submission = {
      id: `inq_${Date.now()}`,
      timestamp: new Date().toISOString(),
      name: data.name || "",
      email: data.email || "",
      mobile: data.mobile || "",
      company: data.company || "",
      service: data.service || "",
      budget: data.budget || "",
      timeline: data.timeline || "",
      details: data.details || "",
    };

    // Store in-memory / DB
    localSubmissions.push(submission);

    console.log("------------------------------------------");
    console.log("NEW PROJECT ENQUIRY RECEIVED:");
    console.log(JSON.stringify(submission, null, 2));
    console.log("------------------------------------------");

    // SERVER-SIDE BACKGROUND WHATSAPP NOTIFICATION
    const recipientPhone = process.env.WHATSAPP_RECIPIENT_PHONE || "919369610213";
    const whatsappToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const whatsappPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const callmebotApiKey = process.env.CALLMEBOT_API_KEY;

    // Fire-and-forget background notification
    (async () => {
      try {
        const messageBody = `🔔 *New Website Enquiry*\n\n` +
          `👤 *Name:* ${submission.name}\n` +
          `📞 *Phone:* ${submission.mobile || "N/A"}\n` +
          `📧 *Email:* ${submission.email}\n` +
          `🏢 *Company:* ${submission.company || "N/A"}\n` +
          `🛠️ *Service:* ${submission.service || "N/A"}\n` +
          `💰 *Budget:* ${submission.budget || "N/A"}\n` +
          `⏱️ *Timeline:* ${submission.timeline || "N/A"}\n` +
          `📝 *Message:* ${submission.details}\n\n` +
          `🌐 *Website:* Technobren Infotech`;

        if (whatsappToken && whatsappPhoneId) {
          // 1. WhatsApp Cloud API Official
          await fetch(`https://graph.facebook.com/v18.0/${whatsappPhoneId}/messages`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${whatsappToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              recipient_type: "individual",
              to: recipientPhone,
              type: "text",
              text: { preview_url: false, body: messageBody },
            }),
          });
          console.log("WhatsApp Cloud API notification sent successfully");
        } else if (callmebotApiKey) {
          // 2. CallMeBot Free API
          const cmbUrl = `https://api.callmebot.com/whatsapp.php?phone=+${recipientPhone}&text=${encodeURIComponent(messageBody)}&apikey=${callmebotApiKey}`;
          await fetch(cmbUrl);
          console.log("CallMeBot WhatsApp notification sent successfully");
        } else {
          console.log(`[WhatsApp Pending] Set CALLMEBOT_API_KEY or WHATSAPP_ACCESS_TOKEN env vars to receive background alerts to ${recipientPhone}`);
        }
      } catch (waErr) {
        console.error("Background WhatsApp Notification Error:", waErr);
      }
    })();

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
      id: submission.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    count: localSubmissions.length,
    submissions: localSubmissions,
  });
}
