const usersService = require('../services/usersService');

const allUsers = async (_req, res) => {
    const result = await usersService.allUsers();
    return res.status(200).json(result);
};

const removeUser = async(req, res) => {
    const id = req.params.id;
    await usersService.removeUser(id);
    return res.status(200).json({message: 'Excluído com sucesso'});
}

module.exports = { allUsers, removeUser };