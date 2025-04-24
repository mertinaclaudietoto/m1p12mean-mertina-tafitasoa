const admin = require('firebase-admin');
const serviceAccount = require('./../../config/m1p12-mean-mertina-tafitasoa-firebase-adminsdk-fbsvc-de917c4a05.json');
const tokenFCM=require('../../models/notification/tokenFCM');
const { RULE } = require('../../data/RULE');

async function notifAfterRequestServiceCostumeur() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    const twentyFourHoursFromNow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    tokenFCM.find(
    {
        idrule: RULE.manager,
        expire: { $lt: twentyFourHoursFromNow }
    },
    'token'
    )
    .then(tokens => {
        const messages = tokens.map(t => {
            return admin.messaging().send({
                notification: {
                    title: '📅 Nouveau rendez-vous client',
                    body: 'Un client vient de demander un rendez-vous.',
                  },
              token: t.token,
              webpush: {
                fcmOptions: {
                  link: 'https://yourdomain.com/admin/rendez-vous'
                }
              }
            });
          });
          
          Promise.all(messages)
            .then(results => {
              console.log(`${results.length} notifications envoyées avec succès`);
            })
            .catch(error => {
              console.error('Erreur lors de l’envoi des notifications :', error);
            });
          
    })
    .catch(err => {
        console.error('Erreur lors de la récupération des tokens :', err);
    });
  }
  async function notifNewTacheMechanic() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    const twentyFourHoursFromNow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    tokenFCM.find(
    {
        idrule: RULE.mechanic,
        expire: { $lt: twentyFourHoursFromNow }
    },
    'token'
    )
    .then(tokens => {
        const messages = tokens.map(t => {
            return admin.messaging().send({
                notification: {
                    title: '📅Nouveau tachez client à réaliser',
                    body: 'Un manager a ajouté une tâche à votre travail',
                  },
              token: t.token,
              webpush: {
                fcmOptions: {
                  link: 'https://yourdomain.com/admin/rendez-vous'
                }
              }
            });
          });
          
          Promise.all(messages)
            .then(results => {
              console.log(`${results.length} notifications envoyées avec succès`);
            })
            .catch(error => {
              console.error('Erreur lors de l’envoi des notifications :', error);
            });
          
    })
    .catch(err => {
        console.error('Erreur lors de la récupération des tokens :', err);
    });
  }
module.exports = { notifAfterRequestServiceCostumeur,notifNewTacheMechanic };
  