const userRoleService = require('../services/userRoleService');
const userService = require('../services/userService');

async function getAllUserRoles(req, res) {
    try {
        const result = await userRoleService.getAllUserRoles();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong` });
    }
}





/*async function addUserRole(req, res) {
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
}*/

async function updateUserRole(req, res) {
    const id = parseInt(req.params.id);
    const  RoleId  = req.body.RoleId;

    const exists = await userRoleService.getUserRoleById(RoleId);
      
    if(!exists.length>0){
        res.status(400).json({ msg: `The role id does not exist` });
        return;
    }
    try {
        const result = await userService.getUserById(id);
        console.log(result);
        if (!result.length) {
            res.status(400).json({ msg: `A user with that id does not exist` });
        } else {
            console.log(id,RoleId);
            await userRoleService.updateUserRole(id, RoleId);
            res.status(200).json({ msg: 'RoleId updated' });
        }
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong` });
    }
}

async function getAdmins(req, res) {
    try {
        const result = await userRoleService.getAdmins();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong` });
    }
}

async function getUsersByDateRole(req, res) {
    const  Rolos  = req.params.role;

    const Apo = req.query.Apo;
    const Mexri = req.query.Mexri;

    try {
        const result = await userRoleService.getUsersByDateRole(Apo, Mexri, Rolos);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong` });
    }
}

module.exports = {
    getAllUserRoles,
    //addUserRole,
    updateUserRole,
    getAdmins,
    getUsersByDateRole,
  
};