import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.example.com', // Replace with your SMTP server
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'your-email@example.com', // Replace with your email
        pass: 'your-email-password', // Replace with your email password
      },
    });

    // Set up email data with unicode symbols
    let mailOptions = {
      from: email,
      to: 'afefischer@gmail.com', // Replace with your admin email
      subject: `Contact form submission from ${name}`,
      text: message,
    };

    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
