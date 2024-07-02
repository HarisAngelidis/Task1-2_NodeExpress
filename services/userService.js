const  {queryDatabase }= require('../database/database-calls');

function getAllUsers() {
    return queryDatabase("SELECT * FROM Users", []);
}

function getUserById(id) {
    return queryDatabase("SELECT * FROM Users WHERE UserId = ?", [id]);
}

function addUser(lastname, firstname, age, dateofbirth) {
    const query = `INSERT INTO Users (LastName, FirstName, Age, DateOfBirth) VALUES (?, ?, ?, ?)`;
    const values = [lastname, firstname, age, dateofbirth];
    return queryDatabase(query, values).then(result => result.insertId);
}

function updateUser(id, lastname, firstname, age, dateofbirth) {
    const query = `UPDATE Users SET LastName = ?, FirstName = ?, Age = ?, DateOfBirth = ? WHERE UserId = ?`;
    const values = [lastname, firstname, age, dateofbirth, id];
    return queryDatabase(query, values);
}

function deleteUser(id) {
    return queryDatabase("DELETE FROM Users WHERE UserId = ?", [id]);
}

function getUsersByDate(ApoDate, MexriDate) {
    const query = `SELECT * FROM Users WHERE DateOfBirth BETWEEN ? AND ?`;
    const values = [ApoDate, MexriDate];
    return queryDatabase(query, values);
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    getUsersByDate
};