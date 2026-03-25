const Session = require('../models/Session');

const createSession = async (req, res) => {
  try {
    const { topic, mentorId, studentId, creditsTransferred } = req.body;
    
    const session = await Session.create({
      topic,
      mentorId,
      studentId,
      creditsTransferred: creditsTransferred || 0,
      status: 'active'
    });

    res.status(201).json({ message: 'Session created successfully', session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const endSession = async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    const session = await Session.findByPk(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    session.status = 'completed';
    await session.save();

    res.status(200).json({ message: 'Session ended successfully', session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createSession, endSession };
