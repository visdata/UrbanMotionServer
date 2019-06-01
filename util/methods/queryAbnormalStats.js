import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';
import {
    parseFormatGID
} from '../base';

/**
 * 基于给定的第三栏属性进行从高到低的排列
 * @param {*} a 
 * @param {*} b 
 */
const reverseSort = (index) => {
    return (a, b) => {
        return b[index] - a[index];
    }
}

/**
 * 读取 CSV 文件并组成 JSON 格式对象返回
 * @param {*} file 
 */
const optCSV = (file, cols, type, city) => {
    return new Promise((resolve, reject) => {
        let res = {
            'from': [],
            'to': []
        };
        if(type == "freq" || type == "stay" || type == "flow"){
            res = []
        }

        // 通过 csv 将文件切开
        csv({
                noheader: true
            })
            .fromFile(file)
            .on('csv', (csvRow) => {
                let [gid] = csvRow;
                const {
                    lat,
                    lng
                } = parseFormatGID(gid, city);


                if(cols.length > 1 && type!== "flow"){
                    let fromArray = [gid, lng, lat, Number.parseFloat(csvRow[cols[0]])],
                        toArray = [gid, lng, lat, Number.parseFloat(csvRow[cols[1]])];

                    cols.forEach(e => {

                    })
                    res['from'].push(fromArray);
                    res['to'].push(toArray);
                }
                else if(type == "flow"){
                    let arr = [gid, lng, lat, Number.parseFloat(csvRow[cols[1]]) - Number.parseFloat(csvRow[cols[0]]) ]
                    if (gid == "29076"){
                        arr[3] = Number.parseFloat(csvRow[cols[1]])
                    }
                    res.push(arr)
                }
                else {
                    //console.log(cols)
                    //console.log(csvRow[cols[0]])
                    let arr = [gid, lng, lat, Number.parseFloat(csvRow[cols[0]])]
                    res.push(arr)
                }

            })
            .on('done', (error) => {
                if(cols.length > 1 && type !== "flow"){
                    res['from'].sort(reverseSort(3));
                    res['to'].sort(reverseSort(3));
                }
                else {
                    res.sort(reverseSort(3))
                }
                resolve(res);
            })
    });
}

/**
 * 异常值查询数据列对应查询表
 */
const abnormalNameList = {
    'flow': [1, 2],
    'record': [-1],
    'ano1': [3, 4],
    'ano2': [5, 6],
    'freq': [7],
    'stay': [8]
}


export const queryAbnormalStats = async ({
    AnoResFileName,
    AnoResFilePath,
    RecResFileName,
    RecResFilePath,
    TDResFileName,
    TDResFilePath,
    srcDstResFileName,
    srcDstResFilePath,
    type,
    city
}) => {
   //let ResFileName = type === 'record' ? RecResFileName : ( type === 'travel' ? TDResFileName : AnoResFileName),
        //ResFilePath = type === 'record' ? RecResFilePath : (type === 'travel' ? TDResFilePath : AnoResFilePath);
    let ResFileName;
    let ResFilePath;
    if(type === 'record'){
        ResFileName = RecResFileName
        ResFilePath = RecResFilePath
    }
    else if(type === 'travel'){
        ResFilePath = TDResFilePath
        ResFileName = TDResFileName
    }
    else if(type === 'flow'){
        ResFileName = srcDstResFileName
        ResFilePath = srcDstResFilePath
    }
    else{
        ResFileName = AnoResFileName
        ResFilePath = AnoResFilePath
    }
    let file = path.resolve(ResFilePath, ResFileName),
        ifResExist = fs.existsSync(file),
        res = {};
    if (ifResExist) {
        res = (type === 'record' || type === 'travel') ? JSON.parse(fs.readFileSync(file)) : await optCSV(file, abnormalNameList[type], type, city);
    }

    return res;
}

