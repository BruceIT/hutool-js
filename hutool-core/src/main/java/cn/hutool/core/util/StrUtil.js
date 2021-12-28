/**
 * 字符串工具类
 *
 * @author xiaoleilu
 */
import TextSimilarity from "../text/TextSimilarity";
import IdUtil from "./IdUtil";

export  default class StrUtil {

	// ------------------------------------------------------------------------ Blank

	/**
	 * <p>如果对象是字符串是否为空白，空白的定义如下：</p>
	 * <ol>
	 *     <li>{@code null}</li>
	 *     <li>空字符串：{@code ""}</li>
	 *     <li>空格、全角空格、制表符、换行符，等不可见字符</li>
	 * </ol>
	 *
	 * <p>例：</p>
	 * <ul>
	 *     <li>{@code StrUtil.isBlankIfStr(null)     // true}</li>
	 *     <li>{@code StrUtil.isBlankIfStr("")       // true}</li>
	 *     <li>{@code StrUtil.isBlankIfStr(" \t\n")  // true}</li>
	 *     <li>{@code StrUtil.isBlankIfStr("abc")    // false}</li>
	 * </ul>
	 *
	 * <p>注意：该方法与 {@link #isEmptyIfStr(Object)} 的区别是：
	 * 该方法会校验空白字符，且性能相对于 {@link #isEmptyIfStr(Object)} 略慢。</p>
	 *
	 * @param obj 对象
	 * @return boolean
	 * @see StrUtil#isBlank(CharSequence)
	 */
	static /*boolean*/ isBlankIfStr(obj) {
		if (null == obj) {
			return true;
		} else if (typeof obj == 'string') {
			return this.isBlank(obj);
		}
		return false;
	}

	// ------------------------------------------------------------------------ Empty

	/**
	 * <p>如果对象是字符串是否为空串，空的定义如下：</p><br>
	 * <ol>
	 *     <li>{@code null}</li>
	 *     <li>空字符串：{@code ""}</li>
	 * </ol>
	 *
	 * <p>例：</p>
	 * <ul>
	 *     <li>{@code StrUtil.isEmptyIfStr(null)     // true}</li>
	 *     <li>{@code StrUtil.isEmptyIfStr("")       // true}</li>
	 *     <li>{@code StrUtil.isEmptyIfStr(" \t\n")  // false}</li>
	 *     <li>{@code StrUtil.isEmptyIfStr("abc")    // false}</li>
	 * </ul>
	 *
	 * <p>注意：该方法与 {@link #isBlankIfStr(Object)} 的区别是：该方法不校验空白字符。</p>
	 *
	 * @param obj 对象
	 * @return boolean
	 */
	static /*boolean*/ isEmptyIfStr(obj) {
		if (null == obj) {
			return true;
		} else if (typeof obj == 'string') {
			return 0 == obj.length;
		}
		return false;
	}

	// ------------------------------------------------------------------------ Trim

	/**
	 * 给定字符串数组全部做去首尾空格
	 *
	 * @param strs 字符串数组
	 */
	static trim(strs) {
		if (null == strs) {
			return;
		}
		for (let i = 0; i < strs.length; i++) {
			const str = strs[i];
			if (null != str) {
				strs[i] = str.trim()
			}
		}
	}


	/**
	 * 反转字符串<br>
	 * 例如：abcd =》dcba
	 *
	 * @param str 被反转的字符串
	 * @return string
	 */
	static /*String*/ reverse(str) {
		const arr = [];

		for (let i = str.length - 1; i >= 0; i--) {
			arr.push(str[i])
		}

		return arr.join('')
	}

	// ------------------------------------------------------------------------ fill

	/**
	 * 将已有字符串填充为规定长度，如果已有字符串超过这个长度则返回这个字符串<br>
	 * 字符填充于字符串前
	 *
	 * @param str        被填充的字符串
	 * @param filledChar 填充的字符
	 * @param len        填充长度
	 * @return 填充后的字符串
	 */
	static /*String*/ fillBefore(str, filledChar, len) {
		return this.fill(str, filledChar, len, true);
	}

	/**
	 * 将已有字符串填充为规定长度，如果已有字符串超过这个长度则返回这个字符串<br>
	 * 字符填充于字符串后
	 *
	 * @param str        被填充的字符串
	 * @param filledChar 填充的字符
	 * @param len        填充长度
	 * @return 填充后的字符串
	 * @since 3.1.2
	 */
	static /*String*/ fillAfter(str, filledChar, len) {
		return this.fill(str, filledChar, len, false);
	}

	/**
	 * 将已有字符串填充为规定长度，如果已有字符串超过这个长度则返回这个字符串
	 *
	 * @param str        被填充的字符串
	 * @param filledChar 填充的字符
	 * @param len        填充长度
	 * @param isPre      是否填充在前
	 * @return 填充后的字符串
	 * @since 3.1.2
	 */
	static /*String*/ fill(str, filledChar, len, isPre) {
		const strLen = str.length;
		if (strLen > len) {
			return str;
		}

		const filledStr = this.repeat(filledChar, len - strLen);
		return isPre ? filledStr + str : str + filledStr;
	}

	/**
	 * 计算两个字符串的相似度
	 *
	 * @param str1 字符串1
	 * @param str2 字符串2
	 * @return number
	 */
	static /*double*/ similar(str1, str2) {
		return TextSimilarity.similar(str1, str2);
	}

	/**
	 * 计算两个字符串的相似度百分比
	 *
	 * @param str1  字符串1
	 * @param str2  字符串2
	 * @param scale 相似度
	 * @return 百分比
	 * @since 3.2.3
	 */
	static similar(str1, str2, scale) {
		return TextSimilarity.similar(str1, str2, scale);
	}

	/**
	 * 生成随机UUID
	 *
	 * @return string
	 * @see IdUtil#randomUUID()
	 */
	static uuid() {
		return IdUtil.randomUUID();
	}

	/**
	 * 格式化文本，使用 {varName} 占位<br>
	 * map = {a: "aValue", b: "bValue"} format("{a} and {b}", map) ---=》 aValue and bValue
	 *
	 * @param template 文本模板，被替换的部分用 {key} 表示
	 * @param map      参数值对
	 * @return 格式化后的文本
	 */
	static /*String*/ format(template, map) {
		return this.format(template, map, true);
	}

	/**
	 * 格式化文本，使用 {varName} 占位<br>
	 * map = {a: "aValue", b: "bValue"} format("{a} and {b}", map) ---=》 aValue and bValue
	 *
	 * @param template   文本模板，被替换的部分用 {key} 表示
	 * @param map        参数值对
	 * @param ignoreNull 是否忽略 {@code null} 值，忽略则 {@code null} 值对应的变量不被替换，否则替换为""
	 * @return 格式化后的文本
	 */
	static /*String*/ format(template, map, ignoreNull) {
		return StrFormatter.format(template, map, ignoreNull);
	}


	static isNotBlank(valueStr) {
		return valueStr != null && valueStr.length != 0 && valueStr.trim().length != 0
	}

}