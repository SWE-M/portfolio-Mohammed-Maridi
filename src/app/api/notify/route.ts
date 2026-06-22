import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { type } = await request.json(); // نحدد هنا إن كانت زيارة أو طلب جديد
    let eventText = "";

    if (type === 'visit') {
      eventText = "Portfolio : Someone Visited the Site!";
    } else if (type === 'request') {
      eventText = "Portfolio : New Request Submitted!";
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    // إرسال النص الصافي مباشرة إلى صندوق Adafruit IO الخاص بك
    const response = await fetch('https://io.adafruit.com/api/v2/hmm1999/feeds/alerts/data', {
      method: 'POST',
      headers: {
        'X-AIO-Key': process.env.ADAFRUIT_AIO_KEY || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: eventText })
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Failed to send to Adafruit" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}