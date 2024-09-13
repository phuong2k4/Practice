//test file
// console.log("file work correctly");

import inquirer from "inquirer";
import fs from "fs-extra";
import qr from "qr-image";

inquirer
    .prompt([
        {
            "message": "What qr-url you want to transfer?: ",
            "name":"url"
        }
    ])
    .then((answers)=>{
        const path_url = answers.url;
        const qr_svg = qr.image(path_url, {type: 'png'});
        qr_svg.pipe(fs.createWriteStream('qr.png'));
        fs.writeFile("url.txt", path_url, (err)=>{
            if(err) throw err;
        })
    })
    .catch((error)=>{
        if(error.isTtyError){

        }else{

        }
});