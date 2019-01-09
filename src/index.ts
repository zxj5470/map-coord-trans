/**
 * On account of the coordinate format of mapbox API is [lng, lat],
 * ths parameters of each function are longitude and latitude in turn,
 * and the name of parameters are also `lng` and `lat`.
 *
 * Inspired by @whuyao's https://github.com/whuyao/CUG_GIS_YAO_x64/tree/master/WebCoordSystemTransform
 */
export = mapCoordTrans;
module mapCoordTrans {
    const pi = 3.14159265358979324;
    const a = 6378245.0;
    const ee = 0.00669342162296594323;
    const abs = Math.abs;
    const sin = Math.sin;
    const sqrt = Math.sqrt;
    const cos = Math.cos;
    const atan2 = Math.atan2;

    /**
     * World Geodetic System ==> Mars Geodetic System
     * @param wgLng
     * @param wgLat
     * @return [lng, lat]
     */
    export function wgs2gcj(wgLng: number, wgLat: number): [number, number] {
        if (!outOfChina(wgLng, wgLat)) {
            let dlat = transformLat(wgLng - 105.0, wgLat - 35.0);
            let dlng = transformLng(wgLng - 105.0, wgLat - 35.0);
            const radlat = wgLat / 180.0 * pi;
            let magic = Math.sin(radlat);
            magic = 1 - ee * magic * magic;
            const sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * pi);
            dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * pi);
            const mglat = wgLat + dlat;
            const mglng = wgLng + dlng;
            return [mglng, mglat];
        } else {
            return [wgLng, wgLat];
        }
    }

    export function gcj2wgs(mgLng: number, mgLat: number) {
        const coord = wgs2gcj(mgLng, mgLat);
        const gLng = coord[0], gLat = coord[1];
        const dLat = gLat - mgLat;
        const dLng = gLng - mgLng;
        const wgLat = mgLat - dLat;
        const wgLng = mgLng - dLng;
        return [wgLng, wgLat];
    }

    export function gcj2bd09(mgLng: number, mgLat: number) {
        const x = mgLng, y = mgLat;
        const z = sqrt(x * x + y * y) + 0.00002 * sin(y * pi);
        const theta = atan2(y, x) + 0.000003 * cos(x * pi);
        const bdlon = z * cos(theta) + 0.0065;
        const bdlat = z * sin(theta) + 0.006;
        return [bdlon, bdlat];
    }

    export function bd092gcj(bdLng: number, bdLat: number) {
        const x = bdLng - 0.0065, y = bdLat - 0.006;
        const z = sqrt(x * x + y * y) - 0.00002 * sin(y * pi);
        const theta = atan2(y, x) - 0.000003 * cos(x * pi);
        const mgLng = z * cos(theta);
        const mgLat = z * sin(theta);
        return [mgLng, mgLat];
    }

    export function bd092wgs(bdLng: number, bdLat: number) {
        const mgCoord = bd092gcj(bdLng, bdLat);
        const wgCoord = gcj2wgs(mgCoord[0], mgCoord[1]);
        return [wgCoord[0], wgCoord[1]];
    }

    export function wgs2bd09(wgLng: number, wgLat: number) {
        const mgCoord = wgs2gcj(wgLng, wgLat);
        const bdCoord = gcj2bd09(mgCoord[0], mgCoord[1]);
        return [bdCoord[0], bdCoord[1]];
    }

    function transformLat(x: number, y: number) {
        let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * sqrt(abs(x));
        ret += (20.0 * sin(6.0 * x * pi) + 20.0 * sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * sin(y * pi) + 40.0 * sin(y / 3.0 * pi)) * 2.0 / 3.0;
        ret += (160.0 * sin(y / 12.0 * pi) + 320 * sin(y * pi / 30.0)) * 2.0 / 3.0;
        return ret;
    }

    function transformLng(x: number, y: number) {
        let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * sqrt(abs(x));
        ret += (20.0 * sin(6.0 * x * pi) + 20.0 * sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * sin(x * pi) + 40.0 * sin(x / 3.0 * pi)) * 2.0 / 3.0;
        ret += (150.0 * sin(x / 12.0 * pi) + 300.0 * sin(x / 30.0 * pi)) * 2.0 / 3.0;
        return ret;
    }

    function outOfChina(lng: number, lat: number) {
        return !(lng > 72.004 && lng < 137.8347 && lat > 0.8293 && lat < 55.8271);
    }
}
