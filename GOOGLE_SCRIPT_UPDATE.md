# Tiger Lee's Booking System - Final Google Apps Script (1/10/2026)

This file contains the complete, final version of the Google Apps Script required to run the booking system, handle Stripe payments, manage admin blocks, and send notification emails.

## Deployment Link
https://script.google.com/macros/s/AKfycbwPp8DUtxrS9c7BY6tp3O7hO6dPaoyB6MB--UlphQhdiWLt8WTLllRQPEsEV6wtvifI/exec

## Full Script Code

```javascript
/**
 * 🥋 Tiger Lee's World Class Tae Kwon Do - Booking System Script
 * Version: 1.0 (Final - 1/10/2026)
 * Features: Multi-step booking, Payment Tracking (Column J), Admin Blocking, Auto-Emails
 */

const CONFIG = {
  SHEET_NAME: "main",
  NOTIFICATION_EMAIL: "gloriacloudco@gmail.com",
  BUSINESS_NAME: "Tiger Lee's World Class Tae Kwon Do"
};

/**
 * Handles POST requests: 
 * 1. New customer bookings
 * 2. Manual blocks from Admin UI
 * 3. Deletion (unblocking) from Admin UI
 */
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
  
  const action = e.parameter.action;
  const date = e.parameter.date;
  const time = e.parameter.time || "";

  // ACTION: DELETE (Unblocking)
  if (action === 'delete') {
    const data = sheet.getDataRange().getValues();
    let deletedCount = 0;
    
    for (let i = data.length - 1; i >= 1; i--) {
      const row = data[i];
      let rowDateStr = (row[0] instanceof Date) ? Utilities.formatDate(row[0], Session.getScriptTimeZone(), 'yyyy-MM-dd') : row[0].toString();
      let rowTimeStr = (row[1] instanceof Date) ? Utilities.formatDate(row[1], Session.getScriptTimeZone(), 'h:mm a') : row[1].toString();
      
      if ((row[2] === 'MANUAL_BLOCK' || row[3] === 'Admin Block') && rowDateStr === date) {
        if (time === "" || time === "FULL DAY BLOCK") {
          if (row[1].toString().trim() === "") {
            sheet.deleteRow(i + 1);
            deletedCount++;
          }
        } 
        else if (rowTimeStr === time) {
          sheet.deleteRow(i + 1);
          deletedCount++;
        }
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ status: 'success', deleted: deletedCount }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // ACTION: ADD (Booking)
  const name = e.parameter.name || "";
  const email = e.parameter.email || "";
  const phone = e.parameter.phone || "";
  const pName = e.parameter["Participant Name"] || e.parameter.participantName || "";
  const pAge = e.parameter["Participant Age"] || e.parameter.participantAge || "";
  const notes = e.parameter.notes || "";
  const service = e.parameter.service || "MANUAL_BLOCK";
  const payMethod = e.parameter["Payment Method"] || e.parameter.paymentMethod || "Pay Locally";
  
  if (!date) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Date required' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // Sheet Structure: Date | Time | Service | Contact | Email | Phone | Participant | Age | Notes | Payment Method
  sheet.appendRow([date, time, service, name, email, phone, pName, pAge, notes, payMethod]);
  
  if (name && service !== "MANUAL_BLOCK") {
    try {
      sendBookingNotification({
        name, email, phone, date, time, service, 
        participantName: pName, 
        participantAge: pAge, 
        notes, 
        paymentMethod: payMethod
      });
    } catch (error) {
      Logger.log('Error: ' + error);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handles GET requests: Fetches bookings for Calendar & Admin UI
 */
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const booked = {};
  const bookings = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[0]) continue;

    let dateStr = (row[0] instanceof Date) ? Utilities.formatDate(row[0], Session.getScriptTimeZone(), 'yyyy-MM-dd') : row[0].toString();
    const isFullDay = !row[1] || row[1].toString().trim() === "";
    
    if (!booked[dateStr]) booked[dateStr] = [];
    if (isFullDay) { booked[dateStr] = ["FULL_DAY"]; } 
    else if (booked[dateStr][0] !== "FULL_DAY") {
      let timeStr = (row[1] instanceof Date) ? Utilities.formatDate(row[1], Session.getScriptTimeZone(), 'h:mm a') : row[1].toString();
      booked[dateStr].push(timeStr);
    }
    
    bookings.push({
      date: dateStr,
      time: isFullDay ? "FULL DAY BLOCK" : (row[1] instanceof Date ? Utilities.formatDate(row[1], Session.getScriptTimeZone(), 'h:mm a') : row[1].toString()),
      service: row[2] ? row[2].toString() : '',
      name: row[3] ? row[3].toString() : '',
      email: row[4] ? row[4].toString() : '',
      phone: row[5] ? row[5].toString() : '',
      "Participant Name": row[6] ? row[6].toString() : '',
      "Participant Age": row[7] ? row[7].toString() : '',
      notes: row[8] ? row[8].toString() : '',
      "Payment Method": row[9] ? row[9].toString() : 'Pay Locally'
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify({ booked, bookings }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendBookingNotification(booking) {
  const subject = `🥋 New Booking: ${booking.participantName} - ${booking.date}`;
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #DC2626; padding: 25px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px; text-transform: uppercase;">New Trial Booking</h1>
      </div>
      <div style="padding: 30px; background-color: #ffffff;">
        <table style="width: 100%;">
          <tr>
            <td style="padding-bottom: 20px;">
              <div style="color: #DC2626; font-size: 10px; font-weight: bold;">STUDENT</div>
              <div style="font-size: 16px; font-weight: bold;">${booking.participantName} (${booking.participantAge} yrs)</div>
            </td>
            <td style="padding-bottom: 20px;">
              <div style="color: #DC2626; font-size: 10px; font-weight: bold;">PAYMENT</div>
              <div style="font-size: 14px; color: #1d4ed8; font-weight: bold;">${booking.paymentMethod}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div style="color: #DC2626; font-size: 10px; font-weight: bold;">TIME</div>
              <div style="font-size: 14px;">${booking.date} @ ${booking.time}</div>
            </td>
            <td>
              <div style="color: #DC2626; font-size: 10px; font-weight: bold;">PARENT</div>
              <div style="font-size: 14px;">${booking.name}<br>${booking.phone}</div>
            </td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #DC2626;">
          <div style="color: #DC2626; font-size: 10px; font-weight: bold;">NOTES</div>
          <div style="font-size: 13px; font-style: italic;">${booking.notes || 'None'}</div>
        </div>
      </div>
    </div>
  `;
  MailApp.sendEmail({ to: CONFIG.NOTIFICATION_EMAIL, subject, htmlBody });
}
```

## How to Apply this Update

1.  Open your [Google Apps Script Editor](https://script.google.com/).
2.  Delete all existing code and paste the code from the block above.
3.  Ensure your Google Sheet ("main") has headers in Row 1 for columns **A through J**:
    *   A: Date | B: Time | C: Service | D: Contact Name | E: Email | F: Phone | G: Participant Name | H: Age | I: Notes | **J: Payment Method**
4.  Click **Deploy** -> **New Deployment**.
5.  Select **Web App**, set Execute as: **Me**, and Who has access: **Anyone**.
6.  Copy the new **Web App URL** and update it in `CTA.tsx` and `AdminPage.tsx` if it has changed.
