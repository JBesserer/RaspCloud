const os = require('os');
const _ = require('underscore');
const path = require('path');
const fs = require('fs');

const db = require('../dbconnect/dbconnect');
let dbconnect = new db();

const fakeDBPath = path.join(__dirname, '..', '..', 'resources', 'fakeDB');

class personModel {

	/**
	 * @param {Number} personID
	 * @param {Function} callback
	 * @param {Object} callback.err
	 * @param {Object} callback.person
	 */
	static find(personID, callback) {
		let filepath = path.join(fakeDBPath, personID + '.json');
		fs.readFile(filepath, 'utf8', (err, data) => {
			if (err && err.code === 'ENOENT') {
				console.log(`The person with id ${id} does not exist.`);
				callback(null, null);
				return;
			}
			if (err) {
				callback(err);
				return;
			}

			let jsonData = JSON.parse(data);
			let person = new personModel(jsonData.firstName, jsonData.lastName);
			person.id = jsonData.id;
			callback(null, person);
		});
	}

	static deletePerson(personID, callback) {
		let filepath = path.join(fakeDBPath, personID + '.json');
		fs.unlink(filepath, (err, data) => {
			if (err && err.code === 'ENOENT') {
				console.log(`The person with id ${id} does not exist.`);
				callback(null, null);
				return;
			}
			if (err) {
				callback(err);
				return;
			}

			callback(null);
		});
	}

	constructor(firstName, lastName) {
		this.id = Math.floor(Math.random() * 1000);
		this.firstName = firstName;
		this.lastName = lastName;
	}

	save(callback) {
		let filepath = path.join(fakeDBPath, this.id + '.json');
		fs.writeFile(filepath, JSON.stringify(this), 'utf8', (err) => {
			if (err) {
				callback(new Error(`Error while saving to file : ${err.message}`));
				return;
			}
			//Connection to MySQL DB and Insertion
			let personInsert = this;
            dbconnect.con.connect((err)=>{
				if(err) {
					callback(new Error('Error while connecting to DB'));
					return;
				}
				console.log("Connected!");
				let sql ="INSERT INTO person (id, firstName, lastName) VALUES ('"+personInsert.id+"','"+personInsert.firstName+"','"+personInsert.lastName+"')";
                dbconnect.con.query(sql, function(err,result){
					if(err){
                        callback(new Error('Error while inserting person table'));
                        return;
                    }
                    console.log("1 record inserted");
					callback(null,result);
				});
			});
			callback();
		});
	}

	toJSON() {
		return {
			id : this.id,
			firstName : this.firstName,
			lastName : this.lastName
		}
	}
}

module.exports = personModel;