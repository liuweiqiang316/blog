# 生成器自动执行函数

调用生成器函数会生成一个迭代器（`iterator`）。

对迭代器进行遍历就是一个生成器的执行函数（`run0`），这个函数是同步执行的只能用来处理`gen`这种简单的生成器函数。`run0`这里用到`while`循环遍历，其实用`for`循环应该也是一样的。

`run1、run2`用的都是内部函数递归调用。不同点在于，`run1`用的是回调函数的形式，`run2`用的是`Promise`的形式，所以其实`run1`递归调用`step`时同步代码不会等异步函数执行，`run2`递归调用的`step`是包裹在Promise.then函数的内部执行函数中，所以`run2`一定是等到`gen1`内部的异步代码执行完成后才会执行下一次`step`也就是说一定会等到`gen1`函数内部`yield`的结果后才开始执行下面的代码。

```javascript
/**
 * 同步生成器执行函数
 * @param gen 生成器
 */
function run0(gen){
    const it = gen()
    let result = it.next()
    while(!result.done){
        result = it.next(result.value)
    }
}
/**
 * 回调形式生成器执行函数(支持异步)
 * @param gen 生成器
 */
function run1(gen) {
    const it = gen()
    let result = it.next()
    function step() {
        if (!result.done) {
            if (typeof result.value === 'function') {
                // error-first风格
                result.value(function (err, data) {
                    if (err) {
                        result = it.throw(err)
                    }
                    result = it.next(data)
                    step()
                })
            } else {
                result = it.next(result.value)
                step()
            }
        }
    }
    step()
}
/**
 * Promise形式生成器执行函数(支持异步)
 * @param gen 生成器
 */
function run2(gen) {
    const it = gen()
    let result = it.next()
    function step() {
        if (!result.done) {
            Promise.resolve(result.value).then(v => {
                result = it.next(v)
                step()
            }).catch(e => {
                result = it.throw(e)
            })
        }
    }
    step()
}

function* gen(){
    console.log(1)
    yield 1
    console.log(2)
    yield 1
    console.log(3)
    yield 1
}

const sleep = t => new Promise((resolve, reject) => setTimeout(() => resolve(), t))

function* gen1() {
    console.log(1)
    yield sleep(1000).then(() => {
        console.log(1.1)
        return 1
    })
    console.log(2)
    yield 2
    console.log(3)
    yield 3
}

// 三个run函数分别放开执行
// run0(gen) // 结果: 1, 2, 3
// run1(gen1) // 结果: 1, 2, 3, 1.1
run2(gen1) // 结果: 1, 1.1, 2, 3

```

参考：[深入理解ES6](https://book.douban.com/subject/27072230/)