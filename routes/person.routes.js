module.exports = app => {
    const persons = require("../controllers/person.controller.js");

    // Create a new person
    app.post("/persons", persons.create);

    // Retrieve all persons
    app.get("/persons", persons.findAll);

    // Retrieve a single person with personId
    app.get("/persons/:personId", persons.findById);

    // Update a person with personId
    app.put("/persons/:personId", persons.update);

    // Update a person with personId
    app.patch("/persons/:personId", persons.update);

    // Delete a person with personId
    app.delete("/persons/:personId", persons.deleteById);

    // Delete all persons
    app.delete("/persons", persons.delete);
};
