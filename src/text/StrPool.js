/**
 * 常用字符串常量定义
 * @see CharPool
 *
 */
import CharPool from "./CharPool";

export default class StrPool {

	/**
	 * 字符常量：空格符 {@code ' '}
	 */
	C_SPACE = CharPool.SPACE;

	/**
	 * 字符常量：制表符 {@code '\t'}
	 */
	C_TAB = CharPool.TAB;

	/**
	 * 字符常量：点 {@code '.'}
	 */
	C_DOT = CharPool.DOT;

	/**
	 * 字符常量：斜杠 {@code '/'}
	 */
	C_SLASH = CharPool.SLASH;

	/**
	 * 字符常量：反斜杠 {@code '\\'}
	 */
	C_BACKSLASH = CharPool.BACKSLASH;

	/**
	 * 字符常量：回车符 {@code '\r'}
	 */
	C_CR = CharPool.CR;

	/**
	 * 字符常量：换行符 {@code '\n'}
	 */
	C_LF = CharPool.LF;

	/**
	 * 字符常量：下划线 {@code '_'}
	 */
	C_UNDERLINE = CharPool.UNDERLINE;

	/**
	 * 字符常量：逗号 {@code ','}
	 */
	C_COMMA = CharPool.COMMA;

	/**
	 * 字符常量：花括号（左） <code>'{'</code>
	 */
	C_DELIM_START = CharPool.DELIM_START;

	/**
	 * 字符常量：花括号（右） <code>'}'</code>
	 */
	C_DELIM_END = CharPool.DELIM_END;

	/**
	 * 字符常量：中括号（左） {@code '['}
	 */
	C_BRACKET_START = CharPool.BRACKET_START;

	/**
	 * 字符常量：中括号（右） {@code ']'}
	 */
	C_BRACKET_END = CharPool.BRACKET_END;

	/**
	 * 字符常量：冒号 {@code ':'}
	 */
	C_COLON = CharPool.COLON;

	/**
	 * 字符常量：艾特 {@code '@'}
	 */
	C_AT = CharPool.AT;

	/**
	 * 字符串常量：制表符 {@code "\t"}
	 */
	TAB = "	";

	/**
	 * 字符串常量：点 {@code "."}
	 */
	DOT = ".";

	/**
	 * 字符串常量：双点 {@code ".."} <br>
	 * 用途：作为指向上级文件夹的路径，如：{@code "../path"}
	 */
	DOUBLE_DOT = "..";

	/**
	 * 字符串常量：斜杠 {@code "/"}
	 */
	SLASH = "/";

	/**
	 * 字符串常量：反斜杠 {@code "\\"}
	 */
	BACKSLASH = "\\";

	/**
	 * 字符串常量：回车符 {@code "\r"} <br>
	 * 解释：该字符常用于表示 Linux 系统和 MacOS 系统下的文本换行
	 */
	CR = "\r";

	/**
	 * 字符串常量：换行符 {@code "\n"}
	 */
	LF = "\n";

	/**
	 * 字符串常量：Windows 换行 {@code "\r\n"} <br>
	 * 解释：该字符串常用于表示 Windows 系统下的文本换行
	 */
	CRLF = "\r\n";

	/**
	 * 字符串常量：下划线 {@code "_"}
	 */
	UNDERLINE = "_";

	/**
	 * 字符串常量：减号（连接符） {@code "-"}
	 */
	DASHED = "-";

	/**
	 * 字符串常量：逗号 {@code ","}
	 */
	COMMA = ",";

	/**
	 * 字符串常量：花括号（左） <code>"{"</code>
	 */
	DELIM_START = "{";

	/**
	 * 字符串常量：花括号（右） <code>"}"</code>
	 */
	DELIM_END = "}";

	/**
	 * 字符串常量：中括号（左） {@code "["}
	 */
	BRACKET_START = "[";

	/**
	 * 字符串常量：中括号（右） {@code "]"}
	 */
	BRACKET_END = "]";

	/**
	 * 字符串常量：冒号 {@code ":"}
	 */
	COLON = ":";

	/**
	 * 字符串常量：艾特 {@code "@"}
	 */
	AT = "@";


	/**
	 * 字符串常量：HTML 空格转义 {@code "&nbsp;" -> " "}
	 */
	HTML_NBSP = '&nbsp;';

	/**
	 * 字符串常量：HTML And 符转义 {@code "&amp;" -> "&"}
	 */
	HTML_AMP = "&amp;";

	/**
	 * 字符串常量：HTML 双引号转义 {@code "&quot;" -> "\""}
	 */
	HTML_QUOTE = "&quot;";

	/**
	 * 字符串常量：HTML 单引号转义 {@code "&apos" -> "'"}
	 */
	HTML_APOS = "&apos";

	/**
	 * 字符串常量：HTML 小于号转义 {@code "&lt;" -> "<"}
	 */
	HTML_LT = "&lt;";

	/**
	 * 字符串常量：HTML 大于号转义 {@code "&gt;" -> ">"}
	 */
	HTML_GT = "&gt;";

	/**
	 * 字符串常量：空 JSON {@code "{}"}
	 */
	EMPTY_JSON = "{}";
}
