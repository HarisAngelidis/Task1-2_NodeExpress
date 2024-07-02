const userRoleService = require('../services/userRoleService');
const userService = require('../services/userService');

async function getAllUserRoles(req, res) {
    try {
        const result = await userRoleService.getAllUserRoles();
        res.json(result);
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong` });
    }
}

async function addUserRole(req, res) {
    try {
        const { LastName, Role, FirstName, Age, DateOfBirth } = req.body;
        if (!LastName || !Role) {
            res.status(400).json({ msg: `The new user must have a last name and a role` });
            return;
        }
        const id = await userService.addUser(LastName, FirstName, Age, DateOfBirth);
        await userRoleService.addUserRole(id, Role);
        res.status(200).json({ msg: 'User added' });
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

async function updateUserRole(req, res) {
    const id = parseInt(req.params.id);
    const { Role } = req.body;
    try {
        const result = await userRoleService.getUserRoleById(id);
        if (!result.length) {
            res.status(400).json({ msg: `A user with that id does not exist` });
        } else {
            await userRoleService.updateUserRole(id, Role);
            res.status(200).json({ msg: 'Role updated' });
        }
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong` });
    }
}

async function getAdmins(req, res) {
    try {
        const result = await userRoleService.getAdmins();
        res.json(result);
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong` });
    }
}

async function getUsersByDateRole(req, res) {
    const { Apo, Mexri, Rolos } = req.params;
    try {
        const result = await userRoleService.getUsersByDateRole(Apo, Mexri, Rolos);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong` });
    }
}

module.exports = {
    getAllUserRoles,
    addUserRole,
    updateUserRole,
    getAdmins,
    getUsersByDateRole
};