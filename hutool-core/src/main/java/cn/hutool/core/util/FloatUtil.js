

export default class FloatUtil {


    /**
     * 浮点数判断相等，
     * 浮点数比较特殊 例如 0.1 + 0.2  = 0.30000000000000004
     * @param a
     * @param b
     * @returns {boolean}
     */
    static equals(a, b){
        if(a == b){
            return true
        }
        if(a == null || b == null){
            return false
        }

        return Math.abs(a - b)  < 0.00001
    }


}