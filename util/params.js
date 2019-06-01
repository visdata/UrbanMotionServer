/**
 * MySQL 表名常量
 */
export const SQLParams = {
    ver: ['v1', 'v2'],
    nTableName: {
        'a': {
            'v1': 'anode',
            'v2': 'anodev2'
        },
        'g': {
            'v1': 'nodes',
            'v2': 'nodes'
        },
        'p': {
            'v1': 'pnode',
            'v2': 'pnode'
        }
    },
    eTableName: {
        'aa': {
            'v1': 'aaedge',
            'v2': 'aaedgev2'
        },
        'gg': {
            'v1': 'edges',
            'v2': 'edges'
        },
        'pp': {
            'v1': 'ppedge',
            'v2': 'ppedge'
        },
        'ap': {
            'v1': 'apedge',
            'v2': 'apedge'
        },
        'pa': {
            'v1': 'paedge',
            'v2': 'paedge'
        },
    }
}

/**
 * 将普通数值字符串转化为保留两位小数的字符�?
 * @param {String or Number} num 
 */
export const NumberToDecimal2 = (num) => {
    try {
        num = Number.parseFloat(num);
    } catch (error) {
        num = 0.10;
    } finally {
        return num.toFixed(2);
    }
}

/**
 * treeMap 传输参数初始化处�?
 * @param {*} queryParams 
 */
export const initTreeMapParams = (queryParams) => {
    let res = {}

    res.timeSegID = queryParams.timeSegID ? queryParams.timeSegID : '9';
    res.treeNumRate = queryParams.treeNumRate ? NumberToDecimal2(queryParams.treeNumRate) : '0.10';
    res.searchAngle = queryParams.searchAngle ? queryParams.searchAngle : 60;
    res.seedStrength = queryParams.seedStrength ? NumberToDecimal2(queryParams.seedStrength) : '0.10';
    res.treeWidth = queryParams.treeWidth ? queryParams.treeWidth : 1;
    res.spaceInterval = queryParams.spaceInterval ? queryParams.spaceInterval : 200;
    res.jumpLength = queryParams.jumpLength ? queryParams.jumpLength : 3;
    //res.jumpLength = res.treeWidth > 1 ? 1 : res.jumpLength;

    res.lineDirection = 'from'; // queryParams.lineDirection ? queryParams.lineDirection : 'from';
    res.seedUnit = queryParams.seedUnit ? queryParams.seedUnit : 'basic';
    res.gridDirNum = queryParams.gridDirNum ? queryParams.gridDirNum : -1;
    res.speedToShow = queryParams.speedToShow ? queryParams.speedToShow: 'all';
    res.gridSize = queryParams.gridSize ? queryParams.gridSize : 500
    res.city = queryParams.city ? queryParams.city : 'BJ';
    // console.log(queryParams.seedStrength);
    const FileName = `tmres-angle-${res.timeSegID}_${res.treeNumRate}_${res.searchAngle}_${res.seedStrength}_${res.treeWidth}_${res.jumpLength}_${res.seedUnit}_${res.gridDirNum}`;
    //let FilePath = `/datahouse/tripflow/${res.spaceInterval}/bj-byhour-res`;
    //let FilePath = `/datahouse/tripflow/weekendTest/bj-byhour-res`;
    //let FilePath = `/datahouse/tripflow/withoutFromTo/bj-byhour-res`;
    let FilePath = `/datahouse/tripflow/2019-30-800-BJ/bj-byhour-res`;
    if (res.city === 'TJ') {
        FilePath = `/datahouse/tripflow/2019-30-800-TJ/tj-byhour-res`;
    }
    if (res.city === 'TS') {
        FilePath = `/datahouse/tripflow/2019-30-800-TS/ts-byhour-res`;
    }
    //let FilePath = `/datahouse/tripflow/toCorrect/bj-byhour-res`;


    //res.PyInputPath = `/datahoause/tripflow/${res.spaceInterval}`;
    //res.PyInputPath = `/datahouse/tripflow/weekendTest`;
    //res.PyInputPath = `/datahouse/tripflow/withoutFromTo`;
    res.PyInputPath = `/datahouse/tripflow/2019-30-800-BJ`;
    if (res.city === 'TJ') {
        res.PyInputPath = `/datahouse/tripflow/2019-30-800-TJ`;
    }
    if (res.city === 'TS') {
        res.PyInputPath = `/datahouse/tripflow/2019-30-800-TS`;
    }
    //res.PyInputPath = `/datahouse/tripflow/toCorrect`;

    if (res.gridSize!= 500){
        FilePath = `/datahouse/hcc/grid-${res.gridSize}/bj-byhour-res`;
        res.PyInputPath = `/datahouse/hcc/grid-${res.gridSize}`;
    }
    // if(res.gridSize == 100){
    //     FilePath = `/datahouse/hcc/grid-100/bj-byhour-res`;
    //     res.PyInputPath = `/datahouse/hcc/grid-100`;
    // }
    // if(res.gridSize == 250){
    //     FilePath = `/datahouse/hcc/grid-250/bj-byhour-res`;
    //     res.PyInputPath = `/datahouse/hcc/grid-250`;
    // }
    // if(res.gridSize == 1000){
    //     FilePath = `/datahouse/hcc/grid-1000/bj-byhour-res`;
    //     res.PyInputPath = `/datahouse/hcc/grid-1000`;
    // }
    // if(res.gridSize == 2000){
    //     FilePath = `/datahouse/hcc/grid-2000/bj-byhour-res`;
    //     res.PyInputPath = `/datahouse/hcc/grid-2000`;
    // }



    // add
    if(res.speedToShow !== 'all'){
        FilePath = `/datahouse/hcc/${res.spaceInterval}/byspeedres/${res.speedToShow}/bj-byhour-res`;
        res.PyInputPath = `/datahouse/hcc/${res.spaceInterval}/byspeedres/${res.speedToShow}`
    }
    res.ResFileName = FileName;
    res.ResFilePath = FilePath;
    //res.PyFilePath = '/home/taojiang/git/statePrediction';
    res.PyFilePath = '/home/huangcc/git/statePrediction';
    res.PyFileName = 'treeMapCal.py';
    res.delta = queryParams.delta ? queryParams.delta : -1.0;
    res.maxDistance = queryParams.maxDistance ? queryParams.maxDistance : 9999;

    return res;
}

