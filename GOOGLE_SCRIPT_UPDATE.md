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
  BUSINESS_EMAIL: "info@tigerleestkd.com",
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
      const bookingData = {
        name, email, phone, date, time, service, 
        participantName: pName, 
        participantAge: pAge, 
        notes, 
        paymentMethod: payMethod
      };
      
      // Send notification to Admin
      sendAdminNotification(bookingData);
      
      // Send confirmation to Customer
      if (email) {
        sendCustomerConfirmation(bookingData);
      }
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

/**
 * Send notification to Admin
 */
function sendAdminNotification(booking) {
  const subject = `🥋 New Booking: ${booking.participantName} - ${booking.date}`;
  const htmlBody = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <div style="background-color: #DC2626; padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; font-weight: 800;">New Trial Booking</h1>
      </div>
      <div style="padding: 40px; background-color: #ffffff;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding-bottom: 30px; width: 50%;">
              <div style="color: #DC2626; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Student</div>
              <div style="font-size: 18px; font-weight: 700; color: #111827;">${booking.participantName}</div>
              <div style="font-size: 14px; color: #6b7280;">Age: ${booking.participantAge}</div>
            </td>
            <td style="padding-bottom: 30px; width: 50%;">
              <div style="color: #DC2626; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Payment Method</div>
              <div style="font-size: 15px; color: #1d4ed8; font-weight: 700; background-color: #eff6ff; padding: 6px 12px; border-radius: 6px; display: inline-block;">${booking.paymentMethod}</div>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 30px;">
              <div style="color: #DC2626; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Schedule</div>
              <div style="font-size: 15px; color: #374151; font-weight: 600;">${booking.date}</div>
              <div style="font-size: 15px; color: #374151;">${booking.time}</div>
              <div style="font-size: 13px; color: #6b7280; margin-top: 4px;">${booking.service}</div>
            </td>
            <td style="padding-bottom: 30px;">
              <div style="color: #DC2626; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Parent Contact</div>
              <div style="font-size: 15px; color: #374151; font-weight: 600;">${booking.name}</div>
              <div style="font-size: 14px; color: #374151;">${booking.phone}</div>
              <div style="font-size: 14px; color: #1d4ed8;">${booking.email}</div>
            </td>
          </tr>
        </table>
        
        <div style="margin-top: 10px; padding: 20px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #DC2626;">
          <div style="color: #DC2626; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Special Notes</div>
          <div style="font-size: 14px; color: #4b5563; font-style: italic; line-height: 1.5;">${booking.notes || 'No extra notes provided.'}</div>
        </div>
      </div>
      <div style="background-color: #111827; padding: 20px; text-align: center;">
        <p style="color: #9ca3af; margin: 0; font-size: 12px; letter-spacing: 0.5px;">${CONFIG.BUSINESS_NAME} - Admin Notification</p>
      </div>
    </div>
  `;
  MailApp.sendEmail({ 
    to: CONFIG.NOTIFICATION_EMAIL, 
    subject: subject, 
    htmlBody: htmlBody,
    name: CONFIG.BUSINESS_NAME,
    replyTo: CONFIG.BUSINESS_EMAIL
  });
}

/**
 * Send confirmation to Customer
 */
function sendCustomerConfirmation(booking) {
  const subject = `🥋 Confirmation: Your Lesson at Tiger Lee's World Class Tae Kwon Do`;
  const htmlBody = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <div style="background-color: #DC2626; padding: 40px 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 3px; font-weight: 900;">You're All Set!</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px; font-weight: 500;">We can't wait to see you on the mat.</p>
      </div>
      
      <div style="padding: 40px; background-color: #ffffff;">
        <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 30px;">
          Hi ${booking.name},<br><br>
          Thank you for choosing <strong>${CONFIG.BUSINESS_NAME}</strong>. We've successfully received your booking for <strong>${booking.participantName}</strong>. 
        </p>

        <div style="background-color: #f3f4f6; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
          <h2 style="margin: 0 0 20px 0; font-size: 18px; color: #111827; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #DC2626; display: inline-block; padding-bottom: 5px;">Your Appointment</h2>
          
          <div style="margin-bottom: 15px;">
            <div style="font-size: 12px; font-weight: 800; color: #DC2626; text-transform: uppercase; margin-bottom: 3px;">Class</div>
            <div style="font-size: 16px; color: #111827; font-weight: 600;">${booking.service}</div>
          </div>
          
          <div style="margin-bottom: 15px;">
            <div style="font-size: 12px; font-weight: 800; color: #DC2626; text-transform: uppercase; margin-bottom: 3px;">Date & Time</div>
            <div style="font-size: 16px; color: #111827; font-weight: 600;">${booking.date} at ${booking.time}</div>
          </div>

          <div>
            <div style="font-size: 12px; font-weight: 800; color: #DC2626; text-transform: uppercase; margin-bottom: 3px;">Payment Status</div>
            <div style="font-size: 16px; color: #111827; font-weight: 600;">${booking.paymentMethod}</div>
          </div>
        </div>

        <div style="border-top: 1px solid #e5e7eb; padding-top: 30px;">
          <h3 style="font-size: 16px; color: #111827; margin: 0 0 10px 0; font-weight: 700;">Location</h3>
          <p style="font-size: 14px; color: #4b5563; line-height: 1.5; margin: 0;">
            Tiger Lee's World Class Tae Kwon Do<br>
            Please arrive 10-15 minutes before your scheduled time.
          </p>
        </div>

        <div style="margin-top: 40px; text-align: center;">
          <p style="font-size: 14px; color: #6b7280; font-style: italic;">
            Questions? Reply to this email or call us at our studio.
          </p>
        </div>
      </div>

      <div style="background-color: #111827; padding: 30px; text-align: center;">
        <div style="margin-bottom: 15px;">
          <span style="color: white; font-weight: 900; font-size: 18px; letter-spacing: 1px;">TIGER LEE'S</span>
        </div>
        <p style="color: #9ca3af; margin: 0; font-size: 11px; line-height: 1.8;">
          &copy; ${new Date().getFullYear()} ${CONFIG.BUSINESS_NAME}. All rights reserved.<br>
          World Class Martial Arts Excellence
        </p>
      </div>
    </div>
  `;
  
  MailApp.sendEmail({
    to: booking.email,
    subject: subject,
    htmlBody: htmlBody,
    name: CONFIG.BUSINESS_NAME,
    replyTo: CONFIG.BUSINESS_EMAIL
  });
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
