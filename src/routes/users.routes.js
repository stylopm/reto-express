const { Router } = require('express');
const { getUsers, createUser, loginUser, verifyUser, updateUser, deleteUser } = require('../controllers/users.controllers');
const router = Router();
const auth = require('./../middlewares/authorization')
//localhost:5000/users/list
router.get('/list', auth, getUsers);
//localhost:5000/users/signup
router.post('/signup', createUser);
//localhost:5000/users/login
router.post('/login', loginUser);
//localhost:5000/users/verify
router.get('/verify', auth, verifyUser);
//localhost:5000/users/update
router.put('/update', auth, updateUser);
//localhost:5000/users/delete
router.delete('/delete', auth, deleteUser);
module.exports = router;