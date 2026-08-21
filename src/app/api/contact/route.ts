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

    // Store in-memory
    localSubmissions.push(submission);

    console.log("------------------------------------------");
    console.log("NEW PROJECT ENQUIRY RECEIVED:");
    console.log(JSON.stringify(submission, null, 2));
    console.log("------------------------------------------");

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
