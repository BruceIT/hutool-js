import StrUtil from "./StrUtil";
import CharUtil from "./CharUtil";



/**
 * 脱敏工具类，支持以下类型信息的脱敏自动处理：
 *
 * <ul>
 *     <li>用户ID</li>
 *     <li>中文名</li>
 *     <li>身份证</li>
 *     <li>座机号</li>
 *     <li>手机号</li>
 *     <li>地址</li>
 *     <li>电子邮件</li>
 *     <li>密码</li>
 *     <li>车牌</li>
 *     <li>银行卡号</li>
 * </ul>
 *
 * @author dazer and neusoft and qiaomu
 * @since 5.6.2
 */


export default class DesensitizedUtil {



	/**
	 * 【用户id】不对外提供userId
	 *
	 * @return 脱敏后的主键
	 */
	 static  userId() {
		return 0;
	}

	/**
	 * 【中文姓名】只显示第一个汉字，其他隐藏为2个星号，比如：李**
	 *
	 * @param fullName 姓名
	 * @return string
	 */
	 static  chineseName( fullName) {
		if (StrUtil.isBlank(fullName)) {
			return StrUtil.EMPTY;
		}
		return StrUtil.hide(fullName, 1, fullName.length());
	}

	/**
	 * 【身份证号】前1位 和后2位
	 *
	 * @param idCardNum 身份证
	 * @param front     保留：前面的front位数；从1开始
	 * @param end       保留：后面的end位数；从1开始
	 * @return string
	 */
	 static  idCardNum( idCardNum,  front,  end) {
		//身份证不能为空
		if (StrUtil.isBlank(idCardNum)) {
			return StrUtil.EMPTY;
		}
		//需要截取的长度不能大于身份证号长度
		if ((front + end) > idCardNum.length()) {
			return StrUtil.EMPTY;
		}
		//需要截取的不能小于0
		if (front < 0 || end < 0) {
			return StrUtil.EMPTY;
		}
		return StrUtil.hide(idCardNum, front, idCardNum.length() - end);
	}

	/**
	 * 【固定电话 前四位，后两位
	 *
	 * @param num 固定电话
	 * @return 脱敏后的固定电话；
	 */
	 static  fixedPhone( num) {
		if (StrUtil.isBlank(num)) {
			return StrUtil.EMPTY;
		}
		return StrUtil.hide(num, 4, num.length - 2);
	}

	/**
	 * 【手机号码】前三位，后4位，其他隐藏，比如135****2210
	 *
	 * @param num 移动电话；
	 * @return 脱敏后的移动电话；
	 */
	 static  mobilePhone( num) {
		if (StrUtil.isBlank(num)) {
			return StrUtil.EMPTY;
		}
		return StrUtil.hide(num, 3, num.length - 4);
	}

	/**
	 * 【地址】只显示到地区，不显示详细地址，比如：北京市海淀区****
	 *
	 * @param address       家庭住址
	 * @param sensitiveSize 敏感信息长度
	 * @return 脱敏后的家庭地址
	 */
	 static  address( address,  sensitiveSize) {
		if (StrUtil.isBlank(address)) {
			return StrUtil.EMPTY;
		}
		const length = address.length;
		return StrUtil.hide(address, length - sensitiveSize, length);
	}

	/**
	 * 【电子邮箱】邮箱前缀仅显示第一个字母，前缀其他隐藏，用星号代替，@及后面的地址显示，比如：d**@126.com
	 *
	 * @param email 邮箱
	 * @return 脱敏后的邮箱
	 */
	 static  email( email) {
		if (StrUtil.isBlank(email)) {
			return StrUtil.EMPTY;
		}
		const index = StrUtil.indexOf(email, '@');
		if (index <= 1) {
			return email;
		}
		return StrUtil.hide(email, 1, index);
	}

	/**
	 * 【密码】密码的全部字符都用*代替，比如：******
	 *
	 * @param password 密码
	 * @return 脱敏后的密码
	 */
	 static  password( password) {
		if (StrUtil.isBlank(password)) {
			return StrUtil.EMPTY;
		}
		return StrUtil.repeat('*', password.length);
	}

	/**
	 * 【中国车牌】车牌中间用*代替
	 * eg1：null       -》 ""
	 * eg1：""         -》 ""
	 * eg3：苏D40000   -》 苏D4***0
	 * eg4：陕A12345D  -》 陕A1****D
	 * eg5：京A123     -》 京A123     如果是错误的车牌，不处理
	 *
	 * @param carLicense 完整的车牌号
	 * @return 脱敏后的车牌
	 */
	 static  carLicense( carLicense) {
		if (StrUtil.isBlank(carLicense)) {
			return StrUtil.EMPTY;
		}
		// 普通车牌
		if (carLicense.length == 7) {
			carLicense = StrUtil.hide(carLicense, 3, 6);
		} else if (carLicense.length == 8) {
			// 新能源车牌
			carLicense = StrUtil.hide(carLicense, 3, 7);
		}
		return carLicense;
	}

	/**
	 * 银行卡号脱敏
	 * eg: 1101 **** **** **** 3256
	 *
	 * @param bankCardNo 银行卡号
	 * @return 脱敏之后的银行卡号
	 * @since 5.6.3
	 */
	 static  bankCard( bankCardNo) {
		if (StrUtil.isBlank(bankCardNo)) {
			return bankCardNo;
		}
		bankCardNo = StrUtil.trim(bankCardNo);
		if (bankCardNo.length < 9) {
			return bankCardNo;
		}

		const length = bankCardNo.length;
		const midLength = length - 8;
		const buf = [];

		buf.append(bankCardNo, 0, 4);
		for (let i = 0; i < midLength; ++i) {
			if (i % 4 == 0) {
				buf.append(CharUtil.SPACE);
			}
			buf.append('*');
		}
		buf.append(CharUtil.SPACE).append(bankCardNo, length - 4, length);
		return buf.join('');
	}
}
