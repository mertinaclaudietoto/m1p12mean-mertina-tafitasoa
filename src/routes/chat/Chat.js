const express = require('express');
const router = express.Router();
const Chat = require('../../models/chat/Chat');
const ApiResponse = require('../../models/apiResponse/ApiResponse');
const mongoose = require('mongoose');

// funciton save message
router.post('/', async (req, res) => {
    try {
        await setReadMessage(req.body.sender, req.body.receiver);
        const values = new Chat(req.body);
        await values.save();
       // code send notification firebase tout the receveid
        res.json(ApiResponse.success(`message saved `,values));
    } catch (error) {
        res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: error.message }]));
    }
});
// get all conversation for the manager

// get conversation of to users
// must have a infiniti scroll thorward last conversation
router.get('/getconv/:user1/:user2', async (req, res) => {
  // user1 sender user2 user connected
  const { user1, user2 } = req.params;
  const msgs = await Chat.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 }
    ]
  }).sort({ timestamp: 1 }) 
    .populate('sender', 'name firstName picture isConnected lastConnection')
    .populate('receiver', 'name firstName picture isConnected lastConnection');
  let message = [];
  let sender = null;
  let userConnected = null;
  msgs.forEach(mes => {
    message.push({
      content: mes.content,
      timestamp: mes.timestamp,
      isRead: mes.isRead,
      isLeft:mes.sender._id == user1 ?true :false
    })

  })
  // condition for get information of the two users
  if (msgs.length > 0) {
    if (msgs[0].sender._id == user1) {
      sender = msgs[0].sender;
    } else {
      sender = msgs[0].receiver;
    }
    if (msgs[0].sender._id == user2) {
      userConnected =  msgs[0].sender;
    } else {
      userConnected =  msgs[0].receiver;
    }
  }

  res.json(ApiResponse.success(`all conversation geted`,{sender,userConnected,message}));
});

async function setReadMessage(sender, receiver) {
  const lastMessage = await Chat.findOne({
      $or: [
            { sender, receiver },
            { sender: receiver, receiver: sender }
        ]
  }).sort({ timestamp: -1 });
   
    if (lastMessage) {
        
        lastMessage.islastMessage = false;
        await lastMessage.save();
     }
    if (
      lastMessage && // verify if the last message is not null
      lastMessage.sender.toString() === receiver &&  
      lastMessage.isRead === false
    ) {
      // set as read
      lastMessage.isRead = true;
      await lastMessage.save();
    } 
}
// get all the laste conversation of the user 
router.get('/listechatuser/:id', async (req, res) => {
    try {
        // console.log("userId");
    const userId = new mongoose.Types.ObjectId(req.params.id);
    // 1. Récupérer tous les messages liés à l'utilisateur
    const allMessage = await Chat.find({
      $or: [{ sender: userId }, { receiver: userId }],
      islastMessage: true
    })
    .sort({ timestamp: -1 }) 
    .populate({
      path: 'sender',
      select: 'name firstName picture isConnected lastConnection rule',
      populate: {
        path: 'rule',
        select: '_id' // ou les champs que tu veux dans la collection "rule"
      }
    }).populate({
        path: 'sender',
        select: 'name firstName picture isConnected lastConnection rule',
        populate: {
          path: 'rule',
          select: '_id' // ou les champs que tu veux dans la collection "rule"
        }
      })

    const formatValue = [];
      allMessage.forEach(msg => {
        // console.log(msg);
        let otherUser;
        let isGras = true;
      
        
        if (!msg.sender._id.equals(userId) ) {
            otherUser = msg.sender;
            isGras = true;
        } else if(!msg.receiver._id.equals(userId)) {
            otherUser =  msg.receiver;
            isGras = false;
        } 
      // console.log(otherUser);
      formatValue.push({
            _id: otherUser._id,
            name: otherUser.name,
            firstName: otherUser.firstName,
            picture: otherUser.picture,
            isConnected: otherUser.isConnected,
            lastConnection: otherUser.lastConnection,
            content: msg.content,
            timestamp: msg.timestamp,
            isRead: msg.isRead,
            isConnected: msg.isConnected,
            isGras: isGras,
            idrule:otherUser.rule._id,
        });
    });
    return res.json(ApiResponse.success('Derniers messages récupérés', formatValue));
  } catch (error) {
    console.error(error);
    return res.status(500).json(ApiResponse.error('Erreur serveur', [{ message: error.message }]));
  }
});

module.exports = router;