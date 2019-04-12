
// 栈的实现

class Stack {
    constructor() {
        this.store = [];
        this.top = 0;
    }
    // 增加一个
    push(val) {
        this.store.push(val);
    }
    // 清除最上面的一个
    pop() {
        this.store.pop();
    }
    // 是否为空
    isEmpty() {
        return this.store.length === 0;
    }
    // 返回最上面一个元素
    peek() {
        return this.store[this.store.length - 1];
    }
    size() {
        return this.store.length;
    }
    clear() {
        this.store = [];
    }
}


let stack = new Stack();




// 队列的实现

class Queue {
    constructor() {
        this.items = [];
    }
    // 向队列尾部添加一个或多个元素
    enqueue(val) {
        this.items.push(val);
    }
    // 移除队列的第一个元素 返回被移除的元素
    dequeue(val) {
        return this.items.shift();
    }
    // 返回队列的第一个元素 最先被添加的也就是被移除的元素 队列不做任何改变
    front() {
        return this.items[0];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    clear() {
        this.items = [];
    }
    size() {
        return this.items.length;
    }
}

/**
 * 循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。
 * 它也被称为“环形缓冲器”。循环队列的一个好处是我们可以利用这个队列之前用过的空间。在一个普通队列里，一旦一个队列满了，
 * 我们就不能插入下一个元素，即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。你的实现应该支持如下操作：
 **/

class MyQueue {
    // set the size of the queue to be k
    constructor() {
        this.size = k;
        this.head = -1;
        this.tail = -1;
        this.data = [];
    }

    isEmpty() {
        return this.head == -1 && this.tail == -1;
    }
    isFull() {
        return this.head == this.tail;
    }
}

