const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({message: "Welcome to persons API by Eduonix."});
});

require("./routes/person.routes.js")(app);

app.listen(8080, () => {
    console.log('Server is running on port 8080.');
})
