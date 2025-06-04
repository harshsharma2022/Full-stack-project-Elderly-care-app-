const twilio = require('twilio');
require('dotenv').config();

let client = null;

// Only initialize Twilio client if credentials are provided
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
} else {
  console.warn('Twilio credentials not found. SMS functionality will be disabled.');
}

const sendSMS = async (to, message) => {
  try {
    if (!client) {
      console.warn('SMS not sent (Twilio not configured):', { to, message });
      return;
    }

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });
    console.log(`SMS sent to ${to}:`, message);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

module.exports = {
  sendSMS
}; 