/**
 * 数字工具类<br>
 * 对于精确值计算应该使用 {@link BigDecimal}<br>
 * JDK7中<strong>BigDecimal(double val)</strong>构造方法的结果有一定的不可预知性，例如：
 *
 * <pre>
 * new BigDecimal(0.1)
 * </pre>
 * <p>
 * 表示的不是<strong>0.1</strong>而是<strong>0.1000000000000000055511151231257827021181583404541015625</strong>
 *
 * <p>
 * 这是因为0.1无法准确的表示为double。因此应该使用<strong>new BigDecimal(String)</strong>。
 * </p>
 * 相关介绍：
 * <ul>
 * <li>http://www.oschina.net/code/snippet_563112_25237</li>
 * <li>https://github.com/venusdrogon/feilong-core/wiki/one-jdk7-bug-thinking</li>
 * </ul>
 *
 */
export default class NumberUtil {


}
