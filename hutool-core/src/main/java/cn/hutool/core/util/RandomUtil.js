/**
 * 随机工具类
 *
 * @author xiaoleilu
 */
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
		return list.get(this.randomInt());
	}


	/**
	 * 随机获得列表中的一定量元素
	 *
	 * @param <T>   元素类型
	 * @param list  列表
	 * @param count 随机取出的个数
	 * @return 随机元素
	 */
	public static <T> List<T> randomEles(List<T> list, int count) {
		final List<T> result = new ArrayList<>(count);
		int limit = list.size();
		while (result.size() < count) {
			result.add(randomEle(list, limit));
		}

		return result;
	}

	/**
	 * 随机获得列表中的一定量的元素，返回List<br>
	 * 此方法与{@link #randomEles(List, int)} 不同点在于，不会获取重复位置的元素
	 *
	 * @param source 列表
	 * @param count  随机取出的个数
	 * @param <T>    元素类型
	 * @return 随机列表
	 * @since 5.2.1
	 */
	public static <T> List<T> randomEleList(List<T> source, int count) {
		if (count >= source.size()) {
			return ListUtil.toList(source);
		}
		final int[] randomList = ArrayUtil.sub(randomInts(source.size()), 0, count);
		List<T> result = new ArrayList<>();
		for (int e : randomList) {
			result.add(source.get(e));
		}
		return result;
	}

	/**
	 * 随机获得列表中的一定量的不重复元素，返回Set
	 *
	 * @param <T>        元素类型
	 * @param collection 列表
	 * @param count      随机取出的个数
	 * @return 随机元素
	 * @throws IllegalArgumentException 需要的长度大于给定集合非重复总数
	 */
	public static <T> Set<T> randomEleSet(Collection<T> collection, int count) {
		final ArrayList<T> source = CollUtil.distinct(collection);
		if (count > source.size()) {
			throw new IllegalArgumentException("Count is larger than collection distinct size !");
		}

		final Set<T> result = new LinkedHashSet<>(count);
		int limit = source.size();
		while (result.size() < count) {
			result.add(randomEle(source, limit));
		}

		return result;
	}

	/**
	 * 创建指定长度的随机索引
	 *
	 * @param length 长度
	 * @return 随机索引
	 * @since 5.2.1
	 */
	public static int[] randomInts(int length) {
		final int[] range = ArrayUtil.range(length);
		for (int i = 0; i < length; i++) {
			int random = randomInt(i, length);
			ArrayUtil.swap(range, i, random);
		}
		return range;
	}

	/**
	 * 获得一个随机的字符串（只包含数字和字符）
	 *
	 * @param length 字符串的长度
	 * @return 随机字符串
	 */
	public static String randomString(int length) {
		return randomString(BASE_CHAR_NUMBER, length);
	}

	/**
	 * 获得一个随机的字符串（只包含数字和大写字符）
	 *
	 * @param length 字符串的长度
	 * @return 随机字符串
	 * @since 4.0.13
	 */
	public static String randomStringUpper(int length) {
		return randomString(BASE_CHAR_NUMBER, length).toUpperCase();
	}

	/**
	 * 获得一个随机的字符串（只包含数字和字符） 并排除指定字符串
	 *
	 * @param length   字符串的长度
	 * @param elemData 要排除的字符串,如：去重容易混淆的字符串，oO0、lL1、q9Q、pP
	 * @return 随机字符串
	 */
	public static String randomStringWithoutStr(int length, String elemData) {
		String baseStr = BASE_CHAR_NUMBER;
		baseStr = StrUtil.removeAll(baseStr, elemData.toCharArray());
		return randomString(baseStr, length);
	}

	/**
	 * 获得一个只包含数字的字符串
	 *
	 * @param length 字符串的长度
	 * @return 随机字符串
	 */
	public static String randomNumbers(int length) {
		return randomString(BASE_NUMBER, length);
	}

	/**
	 * 获得一个随机的字符串
	 *
	 * @param baseString 随机字符选取的样本
	 * @param length     字符串的长度
	 * @return 随机字符串
	 */
	public static String randomString(String baseString, int length) {
		if (StrUtil.isEmpty(baseString)) {
			return StrUtil.EMPTY;
		}
		final StringBuilder sb = new StringBuilder(length);

		if (length < 1) {
			length = 1;
		}
		int baseLength = baseString.length();
		for (int i = 0; i < length; i++) {
			int number = randomInt(baseLength);
			sb.append(baseString.charAt(number));
		}
		return sb.toString();
	}

	/**
	 * 随机数字，数字为0~9单个数字
	 *
	 * @return 随机数字字符
	 * @since 3.1.2
	 */
	public static char randomNumber() {
		return randomChar(BASE_NUMBER);
	}

	/**
	 * 随机字母或数字，小写
	 *
	 * @return 随机字符
	 * @since 3.1.2
	 */
	public static char randomChar() {
		return randomChar(BASE_CHAR_NUMBER);
	}

	/**
	 * 随机字符
	 *
	 * @param baseString 随机字符选取的样本
	 * @return 随机字符
	 * @since 3.1.2
	 */
	public static char randomChar(String baseString) {
		return baseString.charAt(randomInt(baseString.length()));
	}

	/**
	 * 生成随机颜色
	 *
	 * @return 随机颜色
	 * @since 4.1.5
	 * @deprecated 使用ImgUtil.randomColor()
	 */
	@Deprecated
	public static Color randomColor() {
		final Random random = getRandom();
		return new Color(random.nextInt(256), random.nextInt(256), random.nextInt(256));
	}

	/**
	 * 带有权重的随机生成器
	 *
	 * @param <T>        随机对象类型
	 * @param weightObjs 带有权重的对象列表
	 * @return {@link WeightRandom}
	 * @since 4.0.3
	 */
	public static <T> WeightRandom<T> weightRandom(WeightObj<T>[] weightObjs) {
		return new WeightRandom<>(weightObjs);
	}

	/**
	 * 带有权重的随机生成器
	 *
	 * @param <T>        随机对象类型
	 * @param weightObjs 带有权重的对象列表
	 * @return {@link WeightRandom}
	 * @since 4.0.3
	 */
	public static <T> WeightRandom<T> weightRandom(Iterable<WeightObj<T>> weightObjs) {
		return new WeightRandom<>(weightObjs);
	}

	/**
	 * 以当天为基准，随机产生一个日期
	 *
	 * @param min 偏移最小天，可以为负数表示过去的时间（包含）
	 * @param max 偏移最大天，可以为负数表示过去的时间（不包含）
	 * @return 随机日期（随机天，其它时间不变）
	 * @since 4.0.8
	 */
	public static DateTime randomDay(int min, int max) {
		return randomDate(DateUtil.date(), DateField.DAY_OF_YEAR, min, max);
	}

	/**
	 * 以给定日期为基准，随机产生一个日期
	 *
	 * @param baseDate  基准日期
	 * @param dateField 偏移的时间字段，例如时、分、秒等
	 * @param min       偏移最小量，可以为负数表示过去的时间（包含）
	 * @param max       偏移最大量，可以为负数表示过去的时间（不包含）
	 * @return 随机日期
	 * @since 4.5.8
	 */
	public static DateTime randomDate(Date baseDate, DateField dateField, int min, int max) {
		if (null == baseDate) {
			baseDate = DateUtil.date();
		}

		return DateUtil.offset(baseDate, dateField, randomInt(min, max));
	}

}
