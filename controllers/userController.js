const userService = require('../services/userService');
const userRoleService = require('../services/userRoleService');

async function getAllUsers(req, res) {
    try {
        const result = await userService.getAllUsers();
        res.status(200).json({ result});
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
            res.status(200).json(result);
        }
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong` });
    }
}

async function addUser(req, res) {
    try {
        const { LastName, FirstName, Age, DateOfBirth, RoleId} = req.body;
        
        if (!LastName || !RoleId) {
            res.status(400).json({ msg: `The new user must have a last name and a role id` });
            return;
        }

        
        const exists = await userRoleService.getUserRoleById(RoleId);

        console.log(exists);
      
        if(!exists.length>0){
            res.status(400).json({ msg: `The role id does not exist` });
            return;
        }
        
        await userService.addUser(LastName, FirstName, Age, DateOfBirth,RoleId);
        res.status(200).json({ msg: 'User added' });
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

async function updateUser(req, res) {
    const id = parseInt(req.params.id);
    const { LastName, FirstName, Age, DateOfBirth,RoleId } = req.body;

    if (!LastName || !RoleId) {
        res.status(400).json({ msg: `The updated user must have a last name and a role id` });
        return;
    }
    const exists = await userRoleService.getUserRoleById(RoleId);
   
    if(!exists.length>0){
        res.status(400).json({ msg: `The role id does not exist` });
        return;
    }

    try {
        const result = await userService.getUserById(id);
        if (!result.length) {
            res.status(400).json({ msg: `A user with that id does not exist` });
        } else {
            await userService.updateUser(id, LastName, FirstName, Age, DateOfBirth,RoleId);
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
            res.status(200).json({ msg: 'User deleted' });
        }
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong` });
    }
}

async function getUsersByDate(req, res) {

    console.log("d");
    const Apo = req.query.Apo;
    const Mexri = req.query.Mexri;

    console.log(`Apo: ${Apo}, Mexri: ${Mexri}`);
    try {
        const result = await userService.getUsersByDate(Apo, Mexri);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong` });
    }}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    getUsersByDate
};