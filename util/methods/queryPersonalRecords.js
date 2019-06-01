import fs from 'fs';
import path from 'path';


export const queryPersonalRecords = async ({
                                              resFilePath, resFileName
                                          }) => {
    let res = {}
    let file = path.resolve(resFilePath, resFileName),
        ifResExist = fs.existsSync(file)

    console.log(file)
    console.log(ifResExist)
    if (ifResExist) {
        res =  fs.readFileSync(file).toString().split('\n').slice(0, 100000)
        //console.log(res)
        //await optCSV(file,
    }
    return res
}

