# simple-server

A simple Koa2 application implementation

## Usage

```
git clone repoUrl
cd repoUrl
npm install
npm run dev
```

## Structure

* router/root.js: 指定页面路由（具体页面放 /views 内）
* public/*: 放静态资源（若不需要编译，前端调用使用 /[type]/[name].[suffix]）
* webpack.config.js: devConfig 中 entry 指定需要编译的 js 资源（前端调用使用 /dist/[name].js）


```
├── [4.0K]  api
│   └── [4.0K]  v1
│       └── [ 731]  index.js
├── [4.0K]  conf
│   ├── [ 185]  db.js
│   └── [ 443]  sql.js
├── [ 684]  index.js
├── [ 11K]  LICENSE
├── [ 970]  package.json
├── [  67]  README.md
├── [4.0K]  router
│   ├── [ 180]  root.js
│   └── [ 244]  user.js
├── [4.0K]  util
│   ├── [2.2K]  agg-utils.js
│   └── [ 719]  base.js
└── [4.0K]  views
    └── [2.2K]  home.ejs
```
### 现有接口说明

现有接口对应路由存储于 `router/user.js` 中：

#### 1. Abnormal Grid Counting Stats

* 名称：异常检测网格统计数据
* 格式： `/api/abnormalStats?hourID=9&timeSegID=9&type=flow`；
* 参数说明：`type` 取值可选如下四个 key 值之一​：flow, record, stay，`hourID` 表示小时编号，`timeSegID` 表示总时段上编号；
* 状态：在线；

#### 2. Angle Cluster Stats

* 名称：角度聚类统计数据
* 格式： `/api/angleClusterStats?timeSegID=9`；
* 参数说明：`timeSegID` 表示总时段上编号；
* 状态：在线；

#### 3. Tree Map Query

* 名称：TreeMap 结果查询
* 格式： `/api/treeMap?treeNumRate=0.03&searchAngle=30&seedStrength=0.1&treeWidth=1&spaceInterval=200&seedUnit=basic&jumpLen=3&gridDirNum=-1&timeSegID=9&delta=-1&speedToShow=all&maxDistance=9999&city=TJ`；
* 参数说明：暂无；
* 状态：在线；

#### 4. Trip Flow Query

* 名称：TripFlow 结果查询
* 格式： `/api/tripFlow?type=speed&thread=5000&time=2016-07-05%2000:00:00&order=DESC&v=v1`；
* 参数说明：暂无；
* 状态：在线；

#### 5. Cluster Dots Query

* 名称：聚类点格数据查询
* 格式： `/api/clusterDots?customize=0&v=v1&filterNoise=1`；
* 参数说明：暂无；
* 状态：未知；

#### 6. Basic Graph Query

* 格式： `/api/basicGraph`；
* 参数说明：暂无；
* 状态：已废弃；

#### 7.Gid Flow Statics Query

* 格式：`/api/gidFlowStatics?hourID=9&timeSegID=9&type=flow`
* 参数说明：无；
* 状态：已废弃；

### 修改指导

* 路由：现有项目中页面渲染路由信息在 `/router/root.js` 中定义，后端服务 API 信息在 `/router/user.js` 中定义；
* API 方法：所有后端服务 API 接口对应的处理方法均定义在 `/api/v1/index.js` 文件中，其中具体对数据的处理、查询等实现根据内部 import 的方法进行查看。例如 treeMap 的查询接口使用的 是 `queryTreeMap` 方法，该方法的实现在文件 `/util/methods/queryTreeMap.js` 中定义。
