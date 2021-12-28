/**
 * Boolean类型相关工具类
 */
import StrUtil from "./StrUtil";
import {ArrayUtil} from "./ArrayUtil";

export default class BooleanUtil {

	/** 表示为真的字符串 */
	 static TRUE_SET = ["true", "yes", "y", "t", "ok", "1", "on", "是", "对", "真", "對", "√"];



	/**
	 * 转换字符串为boolean值
	 *
	 * @param valueStr 字符串
	 * @return boolean
	 */
	 static  toBoolean( valueStr) {
		if (StrUtil.isNotBlank(valueStr)) {
			valueStr = valueStr.trim().toLowerCase();
			return ArrayUtil.contains(this.TRUE_SET, valueStr) ;
		}
		return false;
	}

	/**
	 * boolean值转为int
	 *
	 * @param value Boolean值
	 * @return number
	 */
	 static  toInt( value) {
		return value ? 1 : 0;
	}


	/**
	 * 将boolean转换为字符串 {@code 'true'} 或者 {@code 'false'}.
	 *
	 * <pre>
	 *   BooleanUtil.toStringTrueFalse(true)   = "true"
	 *   BooleanUtil.toStringTrueFalse(false)  = "false"
	 * </pre>
	 *
	 * @param bool Boolean值
	 * @return {@code 'true'}, {@code 'false'}
	 */
	 static  toStringTrueFalse( bool) {
		return bool ?   "true":"false";
	}

	/**
	 * 将boolean转换为字符串 {@code 'on'} 或者 {@code 'off'}.
	 *
	 * <pre>
	 *   BooleanUtil.toStringOnOff(true)   = "on"
	 *   BooleanUtil.toStringOnOff(false)  = "off"
	 * </pre>
	 *
	 * @param bool Boolean值
	 * @return {@code 'on'}, {@code 'off'}
	 */
	 static  toStringOnOff(bool) {
		return bool ? "on": "off";
	}

	/**
	 * 将boolean转换为字符串 {@code 'yes'} 或者 {@code 'no'}.
	 *
	 * <pre>
	 *   BooleanUtil.toStringYesNo(true)   = "yes"
	 *   BooleanUtil.toStringYesNo(false)  = "no"
	 * </pre>
	 *
	 * @param bool Boolean值
	 * @return {@code 'yes'}, {@code 'no'}
	 */
	 static  toStringYesNo( bool) {
		return bool ? "yes": "no";
	}



	/**
	 * 对Boolean数组取与
	 *
	 * <pre>
	 *   BooleanUtil.and(true, true)         = true
	 *   BooleanUtil.and(false, false)       = false
	 *   BooleanUtil.and(true, false)        = false
	 *   BooleanUtil.and(true, true, false)  = false
	 *   BooleanUtil.and(true, true, true)   = true
	 * </pre>
	 *
	 * @param array {@code Boolean}数组
	 * @return 取与为真返回{@code true}
	 */
	 static  and(... array) {
		if (ArrayUtil.isEmpty(array)) {
			throw new Error("The Array must not be empty !");
		}
		for (let  element of array) {
			if (!element) {
				return false;
			}
		}
		return true;
	}



	/**
	 * 对Boolean数组取或
	 *
	 * <pre>
	 *   BooleanUtil.or(true, true)          = true
	 *   BooleanUtil.or(false, false)        = false
	 *   BooleanUtil.or(true, false)         = true
	 *   BooleanUtil.or(true, true, false)   = true
	 *   BooleanUtil.or(true, true, true)    = true
	 *   BooleanUtil.or(false, false, false) = false
	 * </pre>
	 *
	 * @param array {@code Boolean}数组
	 * @return 取或为真返回{@code true}
	 */
	 static  or(... array) {
		if (ArrayUtil.isEmpty(array)) {
			throw new Error("The Array must not be empty !");
		}
		for (let element of array) {
			if (element) {
				return true;
			}
		}
		return false;
	}



	/**
	 * 对Boolean数组取异或
	 *
	 * <pre>
	 *   BooleanUtil.xor(true, true)   = false
	 *   BooleanUtil.xor(false, false) = false
	 *   BooleanUtil.xor(true, false)  = true
	 *   BooleanUtil.xor(true, true)   = false
	 *   BooleanUtil.xor(false, false) = false
	 *   BooleanUtil.xor(true, false)  = true
	 * </pre>
	 *
	 * @param array {@code boolean}数组
	 * @return 如果异或计算为true返回 {@code true}
	 */
	 static  xor(... array) {
		if (ArrayUtil.isEmpty(array)) {
			throw new Error("The Array must not be empty");
		}

		let result = false;
		for (let  element of array) {
			result ^= element;
		}

		return result;
	}



	/**
	 * 给定类是否为Boolean或者boolean
	 *
	 * @param clazz 类
	 * @return boolean
	 */
	 static  isBoolean(obj) {
		return typeof obj === 'boolean'
	}
}
