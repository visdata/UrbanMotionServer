const Router = require('koa-router');
const router = new Router({
    prefix: '/api'
});
import * as api from '../api/v1/index.js';

router
    .get('/testGraph', api.testGraph)
    .get('/basicGraph', api.basicGraph)
    .get('/clusterDots', api.clusterDots)
    .get('/tripFlow', api.tripFlow)
    .get('/treeMap', api.treeMap)
    .get('/treeMapMM', api.treeMapMM)
    .get('/angleClusterStats', api.angleClusterStats)
    .get('/abnormalStats', api.abnormalStats)
    .get('/gidFlowStatics', api.gidFlowStatics)
    .get('/ODTripFlow', api.ODTripFlow)
    .get('/famousEnterprise',api.famousEnterprise)
    .get('/personalRecords',api.personalRecords);

module.exports = router;