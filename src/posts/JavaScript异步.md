# JavaScript 异步

JavaScript异步处理方式及演变。

### 回调

```javascript
/**
 * 回调形式的ajax函数的执行逻辑:
 * 1. 执行ajax函数自身的逻辑，如去服务器获取数据
 * 2. 对获取到的数据或者错误进行处理
 * 3. 执行回调函数(即开发者的代码) => 开发者所写的回调代码由ajax函数决定何时执行、如何执行
 */

// A Ajax上方代码
ajax(url, function(err, data){
    // C 回调函数内部
   if(err){
       // 错误逻辑处理
   } else {
       // 数据处理
   }
});
// B Ajax下方代码
 
```

Ajax上方的代码我们称为A，下方代码称为B，回调代码称为C 。

JavaScript引擎执行上方代码时，A、B均是在引擎直接控制下，而C部分代码的执行则是交由第三方控制。在JavaScript引擎控制下，可以认为就是在开发者自身的控制下，回调函数的执行交由第三方控制，我们称为***控制翻转（inversion of control， IOC）***，就会引起信任问题：

- 调用回调过早（在追踪之前）
- 调用回调过晚（或者没有调用）
- 调用回调的次数太少或太多
- 没有把所需的环境/参数成功传递给回调函数
- 吞掉可能出现的错误或异常

所以回调的根本问题在于，代码的执行控制交给第三方，无法保证回调按照开发者的预期调用。

回调函数存在的其他问题：

- 由于无法确定回调是否异步，导致代码执行顺序无法准确预测
- 回调执行顺序到处跳跃，不符合人脑顺序执行逻辑

### Promise

为了解决回调存在的问题，Promise应运而生。回调是开发者把代码执行控制交给第三方，Promise的方案：开发者不把代码执行控制交给第三方，而是第三方通过Promise提供一个能让开发者了解其任务何时结束的能力（***then***），然后由开发者自己决定下一步做什么。

Promise由ECMA制订规范，引擎负责实现，解决了回调的信任问题。

Promise保证了第三方的任务结束后，会将数据传递给`then`函数的`onfulfilled`入参函数，或者将错误传递给`then`函数的`onfulfilled`入参函数。

```javascript
/**
 * Promise的ajax函数的执行逻辑：
 * 1. 执行ajax函数自身的逻辑，如去服务器获取数据
 * 2. 以Promise的形式返回数据
 * 3. 由于ajax函数返回的是Promise，
 * 用户可以通过then的onfulfilled或onfulfilled获取函数返回的数据
 */

// A
// 假设此时的ajax函数返回一个Promise
ajax(url).then((data) => {
    // C 
    // 数据处理
}, (err) => {
    // 错误处理
})
// B
```

### Generator

Promise解决了回调的信任问题，在代码的组织形式上由回调的金字塔式嵌套变为`.then`的链式调用，仍然不够直观。于是，通过generator的形式解决了代码组织形式的问题。

大部分JavaScript代码都是同步执行的，generator是一个例外。generator函数是顺序写的代码，是看似同步的异步代码。

```javascript
function *gen(){
    yield 1
    yield 2
    yield 3
}

gen()

```

如上，`gen()`并不会同步把整个函数执行完，而是返回一个迭代器（`iterator`），需要对迭代器进行遍历来完整的执行`gen`生成器。也就是说，gen的执行是异步的，它的完整执行是由它生成的迭代器控制的，也就是生成器的异步代码执行控制在开发者手中。

如何解决Promise链式调用的问题？

答案：run + generator

解析：通过Promise的then函数我们可以拿到异步的结果，通过generator我们可以控制异步代码的执行时机。所以我们可以通过`generator`的`yield`暂停每一个Promise，直到Promise拿到结果后再调用（即在`then`的`onfulfilled`函数中调用`it.next()`继续下一轮的迭代），run函数就是具体的实现。

```javascript
function run(gen) {
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
const sleep = t => new Promise((resolve, reject) => setTimeout(() => resolve(), t))
function* gen() {
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
run(gen)

```

### async/await

Promise解决了回调的信任问题，run + generator解决的代码的组织形式。但是这个解决方案需要额外引入run函数以及不熟悉的generator，于是async/await应运而生。async/await从ECMA规范来，将异步代码重新以同步的形式展现。相当于JavaScript引擎内置了run函数，run + generator的形式，变为引擎内置run + async函数，所以async/await实际上是run + generator的语法糖。

```javascript
const sleep = t => new Promise((resolve, reject) => setTimeout(() => resolve(), t))
async function test() {
    const data = await sleep(1000).then(() => 'hello')
    console.log(data)
}
test() // hello

```





参考：

[你不知道的JavaScript（中卷）](https://book.douban.com/subject/26854244/)
