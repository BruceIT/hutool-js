
/**
 * 字符工具类
 * 部分工具来自于Apache Commons系列
 * TODO 好好测试
 */
export default class CharUtil  {

	/**
	 * 是否为ASCII字符，ASCII字符位于0~127之间
	 *
	 * <pre>
	 *   CharUtil.isAscii('a')  = true
	 *   CharUtil.isAscii('A')  = true
	 *   CharUtil.isAscii('3')  = true
	 *   CharUtil.isAscii('-')  = true
	 *   CharUtil.isAscii('\n') = true
	 *   CharUtil.isAscii('&copy;') = false
	 * </pre>
	 *
	 * @param ch 被检查的字符处
	 * @return true表示为ASCII字符，ASCII字符位于0~127之间
	 */
	 static  isAscii( ch) {
		 // TODO
		return ch < 128;
	}

	/**
	 * 是否为可见ASCII字符，可见字符位于32~126之间
	 *
	 * <pre>
	 *   CharUtil.isAsciiPrintable('a')  = true
	 *   CharUtil.isAsciiPrintable('A')  = true
	 *   CharUtil.isAsciiPrintable('3')  = true
	 *   CharUtil.isAsciiPrintable('-')  = true
	 *   CharUtil.isAsciiPrintable('\n') = false
	 *   CharUtil.isAsciiPrintable('&copy;') = false
	 * </pre>
	 *
	 * @param ch 被检查的字符处
	 * @return true表示为ASCII可见字符，可见字符位于32~126之间
	 */
	 static  isAsciiPrintable( ch) {
		return ch >= 32 && ch < 127;
	}

	/**
	 * 是否为ASCII控制符（不可见字符），控制符位于0~31和127
	 *
	 * <pre>
	 *   CharUtil.isAsciiControl('a')  = false
	 *   CharUtil.isAsciiControl('A')  = false
	 *   CharUtil.isAsciiControl('3')  = false
	 *   CharUtil.isAsciiControl('-')  = false
	 *   CharUtil.isAsciiControl('\n') = true
	 *   CharUtil.isAsciiControl('&copy;') = false
	 * </pre>
	 *
	 * @param ch 被检查的字符
	 * @return true表示为控制符，控制符位于0~31和127
	 */
	 static  isAsciiControl( ch) {
		return ch < 32 || ch == 127;
	}

	/**
	 * 判断是否为字母（包括大写字母和小写字母）<br>
	 * 字母包括A~Z和a~z
	 *
	 * <pre>
	 *   CharUtil.isLetter('a')  = true
	 *   CharUtil.isLetter('A')  = true
	 *   CharUtil.isLetter('3')  = false
	 *   CharUtil.isLetter('-')  = false
	 *   CharUtil.isLetter('\n') = false
	 *   CharUtil.isLetter('&copy;') = false
	 * </pre>
	 *
	 * @param ch 被检查的字符
	 * @return true表示为字母（包括大写字母和小写字母）字母包括A~Z和a~z
	 */
	 static  isLetter( ch) {
		return this.isLetterUpper(ch) || this.isLetterLower(ch);
	}

	/**
	 * <p>
	 * 判断是否为大写字母，大写字母包括A~Z
	 * </p>
	 *
	 * <pre>
	 *   CharUtil.isLetterUpper('a')  = false
	 *   CharUtil.isLetterUpper('A')  = true
	 *   CharUtil.isLetterUpper('3')  = false
	 *   CharUtil.isLetterUpper('-')  = false
	 *   CharUtil.isLetterUpper('\n') = false
	 *   CharUtil.isLetterUpper('&copy;') = false
	 * </pre>
	 *
	 * @param ch 被检查的字符
	 * @return true表示为大写字母，大写字母包括A~Z
	 */
	 static  isLetterUpper( ch) {
		return ch >= 'A' && ch <= 'Z';
	}

	/**
	 * <p>
	 * 检查字符是否为小写字母，小写字母指a~z
	 * </p>
	 *
	 * <pre>
	 *   CharUtil.isLetterLower('a')  = true
	 *   CharUtil.isLetterLower('A')  = false
	 *   CharUtil.isLetterLower('3')  = false
	 *   CharUtil.isLetterLower('-')  = false
	 *   CharUtil.isLetterLower('\n') = false
	 *   CharUtil.isLetterLower('&copy;') = false
	 * </pre>
	 *
	 * @param ch 被检查的字符
	 * @return true表示为小写字母，小写字母指a~z
	 */
	 static isLetterLower(ch) {
		return ch >= 'a' && ch <= 'z';
	}

	/**
	 * <p>
	 * 检查是否为数字字符，数字字符指0~9
	 * </p>
	 *
	 * <pre>
	 *   CharUtil.isNumber('a')  = false
	 *   CharUtil.isNumber('A')  = false
	 *   CharUtil.isNumber('3')  = true
	 *   CharUtil.isNumber('-')  = false
	 *   CharUtil.isNumber('\n') = false
	 *   CharUtil.isNumber('&copy;') = false
	 * </pre>
	 *
	 * @param ch 被检查的字符
	 * @return true表示为数字字符，数字字符指0~9
	 */
	 static isNumber(ch) {
		return ch >= '0' && ch <= '9';
	}

