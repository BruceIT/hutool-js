/**
 * 字符串工具类
 *
 */
import IdUtil from "./IdUtil";

export default class StrUtil  {

    static isAllUpperCase(str: string){
        if(str) {
            return str == str.toUpperCase();
        }

        return false
    }


    /**
     * 截取字符串，根据 maxLength 截取后返回
     * @param {*} str
     * @param {*} maxLength
     */
    static cutByFullLength (str = '', maxLength: number) {
        let showLength = 0
        return str.split('').reduce((pre, cur) => {
            const charCode = cur.charCodeAt(0)
            if (charCode >= 0 && charCode <= 128) {
                showLength += 1
            } else {
                showLength += 2
            }
            if (showLength <= maxLength) {
                return pre + cur
            }
            return pre
        }, '')
    }


    /**
     * 获取字符串长度，英文字符 长度1，中文字符长度2
     * @param {*} str
     */
    static getFullLength (str = '') {
      return   str.split('').reduce((pre, cur) => {
            const charCode = cur.charCodeAt(0)
            if (charCode >= 0 && charCode <= 128) {
                return pre + 1
            }
            return pre + 2
        }, 0)
    }

    // ------------------------------------------------------------------------ Blank
    static EMPTY = '';

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
    static /*boolean*/ isBlankIfStr(obj: string) {
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
    static /*boolean*/ isEmptyIfStr(obj: string) {
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
    static trim(strs: string[]) {
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
    static /*String*/ reverse(str:string) {
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
    static /*String*/ fillBefore(str:string, filledChar:string, len:number) {
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
    static /*String*/ fillAfter(str: string, filledChar: string, len: number) {
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
    static /*String*/ fill(str:string, filledChar:string, len:number, isPre:boolean):string {
        const strLen = str.length;
        if (strLen > len) {
            return str;
        }

        const filledStr = this.repeat(filledChar, len - strLen);
        return isPre ? filledStr + str : str + filledStr;
    }



    /**
     * 生成随机UUID
     *
     * @return string
     * @see IdUtil#randomUUID()
     */
    static uuid():string {
        return IdUtil.randomUUID();
    }




    static isBlank(str: string):boolean {
        return str == null || str.length == 0 || str.trim().length == 0;
    }

    static isNotBlank(str:string):boolean {
        return str != null && str.length != 0 && str.trim().length != 0
    }

    static isUpperCase(c: string) {
        return 'ABCDEFGHIJKLMNOPORSTUVWXYZ'.indexOf(c) >= 0;
    }

    static isLowerCase(c: string) {
        return 'abcdefghijklmnoporstuvwxyz'.indexOf(c) >= 0;
    }

    static upperFirst(str: string) {
        return str[0].toUpperCase() + str.substring(1)
    }

    static contains(str: string , symbol: string) {
        return str.indexOf(symbol) >= 0;
    }

    // 检查 aaa， bbb 这种
    static isCharEquals(str: string ) {
        const first = str[0];
        for (let i = 0; i < str.length; i++) {
            if (first !== str[i]) {
                return false
            }
        }
        return true
    }

    static isNumeric(str: string) {
        return Number.isNaN(parseInt(str))
    }


    /**
     *
     * @param str
     * @param start
     * @param end 不包含
     * @returns {string}
     */
    static hide(str: string , start: number, end: number) {
        const buffer = []
        for (let i = 0; i < str.length; i++) {
            let ch = str[i];
            if(i>=start && i <end){
                ch = '*'
            }

            buffer.push(ch)
        }
        return buffer.join('');
    }

    static indexOf(str: string , ch: string) {
        return str.indexOf(ch);
    }

    static repeat(ch: string, len: number) {
        const sb = []
        for(let i = 0; i <len; i++){
            sb.push(ch)
        }
        return sb.join()
    }

    static removeAll(str: string, str2: string) {
        return str.replace(str2, '');
    }

    static isEmpty(str: string) {
        return str == null || str === '' || str.trim() == '';
    }
}