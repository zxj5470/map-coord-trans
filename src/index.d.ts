/**
 * On account of the coordinate format of mapbox API is [lng, lat],
 * ths parameters of each function are longitude and latitude in turn,
 * and the name of parameters are also `lng` and `lat`.
 *
 * Inspired by @whuyao's https://github.com/whuyao/CUG_GIS_YAO_x64/tree/master/WebCoordSystemTransform
 */
export = mapCoordTrans;
declare module mapCoordTrans {
    /**
     * World Geodetic System ==> Mars Geodetic System
     * @param wgLng
     * @param wgLat
     * @return [lng, lat]
     */
    function wgs2gcj(wgLng: number, wgLat: number): [number, number];
    function gcj2wgs(mgLng: number, mgLat: number): number[];
    function gcj2bd09(mgLng: number, mgLat: number): number[];
    function bd092gcj(bdLng: number, bdLat: number): number[];
    function bd092wgs(bdLng: number, bdLat: number): number[];
    function wgs2bd09(wgLng: number, wgLat: number): number[];
}
