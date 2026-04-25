const RESEND_API_URL = 'https://api.resend.com/emails';

const json = (res, statusCode, payload) => {
  res.status(statusCode).setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(payload));
};

const getCorsHeaders = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
});

module.exports = async function handler(req, res) {
  const corsHeaders = getCorsHeaders();
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return json(res, 405, { ok: false, error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.RESEND_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return json(res, 500, {
      ok: false,
      error: 'Server is missing RESEND_API_KEY, RESEND_FROM_EMAIL, or RESEND_TO_EMAIL.',
    });
  }

  const { name, email, subject, message } = req.body || {};
  const safeName = String(name || '').trim();
  const safeEmail = String(email || '').trim();
  const safeSubject = String(subject || '').trim();
  const safeMessage = String(message || '').trim();

  if (!safeName || !safeEmail || !safeSubject || !safeMessage) {
    return json(res, 400, {
      ok: false,
      error: 'name, email, subject, and message are required.',
    });
  }

  const emailPayload = {
    from,
    to: [to],
    reply_to: safeEmail,
    subject: `Portfolio Contact: ${safeSubject}`,
    text: [
      `Name: ${safeName}`,
      `Email: ${safeEmail}`,
      `Subject: ${safeSubject}`,
      '',
      'Message:',
      safeMessage,
    ].join('\n'),
  };

  try {
    const resendResponse = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      return json(res, 502, {
        ok: false,
        error: resendData?.message || 'Failed to send email with Resend.',
      });
    }

    return json(res, 200, { ok: true, id: resendData?.id });
  } catch (error) {
    return json(res, 500, {
      ok: false,
      error: 'Unexpected server error while sending email.',
      details: error?.message || 'unknown',
    });
  }
};
