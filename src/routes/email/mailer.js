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
const sendValidationEmailWithInvoice = async (to, clientName,invoiceNumber, pdfBuffer) => {
  try {
    // Configuration de l'email avec les pièces jointes
    const mailOptions = {
      from: process.env.EMAIL_USER,  // Ton email de l'expéditeur
      to,  // L'email du destinataire
      subject: 'Votre Facture de GARAGE N-TSIKA pour votre services',
      html: `
        <p>Bonjour ${clientName},</p>
        <p>Nous vous remercions pour votre achat ! Vous trouverez ci-joint la facture correspondant à votre commande.</p>
        <p><strong>Numéro de la facture : ${invoiceNumber}</strong></p>
        <p>Merci de faire confiance à notre entreprise. Nous espérons vous revoir bientôt pour de nouvelles services !</p>
        <p>Cordialement,</p>
        <p><strong>L'équipe de GARAGE N-TSIKA </strong></p>
        <p><em>Si vous avez des questions, n'hésitez pas à nous contacter.</em></p>`,
      attachments: [
        {
          filename: 'facture.pdf',  
          content: pdfBuffer,  
          encoding: 'base64' 
        }
      ]
    };
    // Envoi de l'email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé :', info.response);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
  }
};

// Exporte la fonction
module.exports = {sendValidationEmail,sendValidationEmailWithInvoice};
