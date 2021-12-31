/**
 * 数组工具类
 */
import RandomUtil from "./RandomUtil";

export default class ArrayUtil  {




	static removeAt(arr: any[], index: number) {
		arr.splice(index)
	}



	static pushIfNotExist(arr: any[], item: number) {
		const index = arr.indexOf(item)
		if(index == -1) {
			arr.push(item)
		}
	}

	static pushAll(arr: any[], newArr:  any[]){
		for(let i = 0; i < newArr.length; i++){
			arr.push(newArr[i])
		}
	}

	// ---------------------------------------------------------------------- isEmpty

	/**
	 * 数组是否为空
	 *
	 * @param array 数组
	 * @return boolean
	 */
	static isEmpty(array: any[]) {
		return array == null || array.length == 0;
	}

	/**
	 * 如果给定数组为空，返回默认数组
	 * @param array        数组
	 * @param defaultArray 默认数组
	 * @return 非空（empty）的原数组或默认数组
	 */
	static  defaultIfEmpty(array: any[], defaultArray: any[]) {
		return this.isEmpty(array) ? defaultArray : array;
	}


	// ---------------------------------------------------------------------- isNotEmpty

	/**
	 * 数组是否为非空
	 *
	 * @param    数组元素类型
	 * @param array 数组
	 * @return boolean
	 */
	static isNotEmpty(array:  any[]) {
		return null != array && array.length !== 0;
	}


