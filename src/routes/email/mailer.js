require('dotenv').config();
const nodemailer = require('nodemailer');
// Configuration SMTP (exemple avec Gmail, mais adaptable à d'autres services)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Fonction pour envoyer un email de validation
const sendValidationEmail = async (to, token) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Validation de votre compte',
      html: `<p>Bienvenue ! Cliquez sur le lien pour valider votre compte :</p>
             <a href="${process.env.LINK_APP}register?token=${token}">Valider mon compte</a>`
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé :', info.response);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
  }
};
// Exporte la fonction
module.exports = sendValidationEmail;
