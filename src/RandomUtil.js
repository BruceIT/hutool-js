/**
 * 随机工具类
 *
 * @author xiaoleilu
 */
import StrUtil from "./StrUtil";

export default class RandomUtil {

	/**
	 * 用于随机选的数字
	 */
	static  BASE_NUMBER = "0123456789";
	/**
	 * 用于随机选的字符
	 */
	static BASE_CHAR = "abcdefghijklmnopqrstuvwxyz";
	/**
	 * 用于随机选的字符和数字
	 */
	static  BASE_CHAR_NUMBER = this.BASE_CHAR + this.BASE_NUMBER;



	/**
	 * 获得随机Boolean值
	 *
	 * @return true or false
	 */
	static  randomBoolean() {
		return 0 === this.randomInt(2);
	}

	/**
	 * 随机汉字（'\u4E00'-'\u9FFF'）
	 *
	 * @return 随机的汉字字符
	 * @since 5.7.15
	 */
	static  randomChinese() {
		return this.randomInt('\u4E00', '\u9FFF');
	}

	/**
	 * 获得指定范围内的随机数
	 *
	 * @param min 最小数（包含）
	 * @param max 最大数（不包含）
	 * @return number
	 */
	static randomInt() {
        const len = arguments.length

        let min = 0;
        let max = Number.MAX_VALUE / 2

        switch (len){
            case 1:
                max = arguments[0]
                break
            case 2:
                min = arguments[0]
                max = arguments[1]
        }
        return 	Math.floor(Math.random() * (max - min) + min) ;
	}





	/**
	 * 获得指定范围内的随机数
	 *
	 * @param min          最小数（包含）
	 * @param max          最大数（不包含）
	 * @param scale        保留小数位数
	 * @param roundingMode 保留小数的模式 {@link RoundingMode}
	 * @return number
	 */
	static randomDouble() {
		const len = arguments.length

		let min = 0;
		let max = Number.MAX_VALUE / 2

		switch (len){
			case 1:
				max = arguments[0]
				break
			case 2:
				min = arguments[0]
				max = arguments[1]
		}

		return 	Math.random() * (max - min) + min ;
	}





	/**
	 * 随机获得列表中的元素
	 *
	 * @param <T>   元素类型
	 * @param list  列表
	 * @param limit 限制列表的前N项
	 * @return 随机元素
	 */
	static randomEle(list) {
		return list.get(this.randomInt(list.size()));
	}


	/**
	 * 随机获得列表中的一定量元素
	 *
	 * @param <T>   元素类型
	 * @param list  列表
	 * @param count 随机取出的个数
	 * @return any[]
	 */
	 static  randomEles( list,  count) {
		const result = new Array(count);
		while (result.size() < count) {
			result.add(this.randomEle(list));
		}

		return result;
	}


	/**
	 * 创建指定长度的随机索引
	 *
	 * @param length 长度
	 * @return any[]
	 */
	static  randomInts(length) {
		const range = new Array(length);
		for (let i = 0; i < length; i++) {
			range[i] = this.randomInt(i, length)
		}
		return range;
	}

	/**
	 * 获得一个随机的字符串（只包含数字和字符）
	 *
	 * @param length 字符串的长度
	 * @return 随机字符串
	 */
	static randomString(length) {
		return this.randomString(this.BASE_CHAR_NUMBER, length);
	}

	/**
	 * 获得一个随机的字符串（只包含数字和大写字符）
	 *
	 * @param length 字符串的长度
	 * @return 随机字符串
	 * @since 4.0.13
	 */
	static  randomStringUpper( length) {
		return this.randomString(this.BASE_CHAR_NUMBER, length).toUpperCase();
	}

	/**
	 * 获得一个随机的字符串（只包含数字和字符） 并排除指定字符串
	 *
	 * @param length   字符串的长度
	 * @param elemData 要排除的字符串,如：去重容易混淆的字符串，oO0、lL1、q9Q、pP
	 * @return 随机字符串
	 */
	 static randomStringWithoutStr(length, elemData) {
		let baseStr = this.BASE_CHAR_NUMBER;

		// TODO 先完成StrUtil再来
		baseStr = StrUtil.removeAll(baseStr, elemData.toCharArray());
		return this.randomString(baseStr, length);
	}

	/**
	 * 获得一个只包含数字的字符串
	 *
	 * @param length 字符串的长度
	 * @return 随机字符串
	 */
	 static randomNumbers(length) {
		return this.randomString(this.BASE_NUMBER, length);
	}

	/**
	 * 获得一个随机的字符串
	 *
	 * @param baseString 随机字符选取的样本
	 * @param length     字符串的长度
	 * @return string
	 */
	 static  randomString( baseString,  length) {
		if (StrUtil.isEmpty(baseString)) {
			return StrUtil.EMPTY;
		}
		const  sb = [];

		if (length < 1) {
			length = 1;
		}
		let baseLength = baseString.length;
		for (let i = 0; i < length; i++) {
			let number = this.randomInt(baseLength);
			sb.append(baseString[number]);
		}
		return sb.join('');
	}

	/**
	 * 随机数字，数字为0~9单个数字
	 *
	 * @return number
	 */
	 static  randomNumber() {
		return Math.floor(Math.random() * 10) ;
	}

	/**
	 * 随机字母或数字，小写
	 *
	 * @return 随机字符
	 * @since 3.1.2
	 */
	 static  randomChar() {
		return this.randomChar(this.BASE_CHAR_NUMBER);
	}

	/**
	 * 随机字符
	 *
	 * @param baseString 随机字符选取的样本
	 * @return 随机字符
	 * @since 3.1.2
	 */
	 static  randomChar(baseString) {
		return baseString[this.randomInt(baseString.length)];
	}



	/**
	 * 以当天为基准，随机产生一个日期
	 *
	 * @param min 偏移最小天，可以为负数表示过去的时间（包含）
	 * @param max 偏移最大天，可以为负数表示过去的时间（不包含）
	 * @return 随机日期（随机天，其它时间不变）
	 */
	 static randomDay(min, max) {
		const i =  this.randomInt(min, max);
		let d = new Date()
		d = d.setDate(d.getDate() + i);

		return d;
	}


}
