import nodemailer from "nodemailer";
import puppeteer from "puppeteer";
import fs from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const { user_email, cert_id } = body;

    if (!user_email || !cert_id) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing email or certificate ID",
        }),
        { status: 400 }
      );
    }

    // 1. Generate certificate HTML (replace with your logic)
    // You should fetch certificate data by cert_id and fill the template.
    // For demo, we use a simple HTML. Replace with your actual template logic.
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Certificate ${cert_id}</title>
          <style>
            body { font-family: Arial; }
            .cert-shell { border: 2px solid #c9a24a; padding: 40px; }
          </style>
        </head>
        <body>
          <div class="cert-shell">
            <h1>Restoration Certificate</h1>
            <p>ID: ${cert_id}</p>
            <p>This is your certificate.</p>
          </div>
        </body>
      </html>
    `;

    // 2. Generate PDF and save to public/certification
    const pdfDir = path.join(process.cwd(), "public", "certification");
    await fs.mkdir(pdfDir, { recursive: true });
    const pdfPath = path.join(pdfDir, `certificate_${cert_id}.pdf`);

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.pdf({ path: pdfPath, format: "A4", printBackground: true });
    await browser.close();

    // 3. Send email with PDF attachment
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user_email,
      subject: "Your PDF Certificate",
      text: "Hello! Please find your PDF attached.",
      attachments: [
        {
          filename: `certificate_${cert_id}.pdf`,
          path: pdfPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully",
        pdf_path: `/certification/certificate_${cert_id}.pdf`,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Error sending PDF email:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to send email" }),
      { status: 500 }
    );
  }
}
