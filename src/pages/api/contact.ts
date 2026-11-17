import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const name = String(body?.name || '').trim();
    const email = String(body?.email || '').trim();
    const message = String(body?.message || '').trim();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const smtpUser = process.env.SMTP_USER || import.meta.env.SMTP_USER || 'contact@camiswd.com';
    const smtpPass = process.env.SMTP_PASS || import.meta.env.SMTP_PASS || '';
    const smtpHost = process.env.SMTP_HOST || import.meta.env.SMTP_HOST || 'smtp.hostinger.com';
    const smtpPort = Number(process.env.SMTP_PORT || import.meta.env.SMTP_PORT || 465);

    if (!smtpPass) {
      console.warn('[Contact API] SMTP_PASS not configured; skipping email delivery.');
      return new Response(
        JSON.stringify({ ok: true, skipped: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"Portfólio Camila Ferreira" <${smtpUser}>`,
      to: 'contact@camiswd.com',
      replyTo: `"${name}" <${email}>`,
      subject: `[Portfólio] Nova mensagem de ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
      html: `<p><strong>Nome:</strong> ${name}</p><p><strong>E-mail:</strong> ${email}</p><p><strong>Mensagem:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
    });

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('[Contact API] Error sending email:', err);
    return new Response(
      JSON.stringify({ ok: false, error: 'Failed to send email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