	/**
	 * 是否包含{@code null}元素
	 *
	 * @param    数组元素类型
	 * @param array 被检查的数组
	 * @return 是否包含{@code null}元素
	 */
	static hasNull(array: any[]) {
		if (this.isNotEmpty(array)) {
			for (let element of array) {
				if (element == null) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 多个字段是否全为null
	 *
	 * @param    数组元素类型
	 * @param array 被检查的数组
	 * @return boolean
	 */
	static   isAllNull(array: any[]) {
		for(let element of array){
			if(element !== null){
				return  false
			}
		}
		return  true
	}

	/**
	 * 返回数组中第一个非空元素
	 *
	 * @param array 数组
	 * @return 非空元素，如果不存在非空元素或数组为空，返回{@code null}
	 */
	static firstNonNull(array:any[]) {
		for ( let el of array){
			if (el === null){
				return  el
			}
		}

		return  null
	}

	/**
	 * 返回数组中第一个匹配规则的值
	 *
	 * @param matcher 匹配接口，实现此接口自定义匹配规则
	 * @param array   数组
	 * @return 匹配元素，如果不存在匹配元素或数组为空，返回 {@code null}
	 */
	static firstMatch(regex: string, array: any) {
		for(let el of array){
			if (typeof(el) === 'string' && el.match(regex)){
				return  el
			}
		}
		return null
	}

	/**
	 * 返回数组中第一个匹配规则的值的位置
	 *
	 * @param matcher 匹配接口，实现此接口自定义匹配规则
	 * @param array   数组
	 * @return 匹配到元素的位置，-1表示未匹配到
	 */
	static  matchIndex(regex:string, array:any[]) {
		for(let i = 0, len = array.length; i < len; i++){
			const el = array[i]
			if (typeof(el) === 'string' && el.match(regex)){
				return  i;
			}
		}
		return -1
	}



	/**
	 * 新建一个空数组
	 *
	 * @param componentType 元素类型
	 * @param newSize       大小
	 * @return any[]
	 */
	static  newArray(newSize: number) {
		return new Array(newSize)
	}


	/**
	 * 将新元素添加到已有数组中<br>
	 *
	 * @param          数组元素类型
	 * @param buffer      已有数组
	 * @param newElements 新元素
	 * @return 新数组
	 */
	static append(buffer: any[], ...newElements: any[]) {
		if (this.isEmpty(buffer)) {
			return newElements;
		}

        for(let el of newElements){
            buffer.push(el)
        }

	}

	/**
	 * 将元素值设置为数组的某个位置，当给定的index大于数组长度，则追加
	 *
	 * @param     数组元素类型
	 * @param buffer 已有数组
	 * @param index  位置，大于长度追加，否则替换
	 * @param value  新值
	 */
	static  setOrAppend(buffer:  any[], index: number, value: any) {
		if (index < buffer.length) {
            buffer[index] = value
			return buffer;
		} else {
			return this.append(buffer, value);
		}
	}



	/**
	 * 将新元素插入到到已有数组中的某个位置<br>
	 * 如果插入位置为为负数，从原数组从后向前计数，若大于原数组长度，则空白处用null填充
	 *
	 * @param          数组元素类型
	 * @param buffer      已有数组
	 * @param index       插入位置，此位置为对应此位置元素之前的空档
	 * @param newElements 新元素
	 * @return 新数组
	 */
	static insert(buffer: any[], index: any, newElements: any) {
        buffer.splice(index, 0, newElements)
		return  buffer
	}


	/**
	 * 生成一个新的重新设置大小的数组<br>
	 * 调整大小后拷贝原数组到新数组下。扩大则占位前N个位置，缩小则截断
	 *
	 * @param            数组元素类型
	 * @param data          原数组
	 * @param newSize       新的数组大小
	 * @param componentType 数组元素类型
	 * @return any[]
	 */
	static   resize(data: any[], newSize: number) {
		if (newSize < 0) {
			return data;
		}

		const newArray = new Array(newSize);

        const oldSize = data.length;

        for(let i = 0; i < newSize && i < oldSize; i++){
            newArray[i] = data[i];
        }

		return newArray;
	}


	/**
	 * 将多个数组合并在一起<br>
	 * 忽略null的数组
	 *
	 * @param     数组元素类型
	 * @param arrays 数组集合
	 * @return *[]
	 */
	static  addAll(...arrays: any[]):any[] {
		if (arrays.length == 1) {
			return arrays[0];
		}

        const result: any[] = []
        for(let array of arrays){
            result.concat(array)
        }
        return  result;
	}









	/**
	 * 过滤<
	 */
	static   filter(array: any[], filter: any) {
		if (null == array || null == filter) {
			return array;
		}

        return  array.filter(filter);
	}

	/**
	 * 去除{@code null} 元素
	 *
	 * @param    数组元素类型
	 * @param array 数组
	 * @return 处理后的数组
	 */
	static  removeNull(array: any[]) {
        return array.filter(a=>a!=null);
	}

	/**
	 * 去除{@code null}或者"" 元素
	 *
	 * @param    数组元素类型
	 * @param array 数组
	 * @return 处理后的数组
	 */
	static removeEmpty(array: any[]) {
        return array.filter(a=>a != null && a != '')
	}

	/**
	 * 去除{@code null}或者""或者空白字符串 元素
	 *
	 * @param    数组元素类型
	 * @param array 数组
	 * @return 处理后的数组
	 */
	static  removeBlank(array: any[]) {
		return array.filter(a=>a!= null && a.trim() != '')
	}

	/**
	 * 数组元素中的null转换为""
	 *
	 * @param array 数组
	 * @return 新数组
	 */
	static nullToEmpty(array: any[]) {
        return array.map(a => a == null ? '' : a)
    }

	/**
	 * 映射键值（参考Python的zip()函数）
	 * 例如：
	 * keys = [a,b,c,d]
	 * values = [1,2,3,4]
	 * 则得到的Map是 {a=1, b=2, c=3, d=4}
	 * 如果两个数组长度不同，则只对应最短部分
	 *
	 * @param <K>     Key类型
	 * @param <V>     Value类型
	 * @param keys    键列表
	 * @param values  值列表
	 * @param isOrder 是否有序
	 * @return Map
	 */
	static  zip(keys:  string[], values: any[]) {
		if (this.isEmpty(keys) || this.isEmpty(values)) {
			return null;
		}

	    const size = Math.min(keys.length, values.length);
		const map= new Map();

		for (let i = 0; i < size; i++) {
			let key:string = keys[i];
			map[key] = values[i];
		}

		return map;
	}


	// ------------------------------------------------------------------- indexOf and lastIndexOf and contains



	/**
	 * 返回数组中指定元素所在位置，未找到返回{@link #INDEX_NOT_FOUND}
	 *
	 * @param    数组类型
	 * @param array 数组
	 * @param value 被检查的元素
	 * @return 数组中指定元素所在位置，未找到返回{@link #INDEX_NOT_FOUND}
	 */
	static indexOf(array: string | any[], value: any) {
        for(let i = 0 ; i < array.length; i++){
            if(array[i] == value){
                return  i;
            }
        }
        return -1;
	}

	/**
	 * 返回数组中指定元素所在位置，忽略大小写，未找到返回{@link #INDEX_NOT_FOUND}
	 *
	 * @param array 数组
	 * @param value 被检查的元素
	 * @return 数组中指定元素所在位置，未找到返回{@link #INDEX_NOT_FOUND}
	 */
	static indexOfIgnoreCase(array: any[], value: string) {
			for (let i = 0; i < array.length; i++) {
                const el = array[i];
				if (el == value) {
					return i;
				}

                if ( typeof el == 'string' && value != null  && el.toLowerCase() == value.toLowerCase()){
                    return  i;
                }
			}

            return -1;
	}



	/**
	 * 返回数组中指定元素所在最后的位置，未找到返回{@link #INDEX_NOT_FOUND}
	 *
	 * @param array      数组
	 * @param value      被检查的元素
	 * @param endInclude 查找方式为从后向前查找，查找的数组结束位置，一般为array.length-1
	 * @return 数组中指定元素所在位置，未找到返回{@link #INDEX_NOT_FOUND}
	 */
	static lastIndexOf( array: any[], value: any) {
		if (this.isNotEmpty(array)) {
			for (let i = array.length; i >= 0; i--) {
				if (value === array[i]) {
					return i;
				}
			}
		}
		return -1;
	}

	/**
	 * 数组中是否包含元素
	 *
	 * @param    数组元素类型
	 * @param array 数组
	 * @param value 被检查的元素
	 * @return boolean
	 */
	static  contains(array:  any[], value: any) {
		return array.indexOf(value) !== -1;
	}

	/**
	 * 数组中是否包含指定元素中的任意一个
	 *
	 * @param     数组元素类型
	 * @param array  数组
	 * @param values 被检查的多个元素
	 * @return boolean
	 */
	static  containsAny(array: any[], ...values: any[]) {
		for (let value of values) {
			if (this.contains(array, value)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 数组中是否包含指定元素中的全部
	 *
	 * @param     数组元素类型
	 * @param array  数组
	 * @param values 被检查的多个元素
	 * @return boolean
	 */
	static  containsAll(array: any[], ...values: any[]) {
		for (let value of values) {
			if (false == this.contains(array, value)) {
				return false;
			}
		}
		return true;
	}

	/**
	 * 数组中是否包含元素，忽略大小写
	 *
	 * @param array 数组
	 * @param value 被检查的元素
	 * @return boolean
	 */
	static containsIgnoreCase(array: any[], value: any) {
		return this.indexOfIgnoreCase(array, value) > -1;
	}

	// ------------------------------------------------------------------- Wrap and unwrap





	/**
	 * 获取数组对象中指定index的值，支持负数，例如-1表示倒数第一个值<br>
	 * 如果数组下标越界，返回null
	 *
	 * @param    数组元素类型
	 * @param array 数组对象
	 * @param index 下标，支持负数
	 * @return 值
	 */
	static   get(array:  any[], index: number) {
		if (null == array) {
			return null;
		}

		if (index < 0) {
			index += array.length
		}

        return  array[index]
	}

	/**
	 * 获取数组中指定多个下标元素值，组成新数组
	 *
	 * @param      数组元素类型
	 * @param array   数组
	 * @param indexes 下标列表
	 * @return any[]
	 */
	static getAny(array: any, ...indexes: any[]) {
		if (null == array) {
			return null;
		}

		const result = new Array(indexes.length);
		for (let i of indexes) {
			result[i] = this.get(array, i);
		}
		return result;
	}

	/**
	 * 获取子数组
	 *
	 * @param    数组元素类型
	 * @param array 数组
	 * @param start 开始位置（包括）
	 * @param end   结束位置（不包括）
	 * @return *[]
	 */
	static sub(array:  any[], start: number, end: number) {
		let length = array.length
		if (start < 0) {
			start += length;
		}
		if (end < 0) {
			end += length;
		}
		if (start == length) {
			return [];
		}
		if (start > end) {
			const tmp = start;
			start = end;
			end = tmp;
		}
		if (end > length) {
			if (start >= length) {
				return [];
			}
			end = length;
		}


		const result = []
		for(let i = start; i <end; i++){
			result.push(array[i])
		}
		return  result
	}





	/**
	 * 以 conjunction 为分隔符将数组转换为字符串
	 *
	 * @param          被处理的集合
	 * @param array       数组
	 * @param conjunction 分隔符
	 * @return 连接后的字符串
	 */
	static join(array: any[], conjunction: string) {
		return array.join(conjunction)
	}





	// ---------------------------------------------------------------------- remove

	/**
	 * 移除数组中对应位置的元素<br>
	 * copy from commons-lang
	 *
	 * @param    数组元素类型
	 * @param array 数组对象，可以是对象数组，也可以原始类型数组
	 * @param index 位置，如果位置小于0或者大于长度，返回原数组
	 * @return 去掉指定元素后的新数组或原数组
	 */
	static   remove(array: any[], index: number) {
		 array.splice(index, 1)
		return  array
	}

	// ---------------------------------------------------------------------- removeEle

	/**
	 * 移除数组中指定的元素<br>
	 * 只会移除匹配到的第一个元素 copy from commons-lang
	 *
	 * @param      数组元素类型
	 * @param array   数组对象，可以是对象数组，也可以原始类型数组
	 * @param element 要移除的元素
	 * @return 去掉指定元素后的新数组或原数组
	 * @throws IllegalArgumentException 参数对象不为数组对象
	 */
	static   removeEle(array: any[], element: any) {
		return this.remove(array, this.indexOf(array, element));
	}

	// ---------------------------------------------------------------------- Reverse array





	// ------------------------------------------------------------------------------------------------------------ min and max



	/**
	 * 取最小值
	 *
	 * @param numberArray 数字数组
	 * @return 最小值
	 */
	static  min(numberArray: any[]) {
		if (this.isEmpty(numberArray)) {
			throw new Error("Number array must not empty !");
		}
		let min = numberArray[0];
		for (let t of numberArray) {
			if (min > t) {
				min = t;
			}
		}
		return min;
	}



	/**
	 * 取最大值
	 *
	 * @param          元素类型
	 * @param numberArray 数字数组
	 * @param comparator  比较器，null表示默认比较器
	 * @return 最大值
	 */
	static max(numberArray: any[]) {
		if (this.isEmpty(numberArray)) {
			throw new Error("Number array must not empty !");
		}
		let max = numberArray[0];
		for (let i = 1; i < numberArray.length; i++) {
			if (max < numberArray[i]) {
				max = numberArray[i];
			}
		}
		return max;
	}

	// 使用Fisher–Yates洗牌算法，以线性时间复杂度打乱数组顺序



	/**
	 * 打乱数组顺序，会变更原数组
	 *
	 * @param     元素类型
	 * @param array  数组，会变更
	 * @param random 随机数生成器
	 * @return 打乱后的数组
	 * @author FengBaoheng
	 * @since 5.5.2
	 */
	static   shuffle(array: any[]) {
		if (array == null || array.length <= 1) {
			return array;
		}


		for (let i = array.length; i > 1; i--) {
			const randomInt = RandomUtil.randomInt(0, array.length);
			this.swap(array, i - 1, randomInt);
		}

		return array;
	}

	/**
	 * 交换数组中两个位置的值
	 *
	 * @param     元素类型
	 * @param array  数组
	 * @param index1 位置1
	 * @param index2 位置2
	 * @return 交换后的数组，与传入数组为同一对象
	 */
	static  swap( array: any[], index1: number, index2: number) {
		if (this.isEmpty(array)) {
			throw new Error("Array must not empty !");
		}
		let tmp = array[index1];
		array[index1] = array[index2];
		array[index2] = tmp;
		return array;
	}



	/**
	 * 计算{@code null}或空元素对象的个数，通过{@link ObjectUtil#isEmpty(Object)} 判断元素
	 *
	 * @param args 被检查的对象,一个或者多个
	 * @return 存在{@code null}的数量
	 * @since 4.5.18
	 */
	static  emptyCount(arr: any[]) {
		let count = 0;
		if (this.isNotEmpty(arr)) {
			for (let element of arr) {
				if (element == null) {
					count++;
				}
			}
		}
		return count;
	}

	/**
	 * 是否存在{@code null}或空对象，通过{@link ObjectUtil#isEmpty(Object)} 判断元素
	 *
	 * @param args 被检查对象
	 * @return 是否存在
	 * @since 4.5.18
	 */
	static  hasEmpty(args: any[]) {
		if (this.isNotEmpty(args)) {
			for (let element of args) {
				if (element == null) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 是否存都为{@code null}或空对象，通过{@link ObjectUtil#isEmpty(Object)} 判断元素
	 *
	 * @param args 被检查的对象,一个或者多个
	 * @return boolean
	 */
	static  isAllEmpty(args: any[]) {
		for(let el of args){
			if(el != null){
				return true
			}
		}
		return false
	}

	/**
	 * 是否存都不为{@code null}或空对象，通过{@link ObjectUtil#isEmpty(Object)} 判断元素
	 *
	 * @param args 被检查的对象,一个或者多个
	 * @return 是否都不为空
	 * @since 4.5.18
	 */
	static  isAllNotEmpty(args: any[]) {
		for(let el of args){
			if(el == null){
				return true
			}
		}
		return false
	}



	/**
	 * 去重数组中的元素，去重后生成新的数组，原数组不变<br>
	 * 此方法通过{@link LinkedHashSet} 去重
	 *
	 * @param    数组元素类型
	 * @param array 数组
	 * @return *[]
	 */
	static  distinct(array: any[]):any[] {
		if (this.isEmpty(array)) {
			return array;
		}

		const set = new Set();

		for (let el of array){
			set.add(el)
		}

		const arr: any[] = []
		set.forEach(v=>{
			arr.push(v)
		})
		return arr;
	}



	/**
	 * 判断两个数组是否相等，判断依据包括数组长度和每个元素都相等。
	 *
	 * @param array1 数组1
	 * @param array2 数组2
	 * @return 是否相等
	 */
	static  equals( array1:any[], array2:  any[]) {
		if (array1 == array2) {
			return true;
		}
		if(array1 == null || array2 == null){
			return false;
		}

		if(array1.length != array2.length){
			return false
		}

		let len = array1.length

		for(let i = 0; i < len; i++){
			if(array1[i] !== array2[i]) {
				return false
			}

		}

		return true
	}





}
