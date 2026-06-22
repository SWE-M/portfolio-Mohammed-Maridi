import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { type } = await request.json(); 
    let eventText = "";

    if (type === 'visit') {
      // 🚀 نرسل كلمة Visit صافية لكي تلتقطها الشاشة وتزيد عداد الـ 24 ساعة الخاص بها
      eventText = "Portfolio : Visit";
    } else if (type === 'request') {
      // 🚀 نرسل كلمة Request صافية عند رفع طلب مشروع
      eventText = "Portfolio : Request";
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const aioKey = process.env.ADAFRUIT_AIO_KEY || '';

    // إرسال الإشارة الصافية إلى Adafruit
    const response = await fetch('https://io.adafruit.com/api/v2/hmm1999/feeds/alerts/data', {
      method: 'POST',
      headers: {
        'X-AIO-Key': aioKey,
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