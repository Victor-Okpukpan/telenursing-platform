// app/api/googleCalendar/route.ts
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Set the credentials (access token and refresh token)
oauth2Client.setCredentials({
  access_token: process.env.GOOGLE_ACCESS_TOKEN,
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export async function POST(req) {
  try {
    const { summary, description, startTime, endTime, allowAnyone } = await req.json();

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const event = {
      summary: summary,
      description: description,
      start: {
        dateTime: startTime,
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: endTime,
        timeZone: 'America/Los_Angeles',
      },
      conferenceData: {
        createRequest: {
          requestId: '7qxalsvy0e',
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
      attendees: [],
    };

    if (allowAnyone) {
      event.guestsCanModify = true;
      event.guestsCanInviteOthers = true;
      event.guestsCanSeeOtherGuests = true;
      event.conferenceData.createRequest.conferenceSolutionKey = { type: 'hangoutsMeet' };
      event.conferenceData.createRequest.requestId = '7qxalsvy0e';
    }

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    });

    return NextResponse.json({ meetLink: response.data.hangoutLink });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
