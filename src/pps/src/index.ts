const fs = require('fs');
import pps from "./ppsDummyData";


function generatePPS() {
    const ppsFile = pps.generatePPSFile();

    fs.writeFile("./trollip.pps", ppsFile, function(err: any) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
});
}

generatePPS();