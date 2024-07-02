const userService = require('../services/userService');

async function getAllUsers(req, res) {
    try {
        const result = await userService.getAllUsers();
        res.json(result);
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong`});
    }
}

async function getUserById(req, res) {
    const id = parseInt(req.params.id);
    try {
        const result = await userService.getUserById(id);
        if (!result.length) {
            res.status(400).json({ msg: `A user with that id does not exist` });
        } else {
            res.json(result);
        }
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong` });
    }
}

async function addUser(req, res) {
    try {
        const { LastName, FirstName, Age, DateOfBirth } = req.body;
        if (!LastName) {
            res.status(400).json({ msg: `The new user must have a last name` });
            return;
        }
        await userService.addUser(LastName, FirstName, Age, DateOfBirth);
        res.status(200).json({ msg: 'User added' });
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

async function updateUser(req, res) {
    const id = parseInt(req.params.id);
    const { LastName, FirstName, Age, DateOfBirth } = req.body;
    try {
        const result = await userService.getUserById(id);
        if (!result.length) {
            res.status(400).json({ msg: `A user with that id does not exist` });
        } else {
            await userService.updateUser(id, LastName, FirstName, Age, DateOfBirth);
            res.status(200).json({ msg: 'User updated' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

async function deleteUser(req, res) {
    const id = parseInt(req.params.id);
    try {
        const result = await userService.getUserById(id);
        if (!result.length) {
            res.status(400).json({ msg: `A user with that id does not exist` });
        } else {
            await userService.deleteUser(id);
            res.json({ msg: 'User deleted' });
        }
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong` });
    }
}

async function getUsersByDate(req, res) {
    const { Apo, Mexri } = req.params;
    try {
        const result = await userService.getUsersByDate(Apo, Mexri);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong` });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    getUsersByDate
};