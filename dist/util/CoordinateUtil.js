/**
 * 坐标系转换相关工具类，主流坐标系包括：<br>
 * <ul>
 *     <li>WGS84坐标系：即地球坐标系，中国外谷歌地图</li>
 *     <li>GCJ02坐标系：即火星坐标系，高德、腾讯、阿里等使用</li>
 *     <li>BD09坐标系：即百度坐标系，GCJ02坐标系经加密后的坐标系。百度、搜狗等使用</li>
 * </ul>
 * <p>
 * 坐标转换相关参考: https://tool.lu/coordinate/<br>
 * 参考：https://github.com/JourWon/coordinate-transform
 *
 */
import FloatUtil from "./FloatUtil";

export  default class CoordinateUtil {

	/**
	 * 坐标转换参数：(火星坐标系与百度坐标系转换的中间量)
	 */
	 static  X_PI = 3.14159265358979324 * 3000.0 / 180.0;

	/**
	 * 坐标转换参数：π
	 */
	 static  PI = 3.1415926535897932384626;

	/**
	 * 地球半径（Krasovsky 1940）
	 */
	 static  RADIUS = 6378245.0;

	/**
	 * 修正参数（偏率ee）
	 */
	 static  CORRECTION_PARAM = 0.00669342162296594323;

	/**
	 * 判断坐标是否在国外<br>
	 * 火星坐标系 (GCJ-02)只对国内有效，国外无需转换
	 *
	 * @param lng 经度
	 * @param lat 纬度
	 * @return boolean
	 */
	 static  outOfChina( lng,  lat) {
		return (lng < 72.004 || lng > 137.8347) || (lat < 0.8293 || lat > 55.8271);
	}

	//----------------------------------------------------------------------------------- WGS84
	/**
	 * WGS84 转换为 火星坐标系 (GCJ-02)
	 *
	 * @param lng 经度值
	 * @param lat 维度值
	 * @return Coordinate 火星坐标 (GCJ-02)
	 */
	 static  wgs84ToGcj02(lng,  lat) {
		return new Coordinate({lng, lat}).offset(this.offset(lng, lat, true));
	}

	/**
	 * WGS84 坐标转为 百度坐标系 (BD-09) 坐标
	 *
	 * @param lng 经度值
	 * @param lat 维度值
	 * @return bd09 坐标 Coordinate
	 */
	 static  wgs84ToBd09( lng,  lat) {
		let  gcj02 = this.wgs84ToGcj02(lng, lat);
		return this.gcj02ToBd09(gcj02.lng, gcj02.lat);
	}

	//----------------------------------------------------------------------------------- GCJ-02
	/**
	 * 火星坐标系 (GCJ-02) 转换为 WGS84
	 *
	 * @param lng 经度坐标
	 * @param lat 维度坐标
	 * @return WGS84 坐标
	 */
	 static  gcj02ToWgs84( lng,  lat) {
		return new Coordinate({lng, lat}).offset(this.offset(lng, lat, false));
	}

