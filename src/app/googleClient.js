// googleClient.js
import { google } from "googleapis";

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  process.env.REACT_APP_GOOGLE_CLIENT_ID,
  process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
  "http://localhost:3000" // Replace with your redirect URI
);

export const getAuthUrl = () => {
  const scopes = [
    "https://www.googleapis.com/auth/calendar.events",
  ];
  return oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
};

export const getTokens = async (code) => {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  return tokens;
};

export const createGoogleMeetEvent = async (summary, description, startTime, endTime) => {
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  const event = {
    summary: summary,
    description: description,
    start: {
      dateTime: startTime,
      timeZone: "America/Los_Angeles", // Set your timezone
    },
    end: {
      dateTime: endTime,
      timeZone: "America/Los_Angeles",
    },
    conferenceData: {
      createRequest: {
        requestId: "sample123",
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };

  const response = await calendar.events.insert({
    calendarId: "primary",
    resource: event,
    conferenceDataVersion: 1,
  });

  return response.data;
};
