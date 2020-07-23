const app = require("express")();
const cors = require("cors");
const routes = require("./Routes");
global.__basedir = __dirname;
app.use(cors());

app.use("/", routes);

//Server Port connection
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
