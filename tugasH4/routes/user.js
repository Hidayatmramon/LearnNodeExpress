const express = require('express');
const router = express.Router();
const {
    getUserinfo,
    getUser,
    updateUser,
    deleteUser,
    createUser,
} = require('../controllers/UserController')

router.get('/', getUserinfo)

router.get('/:id', getUser)

router.post('/', createUser);

router.put('/:id', updateUser)

router.delete('/:id', deleteUser);

module.exports = router

