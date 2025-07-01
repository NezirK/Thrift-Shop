const User = require('../models/User');

// Merr të gjithë userat
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // mos kthe fjalëkalimet
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fshi user me id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};