	/**
	 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
	 *
	 * @param lng 经度值
	 * @param lat 纬度值
	 * @return BD-09 坐标
	 */
	 static  gcj02ToBd09( lng,  lat) {
		const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * this.X_PI);
		const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * this.X_PI);
		const bd_lng = z * Math.cos(theta) + 0.0065;
		const bd_lat = z * Math.sin(theta) + 0.006;
		return new Coordinate({lng:bd_lng, lat:bd_lat});
	}

	//----------------------------------------------------------------------------------- BD-09
	/**
	 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
	 * 即 百度 转 谷歌、高德
	 *
	 * @param lng 经度值
	 * @param lat 纬度值
	 * @return GCJ-02 坐标
	 */
	 static  bd09ToGcj02(lng, lat) {
		let x = lng - 0.0065;
		let y = lat - 0.006;
		let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.X_PI);
		let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.X_PI);
		let gg_lng = z * Math.cos(theta);
		let gg_lat = z * Math.sin(theta);
		return new Coordinate({lng:gg_lng, lat:gg_lat});
	}

	/**
	 * 百度坐标系 (BD-09) 与 WGS84 的转换
	 *
	 * @param lng 经度值
	 * @param lat 纬度值
	 * @return WGS84坐标
	 */
	 static  bd09toWgs84( lng,  lat) {
		let gcj02 = this.bd09ToGcj02(lng, lat);
		return this.gcj02ToWgs84(gcj02.lng, gcj02.lat);
	}

	//-----------------------------------------------------------------------------------  methods begin

	/**
	 * 转换坐标公共核心
	 *
	 * @param lng 经度坐标
	 * @param lat 维度坐标
	 * @return number
	 */
	 static  transCore( lng,  lat) {
		let ret = (20.0 * Math.sin(6.0 * lng * this.PI) + 20.0 * Math.sin(2.0 * lng * this.PI)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(lat * this.PI) + 40.0 * Math.sin(lat / 3.0 * this.PI)) * 2.0 / 3.0;
		return ret;
	}

	/**
	 * WGS84 与 火星坐标系 (GCJ-02)转换的偏移算法（非精确）
	 *
	 * @param lng 经度值
	 * @param lat 纬度值
	 * @param isPlus 是否正向偏移：WGS84转GCJ-02使用正向，否则使用反向
	 * @return 偏移坐标 Coordinate
	 */
	 static  offset(lng, lat, isPlus) {
		let dlng = this.transLng(lng - 105.0, lat - 35.0);
	let dlat = this.transLat(lng - 105.0, lat - 35.0);

	let magic = Math.sin(lat / 180.0 * this.PI);
		magic = 1 - this.CORRECTION_PARAM * magic * magic;
	let sqrtMagic = Math.sqrt(magic);

		dlng = (dlng * 180.0) / (this.RADIUS / sqrtMagic * Math.cos(lat / 180.0 * this.PI) * this.PI);
		dlat = (dlat * 180.0) / ((this.RADIUS * (1 - this.CORRECTION_PARAM)) / (magic * sqrtMagic) * this.PI);

		if(false == isPlus){
			dlng = - dlng;
			dlat = - dlat;
		}

		return new Coordinate({lng:dlng, lat:dlat});
	}

	/**
	 * 计算经度坐标
	 *
	 * @param lng 经度坐标
	 * @param lat 维度坐标
	 * @return ret 计算完成后的
	 */
	 static  transLng( lng,  lat) {
		let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
		ret += this.transCore(lng, lat);
		ret += (150.0 * Math.sin(lng / 12.0 * this.PI) + 300.0 * Math.sin(lng / 30.0 * this.PI)) * 2.0 / 3.0;
		return ret;
	}

	/**
	 * 计算纬度坐标
	 *
	 * @param lng 经度
	 * @param lat 维度
	 * @return ret 计算完成后的
	 */
	 static  transLat( lng,  lat) {
		let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
		ret += this.transCore(lng, lat);
		ret += (160.0 * Math.sin(lat / 12.0 * this.PI) + 320 * Math.sin(lat * this.PI / 30.0)) * 2.0 / 3.0;
		return ret;
	}
	//-----------------------------------------------------------------------------------  methods end


}

/**
 * 坐标经纬度
 */
export class Coordinate  {


	/**
	 * 经度
	 */
	lng;
	/**
	 * 纬度
	 */
	lat;

	/**
	 * 构造
	 *
	 * @param lng 经度
	 * @param lat 纬度
	 */
	constructor({lng,  lat}) {
		this.lng = lng;
		this.lat = lat;
	}

	/**
	 * 获取经度
	 *
	 * @return 经度
	 */
	getLng() {
		return this.lng;
	}

	/**
	 * 设置经度
	 *
	 * @param lng 经度
	 * @return this
	 */
	setLng( lng) {
		this.lng = lng;
		return this;
	}

	/**
	 * 获取纬度
	 *
	 * @return 纬度
	 */
	getLat() {
		return this.lat;
	}

	/**
	 * 设置纬度
	 *
	 * @param lat 纬度
	 * @return this
	 */
	setLat( lat) {
		this.lat = lat;
		return this;
	}

	/**
	 * 当前坐标偏移指定坐标
	 *
	 * @param offset 偏移量
	 * @return this
	 */
	offset( offset){
		this.lng += offset.lng;
		this.lat += offset.lng;
		return this;
	}

	equals( o) {
		if (this === o) {
			return true;
		}
		if (o == null ) {
			return false;
		}


		return FloatUtil.equals(o.lng, this.lng)  && FloatUtil.equals(o.lat, this.lat) ;
	}

}