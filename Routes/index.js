const router = require("express")();
const ctrl = require("../Controllers");
const upload = require("../Middlewares/multer");

router.get("", (req, res) => {
    res.send("welcome!!!");
});

router.post("/upload", upload, ctrl.excelUpload);

module.exports = router;
