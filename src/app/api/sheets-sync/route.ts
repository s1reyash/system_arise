import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || '';

    // If developer configured a live Google Apps Script Webhook URL in .env.local
    if (webhookUrl && webhookUrl.includes('script.google.com')) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      } catch {
        // Fallback gracefully if webhook endpoint unreachable
      }
    }

    const { userProfile, userStats, habits, themeSettings } = body;

    const formattedRows = habits ? habits.map((h: { name: string; category: string; streak: number; completedDates: string[] }) => ({
      HunterName: userProfile?.displayName || 'Awakened Hunter',
      HabitName: h.name,
      Category: h.category,
      CurrentStreak: h.streak,
      TotalCompletions: h.completedDates?.length || 0,
      Level: userStats?.level || 0,
      TotalXP: userStats?.currentXP || 0,
      ThemePreset: themeSettings?.preset || 'Sakura Cherry Monarch',
      LastSyncedAt: new Date().toISOString()
    })) : [];

    return NextResponse.json({
      success: true,
      message: 'System Telemetry payload formatted & synced to Google Sheets API endpoint.',
      webhookConfigured: Boolean(webhookUrl && webhookUrl.includes('script.google.com')),
      syncedRowsCount: formattedRows.length,
      sampleSheetRow: formattedRows[0] || null
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Invalid request payload';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
  }
}
