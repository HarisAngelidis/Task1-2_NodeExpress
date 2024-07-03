const { queryDatabase } = require('../database/database-calls');

function getAllUserRoles() {
    return queryDatabase("SELECT * FROM Users u INNER JOIN UserRole UR on U.RoleID = UR.RoleID", []);
}



function updateUserRole(id, RoleID) {
    const query = `UPDATE Users SET Roleid = ? WHERE UserID = ?`;
    const values = [RoleID, id];
    return queryDatabase(query, values);
}

function getAdmins() {
    return queryDatabase("SELECT * FROM Users u INNER JOIN UserRole UR on U.RoleID = UR.RoleID WHERE Role='Administrator'", []);
}

function getUserRoleById(id) {
    return queryDatabase(`SELECT * FROM UserRole WHERE RoleId = ?`, [id]);
}

function getUsersByDateRole(ApoDate, MexriDate, Role) {
    const query = `SELECT * FROM Users u INNER JOIN UserRole UR ON U.RoleId = UR.RoleId WHERE DateOfBirth BETWEEN ? AND ? AND Role = ?`;
    const values = [ApoDate, MexriDate, Role];
    return queryDatabase(query, values);
}

module.exports = {
    getAllUserRoles,
    updateUserRole,
    getAdmins,
    getUserRoleById,
    getUsersByDateRole,
};