const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// SOMETHING HERE MIGHT BE WRONG-- CHECK ALL ROUTES

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product,  as: "products"}]
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryID = await Category.findByPk(req.params.id, {
      include: [{ model: Product,  as: "products"}]
    });
    if (!categoryID) {
      res.status(404).json({message: "Category not found. Please try again."});
      return;
    }
    res.status(200).json(categoryID);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json({message: `The following new category was created successfully: ${newCategory}`});
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const update = await Category.update(req.body, {
      where : {id: req.params.id}
    });
    if (!update){
      res.status(404).json({message: "There is no category with this ID"});
      return;
    }
    res.status(200).json(update);
  } catch (error) {
    res.status(400).json(error);
  }
  // update a category by its `id` value
  // DOUBLE CHECK
});

router.delete('/:id', async (req, res) => {
  try {
    const deleterow = await Category.destroy({
      where: {id: req.params.id}
    });
    if (!deleterow){
      res.status(404).json({message: "There is no category with this ID."});
      return;
    }
    res.status(200).json({message: `You have successfully deleted this row.`})
  } catch (error) {
    res.status(400).json(error);
  }
  // delete a category by its `id` value
});

module.exports = router;
