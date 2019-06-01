import fs from 'fs';
import path from 'path';

export const queryFamousEnterprise = async ({
                                          ResFileName,
                                          ResFilePath,
                                      }) => {
    let file = path.resolve(ResFilePath, ResFileName),
        ifResExist = fs.existsSync(file),
        res = {};
    console.log('success')
    console.log(file)
    if (ifResExist) {
        console.log(fs.readFileSync(file,'utf8'))
        res = JSON.parse(JSON.stringify(fs.readFileSync(file,'utf8').substring(1)));
    }
    return res;
}