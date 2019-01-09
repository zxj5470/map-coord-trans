import * as mapCoordTrans from '../src/index';
// const mapCoordTrans = require('../src/index');
// test place: Qingchuan Pavilion

// between baidu and amap
const bdQingchuan = mapCoordTrans.gcj2bd09(114.2866416361414, 30.55516459946725);
const gcjQingchuan = mapCoordTrans.bd092gcj(114.2931983642802, 30.560897954950846);
console.log(bdQingchuan);
console.log(gcjQingchuan);

// From WGS 114.28 30.56
const wgs2bd = mapCoordTrans.wgs2bd09(114.28, 30.56);
const wgs2gcj = mapCoordTrans.wgs2gcj(114.28, 30.56);

console.log(wgs2bd);
console.log(wgs2gcj);

// to WGS
const bd2wgs = mapCoordTrans.bd092wgs(114.297267, 30.569653);
const gcj2wgs = mapCoordTrans.gcj2wgs(114.29063, 30.563695);
console.log(bd2wgs);
console.log(gcj2wgs);