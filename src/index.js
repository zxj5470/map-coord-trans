"use strict";
var mapCoordTrans;
(function (mapCoordTrans) {
    var pi = 3.14159265358979324;
    var a = 6378245.0;
    var ee = 0.00669342162296594323;
    var abs = Math.abs;
    var sin = Math.sin;
    var sqrt = Math.sqrt;
    var cos = Math.cos;
    var atan2 = Math.atan2;
    /**
     * World Geodetic System ==> Mars Geodetic System
     * @param wgLng
     * @param wgLat
     * @return [lng, lat]
     */
    function wgs2gcj(wgLng, wgLat) {
        if (!outOfChina(wgLng, wgLat)) {
            var dlat = transformLat(wgLng - 105.0, wgLat - 35.0);
            var dlng = transformLng(wgLng - 105.0, wgLat - 35.0);
            var radlat = wgLat / 180.0 * pi;
            var magic = Math.sin(radlat);
            magic = 1 - ee * magic * magic;
            var sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * pi);
            dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * pi);
            var mglat = wgLat + dlat;
            var mglng = wgLng + dlng;
            return [mglng, mglat];
        }
        else {
            return [wgLng, wgLat];
        }
    }
    mapCoordTrans.wgs2gcj = wgs2gcj;
    function gcj2wgs(mgLng, mgLat) {
        var coord = wgs2gcj(mgLng, mgLat);
        var gLng = coord[0], gLat = coord[1];
        var dLat = gLat - mgLat;
        var dLng = gLng - mgLng;
        var wgLat = mgLat - dLat;
        var wgLng = mgLng - dLng;
        return [wgLng, wgLat];
    }
    mapCoordTrans.gcj2wgs = gcj2wgs;
    function gcj2bd09(mgLng, mgLat) {
        var x = mgLng, y = mgLat;
        var z = sqrt(x * x + y * y) + 0.00002 * sin(y * pi);
        var theta = atan2(y, x) + 0.000003 * cos(x * pi);
        var bdlon = z * cos(theta) + 0.0065;
        var bdlat = z * sin(theta) + 0.006;
        return [bdlon, bdlat];
    }
    mapCoordTrans.gcj2bd09 = gcj2bd09;
    function bd092gcj(bdLng, bdLat) {
        var x = bdLng - 0.0065, y = bdLat - 0.006;
        var z = sqrt(x * x + y * y) - 0.00002 * sin(y * pi);
        var theta = atan2(y, x) - 0.000003 * cos(x * pi);
        var mgLng = z * cos(theta);
        var mgLat = z * sin(theta);
        return [mgLng, mgLat];
    }
    mapCoordTrans.bd092gcj = bd092gcj;
    function bd092wgs(bdLng, bdLat) {
        var mgCoord = bd092gcj(bdLng, bdLat);
        var wgCoord = gcj2wgs(mgCoord[0], mgCoord[1]);
        return [wgCoord[0], wgCoord[1]];
    }
    mapCoordTrans.bd092wgs = bd092wgs;
    function wgs2bd09(wgLng, wgLat) {
        var mgCoord = wgs2gcj(wgLng, wgLat);
        var bdCoord = gcj2bd09(mgCoord[0], mgCoord[1]);
        return [bdCoord[0], bdCoord[1]];
    }
    mapCoordTrans.wgs2bd09 = wgs2bd09;
    function transformLat(x, y) {
        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * sqrt(abs(x));
        ret += (20.0 * sin(6.0 * x * pi) + 20.0 * sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * sin(y * pi) + 40.0 * sin(y / 3.0 * pi)) * 2.0 / 3.0;
        ret += (160.0 * sin(y / 12.0 * pi) + 320 * sin(y * pi / 30.0)) * 2.0 / 3.0;
        return ret;
    }
    function transformLng(x, y) {
        var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * sqrt(abs(x));
        ret += (20.0 * sin(6.0 * x * pi) + 20.0 * sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * sin(x * pi) + 40.0 * sin(x / 3.0 * pi)) * 2.0 / 3.0;
        ret += (150.0 * sin(x / 12.0 * pi) + 300.0 * sin(x / 30.0 * pi)) * 2.0 / 3.0;
        return ret;
    }
    function outOfChina(lng, lat) {
        return !(lng > 72.004 && lng < 137.8347 && lat > 0.8293 && lat < 55.8271);
    }
})(mapCoordTrans || (mapCoordTrans = {}));
module.exports = mapCoordTrans;
