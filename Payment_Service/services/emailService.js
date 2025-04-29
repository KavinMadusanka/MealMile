// services/emailService.js

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// ✅ Define transporter at top-level scope
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ Exported function that uses the above transporter
export const sendReceiptEmail = async (to, order) => {
  const mailOptions = {
    from: `"MealMile" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: '✅ Payment Confirmation - MealMile Receipt',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
        <h2 style="color: #28a745;">🎉 Payment Successful!</h2>
        <p>Hi there,</p>
        <p>Thank you for your order at <strong>MealMile</strong>! Your payment has been successfully processed.</p>

        <h3 style="margin-top: 30px;">🧾 Order Receipt</h3>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Order ID</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${order._id}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Amount Paid</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">LKR ${order.totalAmount}</td>
          </tr>
        </table>

        <p style="margin-top: 20px;">We hope you enjoy your meal! 🍽️</p>
        <p>If you have any questions, feel free to contact us at support@mealmile.com.</p>
        <br />
        <p>– The MealMile Team</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Receipt email sent:', info.messageId);
  } catch (error) {
    console.error('❌ Failed to send receipt email:', error);
  }
};
