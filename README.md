# Map Coordinate Transform
<a href="https://www.npmjs.com/package/map-coord-trans"><img src="https://img.shields.io/npm/dt/map-coord-trans.svg?style=flat-square&logo=npm" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/map-coord-trans"><img src="https://img.shields.io/npm/v/map-coord-trans.svg?style=flat-square&logo=npm" alt="Version"></a>
<a href="https://www.npmjs.com/package/map-coord-trans"><img src="https://img.shields.io/npm/l/map-coord-trans.svg?style=flat-square&logo=npm" alt="License"></a>

## usage
### Install
```sh
npm install map-coord-trans
```
or add it to your packages.json
```
"map-coord":"^v0.1.0",
```
### Typescript
```typescript
import * as mapCoordTrans from 'map-coord-trans';
// or use require
// const mapCoordTrans = require('map-coord-trans');

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
```

### Javascirpt
```javascript
const mapCoordTrans = require('map-coord-trans');
const bdQingchuan = mapCoordTrans.gcj2bd09(114.2866416361414, 30.55516459946725);
const gcjQingchuan = mapCoordTrans.bd092gcj(114.2931983642802, 30.560897954950846);
console.log(bdQingchuan);
console.log(gcjQingchuan);

```
