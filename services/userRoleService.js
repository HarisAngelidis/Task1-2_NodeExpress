const { queryDatabase } = require('../database/database-calls');

function getAllUserRoles() {
    return queryDatabase("SELECT * FROM Users u INNER JOIN UserRole UR on U.UserID = UR.UserID", []);
}

function addUserRole(id, role) {
    const query = `INSERT INTO UserRole (UserID, Role) VALUES (?, ?)`;
    const values = [id, role];
    return queryDatabase(query, values);
}

function updateUserRole(id, role) {
    const query = `UPDATE UserRole SET Role = ? WHERE UserID = ?`;
    const values = [role, id];
    return queryDatabase(query, values);
}

function getAdmins() {
    return queryDatabase("SELECT * FROM Users u INNER JOIN UserRole UR on U.UserID = UR.UserID WHERE Role='Administrator'", []);
}

function getUserRoleById(id) {
    return queryDatabase(`SELECT * FROM UserRole WHERE UserId = ?`, [id]);
}

function getUsersByDateRole(ApoDate, MexriDate, Role) {
    const query = `SELECT * FROM Users u INNER JOIN UserRole UR ON U.UserId = UR.UserId WHERE DateOfBirth BETWEEN ? AND ? AND Role = ?`;
    const values = [ApoDate, MexriDate, Role];
    return queryDatabase(query, values);
}

module.exports = {
    getAllUserRoles,
    addUserRole,
    updateUserRole,
    getAdmins,
    getUserRoleById,
    getUsersByDateRole
};