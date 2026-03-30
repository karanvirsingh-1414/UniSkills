const { Message, User } = require('../models');
const { Op } = require('sequelize');
exports.sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, content } = req.body;
        const message = await Message.create({ senderId, receiverId, content });
        const populatedMessage = await Message.findByPk(message.id, {
            include: [
                { model: User, as: 'sender', attributes: ['id', 'name', 'profilePic'] },
                { model: User, as: 'receiver', attributes: ['id', 'name', 'profilePic'] }
            ]
        });
        req.app.get('socketio').emit(`chat_${receiverId}`, populatedMessage);
        res.status(201).json(populatedMessage);
    } catch (err) {
         res.status(500).json({ error: err.message });
    }
};
exports.getChatHistory = async (req, res) => {
    try {
        const { user1Id, user2Id } = req.params;
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { senderId: user1Id, receiverId: user2Id },
                    { senderId: user2Id, receiverId: user1Id }
                ]
            },
            order: [['createdAt', 'ASC']],
            include: [
                { model: User, as: 'sender', attributes: ['id', 'name', 'profilePic'] }
            ]
        });
        res.status(200).json(messages);
    } catch (err) {
         res.status(500).json({ error: err.message });
    }
};
exports.getChatContacts = async (req, res) => {
    try {
         const { userId } = req.params;
         const contacts = await User.findAll({
             where: { id: { [Op.ne]: userId } },
             attributes: ['id', 'name', 'profilePic']
         });
         const contactsWithMeta = await Promise.all(contacts.map(async (contact) => {
             const raw = contact.toJSON();
             raw.unreadCount = await Message.count({
                 where: { senderId: raw.id, receiverId: userId, read: false }
             });
             const lastMsg = await Message.findOne({
                 where: {
                     [Op.or]: [
                         { senderId: raw.id, receiverId: userId },
                         { senderId: userId, receiverId: raw.id }
                     ]
                 },
                 order: [['createdAt', 'DESC']]
             });
             raw.lastMessage = lastMsg ? lastMsg.content : null;
             raw.lastMessageTime = lastMsg ? lastMsg.createdAt : null;
             return raw;
         }));
         contactsWithMeta.sort((a, b) => {
             if (!a.lastMessageTime) return 1;
             if (!b.lastMessageTime) return -1;
             return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
         });
         res.status(200).json(contactsWithMeta);
    } catch(err) {
         res.status(500).json({ error: err.message });
    }
};
exports.markMessagesAsSeen = async (req, res) => {
    try {
        const { myUserId, chatPartnerId } = req.body;
        await Message.update(
            { read: true }, 
            { where: { senderId: chatPartnerId, receiverId: myUserId, read: false } }
        );
        req.app.get('socketio').emit(`chat_seen_${chatPartnerId}`, { viewerId: myUserId });
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
