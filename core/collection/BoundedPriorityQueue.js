/**
 * 有界优先队列<br>
 * 按照给定的排序规则，排序元素，当队列满时，按照给定的排序规则淘汰末尾元素（去除末尾元素）
 * @author xiaoleilu
 *
 * @param <E> 成员类型
 */
export default class BoundedPriorityQueue {

    //容量
    capacity;
    comparator;


    _arr = [];


    /**
     * 构造
     * @param capacity 容量
     * @param comparator 比较器
     */
    constructor({capacity, comparator}) {
        this.capacity = capacity;
        this.comparator = comparator;
    }

    /**
     * 加入元素，当队列满时，淘汰末尾元素
     * @param e 元素
     */
    offer(e) {
        this._arr.push(e)
        this._arr.sort(this.comparator)

         if (this._arr.length >= this.capacity) {
             this._arr.pop()
        }
    }




    /**
     * 添加多个元素<br>
     * 参数为集合的情况请使用{@link PriorityQueue#addAll}
     * @param c 元素数组
     * @return 是否发生改变
     */
    addAll(arr) {
        for (let e of arr) {
            this.offer(e)
        }
    }

    /**
     * @return *[]
     */
    getList() {
        const list = [];

        for (let e of this._arr) {
            list.push(e)
        }
        return list;
    }
}
