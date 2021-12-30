/**
 * 对象工具类，包括判空、克隆、序列化等操作
 */
export default class ObjectUtil {






	/**
	 * 检查对象是否为null<br>
	 * 判断标准为：
	 *
	 * <pre>
	 * 1. == null
	 * 2. equals(null)
	 * </pre>
	 *
	 * @param obj 对象
	 * @return 是否为null
	 */
	 static  isNull( obj) {
		//noinspection ConstantConditions
		return null == obj || obj == undefined || Number.isNaN(obj);
	}

	/**
	 * 检查对象是否不为null
	 *
	 * @param obj 对象
	 * @return 是否为null
	 */
	 static  isNotNull( obj) {
		return false == this.isNull(obj);
	}



	/**
	 * 如果给定对象为{@code null}返回默认值
	 *
	 * <pre>
	 * ObjectUtil.defaultIfNull(null, null)      = null
	 * ObjectUtil.defaultIfNull(null, "")        = ""
	 * ObjectUtil.defaultIfNull(null, "zz")      = "zz"
	 * ObjectUtil.defaultIfNull("abc", *)        = "abc"
	 * ObjectUtil.defaultIfNull(Boolean.TRUE, *) = Boolean.TRUE
	 * </pre>
	 *
	 * @param <T>          对象类型
	 * @param object       被检查对象，可能为{@code null}
	 * @param defaultValue 被检查对象为{@code null}返回的默认值，可以为{@code null}
	 * @return 被检查对象为{@code null}返回默认值，否则返回原值
	 * @since 3.0.7
	 */
	 static  defaultIfNull( object, defaultValue) {
		return this.isNull(object) ? defaultValue : object;
	}




	/**
	 * 克隆对象<br>
	 * 如果对象实现Cloneable接口，调用其clone方法<br>
	 * 如果实现Serializable接口，执行深度克隆<br>
	 * 否则返回{@code null}
	 *
	 * @param <T> 对象类型
	 * @param obj 被克隆对象
	 * @return 克隆后的对象
	 */
	static  clone(obj) {
		return  JSON.parse(JSON.stringify(obj))
	}




}
