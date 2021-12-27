/**
 * 序列化工具类
 */
export default class SerializeUtil {

    /**
     * 序列化后拷贝流的方式克隆
     *
     * @param obj 被克隆对象
     * @return 反序列化后的对象
     */
    static clone(obj) {
        return this.deserialize(this.serialize(obj));
    }

    /**
     * 序列化<br>
     *
     * @param obj 要被序列化的对象
     * @return string
     */
    static serialize(obj) {
        return JSON.stringify(obj);
    }

    /**
     * 反序列化<br>
     * 对象必须实现Serializable接口
     *
     * <p>
     * 注意！！！ 此方法不会检查反序列化安全，可能存在反序列化漏洞风险！！！
     * </p>
     *
     * @param bytes 反序列化的字节码
     * @return 反序列化后的对象
     */
    static deserialize(data) {
        return JSON.parse(data)
    }
}
