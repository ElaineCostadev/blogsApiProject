const postService = require('./postService');

const postController = {
  getAll: async (req, res) => {
    const result = await postService.getAll();
    return res.status(200).json(result);
  },

  getByPk: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await postService.getByPk(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      // peguei o email que vem do token na rota do login - tokenValidation
      const { email } = req.email;

      const { title, content, categoryIds, userId } = req.body;
      const result = await postService.create({ title, content, categoryIds, userId, email });

      res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
  },

  update: async (req, res) => {
    const { title, content } = req.body;
    try {
      const { id } = req.params;
      const { email } = req.email;
      const result = await postService.update({ email, id, title, content });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    const { email } = req.email;
    try {
      await postService.destroy({ id, email });
      return res.status(204).end();
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  },

  search: async (req, res) => {
    const title = req.query.q;
    const result = await postService.search(title);
    return res.status(200).json(result);
  },
};

module.exports = postController;