export interface NotificationPayload {
  title: string;
  message: string;
  severity: "critical" | "recovery";
  timestamp: string;
  details?: Record<string, string | number | null>;
}

async function sendEmailNotification(payload: NotificationPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFICATION_EMAIL_TO;
  if (!apiKey || !toEmail) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "WatchAtlas Status <onboarding@resend.dev>",
        to: toEmail,
        subject: `[WatchAtlas] ${payload.title}`,
        html: `<h2>${payload.title}</h2><p>${payload.message}</p><p><small>${payload.timestamp}</small></p>`,
      }),
    });
    return res.ok;
  } catch {
    console.error("Email notification failed");
    return false;
  }
}

export async function sendAllNotifications(payload: NotificationPayload): Promise<void> {
  await Promise.allSettled([
    sendEmailNotification(payload),
  ]);
}
