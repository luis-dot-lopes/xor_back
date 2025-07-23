import nodemailer from 'nodemailer';

export async function sendConfirmationEmail(email, privateToken) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  const link = `https://seusite.com/user/loans/${privateToken}`;
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Confirmação de Empréstimo',
    html: `<p>Seu empréstimo foi registrado com sucesso.</p><p>Acesse seus dados clicando no link abaixo:</p><a href="${link}">${link}</a>`,
  };

  await transporter.sendMail(mailOptions);
}
