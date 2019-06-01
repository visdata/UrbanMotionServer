import fs from 'fs';
import path from 'path';
import csv from 'csvtojson'

const optCSV = (file) => {
    return new Promise((resolve, reject) => {
        let res = [];

        // 通过 csv 将文件切开
        csv({
            noheader: true
        })
            .fromFile(file)
            .on('csv', (csvRow) => {
                res.push({
                    from:{
                        lat:csvRow[2],
                        lng:csvRow[1]
                    },
                    to: {
                       lat:csvRow[5],
                       lng:csvRow[4]
                    }
                });
            })
            .on('done', (error) => {
                console.log(res.length)
                resolve(res);
            })
    });
}

export const queryODTripFlow = async ({
                                          ODResFileName,
                                          ODResFilePath,
                                      }) => {
    let file = path.resolve(ODResFilePath, ODResFileName),
        ifResExist = fs.existsSync(file),
        res = {};
    console.log('success')
    if (ifResExist) {
        res = await optCSV(file);
    }

    return res;
}