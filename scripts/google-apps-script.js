/**
 * SYSTEM: ARISE — Google Apps Script Backend Webhook
 * 
 * INSTRUCTIONS:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Go to Extensions -> Apps Script
 * 3. Replace all default code with this exact script.
 * 4. Click 'Deploy' -> 'New deployment' -> Select type 'Web app'
 * 5. Set 'Execute as': 'Me'
 * 6. Set 'Who has access': 'Anyone'
 * 7. Click 'Deploy' and copy your Web App URL.
 * 8. Paste the Web App URL in your .env.local file:
 *    NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/.../exec"
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Ensure Headers exist on Row 1
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", 
        "Hunter Name", 
        "Habit Name", 
        "Category", 
        "Current Streak", 
        "Total Completions", 
        "Level", 
        "Total XP", 
        "Rank Title",
        "Theme Preset"
      ]);
    }
    
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date().toISOString();
    
    if (data.habits && data.habits.length > 0) {
      data.habits.forEach(function(h) {
        sheet.appendRow([
          timestamp,
          data.userProfile ? data.userProfile.displayName : "Awakened Hunter",
          h.name || "Daily Quest",
          h.category || "General",
          h.streak || 0,
          h.completedDates ? h.completedDates.length : 0,
          data.userStats ? data.userStats.level : 0,
          data.userStats ? data.userStats.currentXP : 0,
          data.userStats ? data.userStats.rankTitle : "Awakened",
          data.themeSettings ? data.themeSettings.preset : "Sakura Cherry Monarch"
        ]);
      });
    } else {
      sheet.appendRow([
        timestamp,
        data.userProfile ? data.userProfile.displayName : "Awakened Hunter",
        "System Sync Event",
        "System Telemetry",
        0,
        0,
        data.userStats ? data.userStats.level : 0,
        data.userStats ? data.userStats.currentXP : 0,
        data.userStats ? data.userStats.rankTitle : "Awakened",
        "System HUD"
      ]);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "success", "message": "Telemetry logged into Google Sheet" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ "status": "active", "service": "SYSTEM: ARISE Google Sheets API Webhook" }))
    .setMimeType(ContentService.MimeType.JSON);
}
