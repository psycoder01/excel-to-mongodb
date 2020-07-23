const fs = require("fs");
const dbFunctions = require("./db");
const exlToJ = require("convert-excel-to-json");

const excelUpload = async (req, res) => {
    const excelData = exlToJ({
        sourceFile: __basedir + "/uploads/" + req.file.filename,
        sheets: [
            {
                name: "Sheet1",
                header: {
                    rows: 1
                },
                columnToKey: {
                    A: "Name",
                    B: "Address",
                    C: "Age"
                }
            }
        ]
    });
    //Deleting the file
    fs.unlink(__basedir + "/uploads/" + req.file.filename, err => {
        if (err) throw err;
        console.log("Uploaded file is deleted!");
    });

    try {
        const duplicates = await dbFunctions.dbSearch(excelData.Sheet1);
        if (duplicates.length > 0) {
            res.json({messege:"Existing Name Found",values : duplicates});
            res.end();
        } else {
            dbFunctions.dbInsert(excelData.Sheet1);
            res.send("Stored in Database!");
        }
    } catch (err) {
        console.log(err);
    }
    //res.send("Operation successful!");
};

module.exports = { excelUpload };
