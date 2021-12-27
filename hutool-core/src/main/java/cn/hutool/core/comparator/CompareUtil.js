
/**
 * 比较工具类
 */
export default class CompareUtil {



	/**
	 * {@code null}安全的对象比较，{@code null}对象小于任何对象
	 *
	 * @param <T> 被比较对象类型
	 * @param c1  对象1，可以为{@code null}
	 * @param c2  对象2，可以为{@code null}
	 * @return 比较结果，如果c1 < c2，返回数小于0，c1==c2返回0，c1 > c2 大于0
	 */
	 static  compare(c1, c2) {
		return c1 - c2;
	}




}
