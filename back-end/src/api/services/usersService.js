const models = require('../index');

const allUsers = async () => {
    const users = await models.User.findAll();
    return users
};

const removeUser = async (id) => {
    const user = await models.User.findOne({
        where: { id },
    });

    
    if (user) {
        await user.destroy();
    }
}

module.exports = { allUsers, removeUser };
