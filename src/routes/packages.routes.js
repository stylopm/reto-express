const { Router } = require('express');
const { createPackage, deletePackage, getPackage, updatePackage } = require('../controllers/package.controllers');
const auth = require('../middlewares/authorization')
const router = Router();
router.get('/', getPackage)
router.post('/', createPackage)
router.put('/:id', updatePackage)
router.delete('/:id', deletePackage)
module.exports = router;