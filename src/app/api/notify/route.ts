import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { type } = await request.json(); 
    let eventText = "";

    if (type === 'visit') {
      let visitNumber = "";
      
      // استدعاء خدمة العداد المجانية لزيادة العدد بمقدار 1 وجلب الرقم الحالي
      try {
        const counterResponse = await fetch('https://api.counterapi.dev/v1/mohammedmaridi/portfolio/up');
        if (counterResponse.ok) {
          const counterData = await counterResponse.json();
          
          // 🚀 تم التصحيح هنا: استخدام count بدلاً من value لقرائتها بشكل صحيح
          const finalCount = counterData.count || counterData.value || "1";
          visitNumber = ` [Total: ${finalCount}]`;
        }
      } catch (counterError) {
        console.error("Counter API Error:", counterError);
      }

      // النص النهائي الذي سيطير للشاشة ويحتوي على العداد الصحيح
      eventText = `Portfolio : Someone Visited!${visitNumber}`;

    } else if (type === 'request') {
      eventText = "Portfolio : New Request Submitted!";
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const aioKey = process.env.ADAFRUIT_AIO_KEY || '';

    // إرسال النص المحدث إلى صندوق Adafruit IO الخاص بك
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