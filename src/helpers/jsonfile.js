const { json } = require('express');
const fs = require('fs');
const pathdir = require('path');
const { resolve } = require('path');



function readFile(path) {
    return new Promise((resolve, reject) => {
        const newPath = pathdir.join(__dirname, path);
        fs.readFile(newPath, 'utf8', (err, data) => {

            if (err) {
                //reject(new Error(`Can't read file from ${path}`));
                reject(err);
            } else {
                const jsondata = JSON.parse(data);
                resolve(jsondata);
            }
        
        });
    })
}


function writeFile(path, jsondata) {
    return new Promise((resolve, reject) => {
        const newPath = pathdir.join(__dirname, path);
        const data = JSON.stringify(jsondata);
        fs.writeFile(newPath, data, 'utf8', (err) => {

            if (err) {
                //reject(new Error(`Can't write to file ${path}`));
                reject(err);
            } else {
                resolve(true);
            }
        
        });
    });
}


module.exports = {
    readFile, 
    writeFile
}