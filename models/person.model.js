const sql = require("./db.js");

const person = function(person) {
    this.name = person.name;
    this.weapon = person.weapon;
    this.power = person.power;
};

person.create = (newperson, result) => {
    sql.query("INSERT INTO persons SET ?", newperson, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        let person = {id: res.insertId, ...newperson};
        console.log("created person: ", person);
        result(null, person);
    });
};

person.findById = (personId, result) => {
    sql.query(`SELECT * FROM persons WHERE id = ${personId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found person: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found person with
        result({kind: "not_found"}, null);
    });
}

person.getAll = result => {
    sql.query("SELECT * FROM persons", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("persons: ", res);
        result(null, res);
    });
}

person.updateById = (id, person, result) => {
    sql.query(
        "UPDATE persons SET name = ?, weapon = ?, power = ? WHERE id = ?",
        [person.name, person.weapon, person.power, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                // not found person with id
                result({kind: "not_found"}, null);
                return;
            }

            let _person = { id: id, ...person };
            console.log("updated person: ", _person);
            result(null, _person);
        }
    );
}

person.remove = (id, result) => {
    sql.query("DELETE FROM persons WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found person with id
            result({kind: "not_found"}, null);
            return;
        }

        console.log("delete person with id: ", id);
        result(null, res);
    });
}

person.removeAll = result => {
    sql.query("DELETE FROM persons", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} persons`);
        result(null, res);
    });
}

module.exports = person;
