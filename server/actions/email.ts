import nodemailer from "nodemailer";

type Payload = {
  to: string;
  subject: string;
  html: string;
};

const smtpSettings = {
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
};

export const sendVerificationToken = async (data: Payload) => {
  const transporter = nodemailer.createTransport({
    ...smtpSettings,
  });

  return await transporter.sendMail({
    from: process.env.SMTP_FROM,
    ...data,
  });
};