	/**
	 * 是否为16进制规范的字符，判断是否为如下字符
	 * <pre>
	 * 1. 0~9
	 * 2. a~f
	 * 4. A~F
	 * </pre>
	 *
	 * @param c 字符
	 * @return 是否为16进制规范的字符
	 */
	 static  isHexChar( c) {
		return this.isNumber(c) || (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F');
	}

	/**
	 * 是否为字母或数字，包括A~Z、a~z、0~9
	 *
	 * <pre>
	 *   CharUtil.isLetterOrNumber('a')  = true
	 *   CharUtil.isLetterOrNumber('A')  = true
	 *   CharUtil.isLetterOrNumber('3')  = true
	 *   CharUtil.isLetterOrNumber('-')  = false
	 *   CharUtil.isLetterOrNumber('\n') = false
	 *   CharUtil.isLetterOrNumber('&copy;') = false
	 * </pre>
	 *
	 * @param ch 被检查的字符
	 * @return true表示为字母或数字，包括A~Z、a~z、0~9
	 */
	 static  isLetterOrNumber(ch) {
		return this.isLetter(ch) || this.isNumber(ch);
	}



	/**
	 * 给定对象对应的类是否为字符类，字符类包括：
	 *
	 * <pre>
	 * Character.class
	 * char.class
	 * </pre>
	 *
	 * @param value 被检查的对象
	 * @return boolean
	 */
	 static isChar(value) {
		//noinspection ConstantConditions
		return  typeof value == 'string' && value.length ==1;
	}


	/**
	 * 是否空白符<br>
	 * 空白符包括空格、制表符、全角空格和不间断空格<br>
	 *
	 * @param c 字符
	 * @return boolean
	 * @see Character#isWhitespace(int)
	 * @see Character#isSpaceChar(int)
	 * @since 4.0.10
	 */
	 static isBlankChar( c) {
		return c === ' '
				|| c == '\ufeff'
				|| c == '\u202a'
				|| c == '\u0000';
	}

	/**
	 * 判断是否为emoji表情符<br>
	 *
	 * @param c 字符
	 * @return 是否为emoji
	 * @since 4.0.8
	 */
	 static  isEmoji( c) {
		//noinspection ConstantConditions
		return false == ((c == 0x0) || //
				(c == 0x9) || //
				(c == 0xA) || //
				(c == 0xD) || //
				((c >= 0x20) && (c <= 0xD7FF)) || //
				((c >= 0xE000) && (c <= 0xFFFD)) || //
				((c >= 0x100000) && (c <= 0x10FFFF)));
	}

	/**
	 * 是否为Windows或者Linux（Unix）文件分隔符<br>
	 * Windows平台下分隔符为\，Linux（Unix）为/
	 *
	 * @param c 字符
	 * @return 是否为Windows或者Linux（Unix）文件分隔符
	 * @since 4.1.11
	 */
	 static  isFileSeparator( c) {
		return '/' == c || '\\' == c;
	}



	/**
	 * 将字母、数字转换为带圈的字符：
	 * <pre>
	 *     '1' -》 '①'
	 *     'A' -》 'Ⓐ'
	 *     'a' -》 'ⓐ'
	 * </pre>
	 * <p>
	 * 获取带圈数字 /封闭式字母数字 ，从1-20,超过1-20报错
	 *
	 * @param c 被转换的字符，如果字符不支持转换，返回原字符
	 * @return 转换后的字符
	 * @see <a href="https://en.wikipedia.org/wiki/List_of_Unicode_characters#Unicode_symbols">Unicode_symbols</a>
	 * @see <a href="https://en.wikipedia.org/wiki/Enclosed_Alphanumerics">Alphanumerics</a>
	 * @since 5.6.2
	 */
	 static  toCloseChar( c) {
		let result = c;
		if (c >= '1' && c <= '9') {
			result = '①' + c - '1';
		} else if (c >= 'A' && c <= 'Z') {
			result = 'Ⓐ' + c - 'A';
		} else if (c >= 'a' && c <= 'z') {
			result = 'ⓐ' + c - 'a';
		}
		return result;
	}

	/**
	 * 将[1-20]数字转换为带圈的字符：
	 * <pre>
	 *     1 -》 '①'
	 *     12 -》 '⑫'
	 *     20 -》 '⑳'
	 * </pre>
	 * 也称作：封闭式字符，英文：Enclosed Alphanumerics
	 *
	 * @param number 被转换的数字
	 * @return 转换后的字符
	 * @author dazer
	 * @see <a href="https://en.wikipedia.org/wiki/List_of_Unicode_characters#Unicode_symbols">维基百科wikipedia-Unicode_symbols</a>
	 * @see <a href="https://zh.wikipedia.org/wiki/Unicode%E5%AD%97%E7%AC%A6%E5%88%97%E8%A1%A8">维基百科wikipedia-Unicode字符列表</a>
	 * @see <a href="https://coolsymbol.com/">coolsymbol</a>
	 * @see <a href="https://baike.baidu.com/item/%E7%89%B9%E6%AE%8A%E5%AD%97%E7%AC%A6/112715?fr=aladdin">百度百科 特殊字符</a>
	 * @since 5.6.2
	 */
	 static  toCloseByNumber( number) {
		if (number > 20) {
			throw new Error("Number must be [1-20]");
		}
		return  ('①' + number - 1);
	}
}
