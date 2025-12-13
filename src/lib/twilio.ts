import twilio from 'twilio';

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

let twilioClient: twilio.Twilio | null = null;

if (accountSid && authToken) {
  twilioClient = twilio(accountSid, authToken);
}

export interface SendSMSParams {
  to: string;
  message: string;
  from?: string;
}

export interface SMSResult {
  success: boolean;
  messageSid?: string;
  error?: string;
}

/**
 * Send SMS using Twilio
 */
export async function sendSMS(params: SendSMSParams): Promise<SMSResult> {
  if (!twilioClient) {
    return {
      success: false,
      error: 'Twilio not configured. Please add TWILIO credentials to .env',
    };
  }

  try {
    const message = await twilioClient.messages.create({
      body: params.message,
      from: params.from || twilioPhone,
      to: params.to,
    });

    return {
      success: true,
      messageSid: message.sid,
    };
  } catch (error: any) {
    console.error('Twilio SMS error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send SMS',
    };
  }
}

/**
 * Validate phone number format
 */
export function validatePhoneNumber(phone: string): boolean {
  // Basic E.164 format validation
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/[\s()-]/g, ''));
}

/**
 * Format phone number to E.164
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Add + prefix if not present and assume US/Canada (+1) if 10 digits
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+${cleaned}`;
  } else if (phone.startsWith('+')) {
    return phone;
  }

  return `+${cleaned}`;
}

/**
 * Purchase phone number from Twilio
 */
export async function purchasePhoneNumber(areaCode?: string): Promise<{
  success: boolean;
  phoneNumber?: string;
  error?: string;
}> {
  if (!twilioClient) {
    return {
      success: false,
      error: 'Twilio not configured',
    };
  }

  try {
    // Search for available numbers
    const numbers = await twilioClient.availablePhoneNumbers('US').local.list({
      areaCode: areaCode ? parseInt(areaCode, 10) : undefined,
      limit: 1,
    });

    if (numbers.length === 0) {
      return {
        success: false,
        error: 'No available numbers found',
      };
    }

    // Purchase the first available number
    const incomingNumber = await twilioClient.incomingPhoneNumbers.create({
      phoneNumber: numbers[0].phoneNumber,
      smsUrl: `${process.env.APP_URL}/api/sms/webhook`,
      smsMethod: 'POST',
    });

    return {
      success: true,
      phoneNumber: incomingNumber.phoneNumber,
    };
  } catch (error: any) {
    console.error('Error purchasing phone number:', error);
    return {
      success: false,
      error: error.message || 'Failed to purchase phone number',
    };
  }
}

/**
 * Get message delivery status
 */
export async function getMessageStatus(messageSid: string): Promise<{
  status?: string;
  error?: string;
}> {
  if (!twilioClient) {
    return {
      error: 'Twilio not configured',
    };
  }

  try {
    const message = await twilioClient.messages(messageSid).fetch();
    return {
      status: message.status,
    };
  } catch (error: any) {
    return {
      error: error.message || 'Failed to fetch message status',
    };
  }
}

export { twilioClient };
