const Person = require("../models/person.model.js");

// Create a new Person
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty."
        });
    }

    // Create a Person
    const person = new Person({
        name: req.body.name,
        weapon: req.body.weapon,
        power: req.body.power
    });

    // Save the Person in the database
    Person.create(person, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while creating the Person."
            });
        } else {
            res.send(data);
        }
    });
};

// Retrieve all Person
exports.findAll = (req, res) => {
    Person.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving Person."
            });
        } else {
            res.send(data);
        }
    });
};

// Retrieve a single Person with personId
exports.findById = (req, res) => {
    Person.findById(req.params.personId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Person with id ${req.params.personId}.`
                });

            } else {
                res.status(500).send({
                    message: `Error retrieving Person with id ${req.params.personId}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

// Update a Person with personId
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty."
        });
    }

    Person.updateById(
        req.params.personId,
        new Person(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Person with id ${req.params.personId}.`
                    });

                } else {
                    res.status(500).send({
                        message: `Error updating person with id ${req.params.personId}.`
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
};

// Delete a Person with personID
exports.deleteById = (req, res) => {
    Person.remove(req.params.personId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found person with id ${req.params.personId}.`
                });

            } else {
                res.status(500).send({
                    message: `Error deleting person with id ${req.params.personId}.`
                });
            }

        } else {
            res.send({ message: "person deleted successfully!" });
        }
    });
};

// Delete all persons
exports.delete = (req, res) => {
    Person.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error ocurred while removing all persons."
            });
        } else {
            res.send({ message: "All persons were deleted successfully!" });
        }
    });
};
