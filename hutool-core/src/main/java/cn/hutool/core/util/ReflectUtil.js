/**
 * 反射工具类
 */
export default class ReflectUtil {


	/**
	 * 查找类中的指定参数的构造方法，如果找到构造方法，会自动设置可访问为true
	 *
	 * @param clazz          类
	 * @return 构造方法，如果未找到返回null
	 */
	static  getConstructor(clazz) {
		return clazz.prototype.constructor
	}




}