/**
 * 初始化角度聚类结果查询参�?
 * @param {*} params 
 */
export const initAngleClusterParams = (params) => {
    let res = {};

    res.timeSegID = params.timeSegID ? params.timeSegID : '9';
    res.eps = params.eps ? params.eps : 2.5;
    res.min_samples = params.min_samples ? params.min_samples : 300;

    res.PyInputPath = '/datahouse/tripflow/200';
    res.ResFileName = `acres-${res.timeSegID}`;
    res.ResFilePath = '/datahouse/tripflow/200/bj-byhour-res';
    res.PyFilePath = '/home/taojiang/git/statePrediction';
    res.PyFileName = 'angleClusterCal.py';

    return res;
}

/**
 * 初始化异常检测以及流量分布的输入参数
 * @param {*} param0 
 */
export const initAbnormalStatsParams = (params) => {
    let res = {};

    res.timeSegID = params.timeSegID ? params.timeSegID : '9';
    res.hourID = params.hourID ? params.hourID : '9';
    res.type = params.type ? params.type : 'flow';
    res.city = params.city ? params.city: 'BJ'
    res.AnoResFileName = `ano-${res.hourID}-${res.timeSegID}`;
    //res.AnoResFilePath = '/datahouse/hcc/bj-byhour-ano';
    //res.AnoResFilePath = '/datahouse/dongqian/bj-byhour-ano-LSTM';
    res.AnoResFilePath = '/datahouse/tripflow/Anomaly/bj-byhour-ano';
    res.RecResFileName = `devfreq-${res.timeSegID}.json`;
    res.RecResFilePath = '/datahouse/tripflow/test/bj-byhour-allRecordDevice';

    res.TDResFileName = `recfreq-${res.timeSegID}.json`;
    res.TDResFilePath = '/datahouse/tripflow/test/bj-byhour-freq';

    res.srcDstResFileName = `${res.hourID}-${res.timeSegID}`
    if(res.timeSegID >= 4000)
        res.srcDstResFileName = `${res.timeSegID}-${res.timeSegID}`
    res.srcDstResFilePath = '/datahouse/tripflow/SRCDST-'+res.city+'/'+res.city.toLowerCase()+'-byhour-res'
    return res;
}

export const initGidFlowStaticsParams = (params) => {
    let res = {}
    res.timeSegID = params.timeSegID ? params.timeSegID : 9;
    res.hourID = res.timeSegID % 24
    res.gid = params.gid ? params.gid : 0;
    res.type = params.type ? params.type : 'daily' ;
    res.totalDeviceResFilePath = '/datahouse/tripflow/Anomaly/bj-byhour-statics'
    res.city = params.city ? params.city:'BJ'
    res.totalDeviceResFileName = `${res.hourID}-${res.timeSegID}`
    if (res.city == 'TJ'){
        res.totalDeviceResFilePath = '/datahouse/tripflow/Anomaly/tj-byhour-statics'
    }
    res.ResFilePath = '/datahouse/tripflow/ano_detect/200/bj-byhour-io'
    res.TotalResFilePath = '/datahouse/zhtan/datasets/VIS-rawdata-region-c-v3/freq_and_stay'
    res.RecordResFilePath = '/datahouse/tripflow/test/bj-byhour-freq'
    res.RecordResFileName = 'recfreq-' + res.timeSegID
    return res;
}

/**
 * 初始化原始设备的od流相关参数
 * @param params
 * @returns {{}}
 */
export const initODTripFlowParams = (params) => {
    let res = {};

    res.timeSegID = params.timeSegID ? params.timeSegID : '9';
    res.hourID = params.hourID ? params.hourID : '9';
    res.type = params.type ? params.type : 'flow';
    res.ODResFileName = `traveldata-${res.timeSegID}`;
    res.ODResFilePath = '/datahouse/hcc/bj-byhour-dm';
    //res.RecResFileName = `recfreq-${res.timeSegID}.json`;
    //res.RecResFilePath = '/datahouse/tripflow/test/bj-byhour-freq';

    return res;
}

/**
 * 初始化著名企业地理位置相关参数
 * @param params
 * @returns {{}}
 */
export const initFamousEnterpriseParams = (params) => {
    let res = {};

    res.ResFileName = `famousEnterprise.json`;
    res.ResFilePath = '/datahouse/hcc/psychic-eureka/public/assets';
    //res.RecResFileName = `recfreq-${res.timeSegID}.json`;
    //res.RecResFilePath = '/datahouse/tripflow/test/bj-byhour-freq';

    return res;
}

export const initPersonalRecordsParams = (params) =>{
    let res = {};

    res.resFileName = `device-${params.travelId}`
    res.resFilePath = "/datahouse/tripflow/200/bj-bydevice-all"

    return res;
}