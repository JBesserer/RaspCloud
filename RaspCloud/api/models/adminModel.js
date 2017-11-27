const os = require('os');
const _ = require('underscore');

const pool  = require('../dbconnect/dbconnect');

class adminModel {
    constructor(email, lastname, firstname, type) {
        this.email = email;
        this.lastname = lastname;
        this.firstname = firstname;
        this.type = type;
    }

}

module.exports = adminModel;