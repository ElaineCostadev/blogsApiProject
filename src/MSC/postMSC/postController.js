const postService = require('./postService');

const postController = {
  getAll: async (req, res) => {
    const result = await postService.getAll();
    return res.status(200).json(result);
  },

  create: async (req, res) => {
    try {
      // peguei o email que vem do token na rota do login - tokenValidation
      const { email } = req.email;
      // console.log(email, 'email Controller');
      const { title, content, categoryIds, userId } = req.body;
      const result = await postService.create({ title, content, categoryIds, userId, email });
      // console.log(result, 'result do Controller');
      res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({ message: '"categoryIds" not found' });
    }
  },
};

module.exports = postController;