const userService = require('../services/userService');

const userController = {
  register: async (req, res) => {
    try {
      const user = await userService.registerUser(req, res);
      res.json({message: 'user registered'});
    } catch (error) {
      res.json({ error: error.message });
    }
  },

login: async (req, res) => {
  try{
    const token = await userService.loginUser (req, res);
    res.json({token});
  } catch (error){
    res.json({ error: error.message });
  }
}
// get prof

};

module.exports = userController;