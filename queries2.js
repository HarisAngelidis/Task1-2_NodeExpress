const mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ForTheWin100",
    database: "users"
});

//ta queries gia to 2o task

//select xristes me ton  rolo toys
function SelectUserRole() {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM Users u INNER JOIN UserRole UR on U.UserID = UR.UserID", function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//prosthiki xristi me rolo
function AddUserRole(id, role) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO UserRole (UserID, Role) VALUES (?, ?)`;
        const values = [id, role];
        con.query(query, values, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//enhmerwsh rolou xrhsth
function UpdateUserRole(id, role) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE UserRole SET Role = ? WHERE UserID = ?`;
        con.query(query, [role, id], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//epilogh diaxeiristwn
function SelectAdmins() {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM Users u INNER JOIN UserRole UR on U.UserID = UR.UserID WHERE Role='Administrator'", function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//epistrofh olwn twn xrhstwn me sygkekrimeno id
function SelectUserRoleById(id) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM UserRole WHERE UserId=${id}`, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//epistrofh xrhstwn sygkekrimenoy roloy se ena evros hmeromhnias
function GetUsersByDateRole(ApoDate, MexriDate,Rolos) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Users u INNER JOIN UserRole UR ON U.UserId=UR.UserId WHERE DateOfBirth BETWEEN ? AND ? AND Role = ?`;
        con.query(query, [ApoDate, MexriDate,Rolos], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = { SelectUserRole,AddUserRole,UpdateUserRole,SelectAdmins,SelectUserRoleById,GetUsersByDateRole};