const twilio = require('twilio');

const sendWhatsAppNotification = async (message, phoneNumber) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      console.error('Twilio credentials not configured');
      return { success: false, error: 'WhatsApp service not configured' };
    }

    const client = twilio(accountSid, authToken);

    // Format phone number (ensure it starts with country code)
    const formattedPhone = phoneNumber.startsWith('whatsapp:') 
      ? phoneNumber 
      : `whatsapp:${phoneNumber}`;

    const result = await client.messages.create({
      from: fromNumber,
      to: formattedPhone,
      body: message
    });

    return { success: true, messageId: result.sid };
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendWhatsAppNotification };

