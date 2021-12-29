/**
 * ID生成器工具类，此工具类中主要封装：
 *
 * <pre>
 * 1. 唯一性ID生成器：UUID、ObjectId（MongoDB）、Snowflake
 * </pre>
 *
 * <p>
 * ID相关文章见：http://calvin1978.blogcn.com/articles/uuid.html
 *
 * @author looly
 * @since 4.1.13
 */
import UUID from "./UUID";

export default class IdUtil {



	/**
	 * 获取随机UUID
	 *
	 * @return string
	 */
	 static /*String*/ randomUUID() {
		return UUID.randomUUID();
	}

	/**
	 * 简化的UUID，去掉了横线
	 *
	 * @return 简化的UUID，去掉了横线
	 */
	 static  simpleUUID() {
		return UUID.randomUUID().replaceAll('-','')
	}





}
