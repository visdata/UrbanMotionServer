import fs from 'fs';
import path from 'path';

/**
 * 异常值查询数据列对应查询表
 */
const abnormalNameList = {
    'flow': [1, 2],
    'record': [-1],
    'ano1': [3, 4],
    'ano2': [5, 6]
}

const getGidFolow = (file, timeId, gid, totalFile, recordFile) => {
    return new Promise((resolve, reject) => {
        let ifResExist = fs.existsSync(file)
        let ifTotalResExist = fs.existsSync(totalFile)
        if (!ifResExist || !ifTotalResExist) {
            reject( {
                "error":"file not exits",
                "file":file,
                "totalFile": totalFile
            })
        }
        fs.readFile(file, function (err, data) {
            if (err) {
                return console.error(err);
            }
            //console.log(data.toString())
            let ioList = data.toString().split('\n')
            let res;
            if (gid < ioList.length) {
                res = (ioList[gid].split(',').concat(timeId))
            } else {
                res = ([gid, 0 ,0, timeId])
            }
            fs.readFile(totalFile, function (err, totaldata) {
                if (err) {
                    return console.error(err);
                }
                let records = totaldata.toString().split('\n')
                if(gid < records.length){
                    let record = records[gid].split(',')
                    res.push(record[1])
                    res.push(record[2])
                    //resolve(res)
                }
                else {
                    res.push(0)
                    res.push(0)
                    //resolve(res)
                }
                fs.readFile(recordFile, function (err, recordData) {
                    if (err) {
                        return console.error(err);
                    }
                    let records = recordData.toString().split('\n')
                    if(gid < records.length){
                        let record = records[gid].split(',')
                        res.push(record[3])
                        resolve(res)
                    }
                    else {
                        res.push(0)
                        //res.push(0)
                        resolve(res)
                    }
                })
            })
        });
    })
}

const getGidFolowTotalDevice = (totalDeviceFile, timeId, gid) => {
    return new Promise((resolve, reject) => {
        let ifResExist = fs.existsSync(totalDeviceFile)
        if (!ifResExist) {
            reject( {
                "error":"file not exits",
                "totalDeviceFile":totalDeviceFile,
            })
        }
        fs.readFile(totalDeviceFile, function (err, data) {
            if (err) {
                return console.error(err);
            }
            //console.log(data.toString())
            let ioList = data.toString().split('\n')
            let res;
            if (gid < ioList.length) {
                res = (ioList[gid].split(',').concat(timeId))
            } else {
                res = ([gid, 0, 0, 0,timeId])
            }
            resolve(res)
        })
    })
}
export const queryGidFlowStatics = async ({
                                              timeSegID,
                                             gid,
                                             ResFilePath,
                                              TotalResFilePath,
                                              totalDeviceResFilePath,
                                              totalDeviceResFileName,
                                                hourID,
                                             type,
                                              RecordResFilePath,
                                              RecordResFileName
                                         }) => {

    gid = parseInt(gid)
    timeSegID = parseInt(timeSegID)
    let file,totalFile, recordFile,totalDeviceFile,  ioList,PromiseList = [];
    // 查看当天的情况
    if (type === 'daily') {

        for (var i = 0;i<24;i++){
            let timeId = Math.floor(timeSegID/24) * 24 + i;
            let filename = timeId % 24 + "-" + timeId
            totalDeviceFile = path.resolve(totalDeviceResFilePath, filename);
            PromiseList.push(getGidFolowTotalDevice(totalDeviceFile, timeId, gid))
            // let recordfile = 'recfreq-' + timeId
            // file = path.resolve(ResFilePath, filename);
            // totalFile = path.resolve(TotalResFilePath, filename)
            // recordFile = path.resolve(RecordResFilePath, recordfile)
            // PromiseList.push(getGidFolow(file, timeId, gid, totalFile, recordFile))
        }
        return Promise.all(PromiseList)
    }
    if (type == 'total'){
        //查看整个80天该小时的数据
        var i = 7
        while (i*24 + hourID < 2088){
            let timeId = i*24 + hourID;
            let filename = timeId % 24 + "-" + timeId
            console.log(filename)
            totalDeviceFile = path.resolve(totalDeviceResFilePath, filename);
            PromiseList.push(getGidFolowTotalDevice(totalDeviceFile, timeId, gid))
            i++
        }
        return Promise.all(PromiseList)
    }

    // 查看一周以内当前小时的情况
    // if (type === 'weekly') {
    //
    //     for (var i = 0;i<24;i++){
    //         let timeId = Math.floor(timeSegId/24) * 24 + i;
    //         let filename = timeId % 24 + "-" + timeId
    //
    //         let file = path.resolve(ResFilePath, filename);
    //         fs.readFile('input.txt', function (err, data) {
    //             if (err) {
    //                 return console.error(err);
    //             }
    //             let ioList = data.split('\n')
    //             if (gid < ioList.length) {
    //                 resList.push(ioList[gid].split(','))
    //             } else {
    //                 resList.push([gid, 0 ,0])
    //             }
    //         });
    //
    //
    //     }
    //
    // }
    //
}

