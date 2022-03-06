# 手写promise

### 关于Promise，我们需要清楚：

1. Promise是否决议，由开发者控制

2. 开发者通过调用由 executor函数调用的 resolve/reject 来控制当前promise决议/拒绝的时机

3. promise 的 resolve/reject 函数的调用，是一个状态变更的过程，即 promise状态由 pending => fulfilled/rejected，  所以 resolve/reject 内部首先会翻转 promise 的状态，设置 promise 的值/拒绝原因， 然后会遍历 promise 决议成功/拒绝回调函数列表，循环调用列表中的 决议成功/拒绝回调函数

4. promise 的 决议成功/拒绝回调函数由 then/catch 传入，而 决议成功/拒绝回调函数 内部并不知道promise是何时决议/拒绝，只能反过来由promise决议时，去主动调用 决议/拒绝函数。

**具体实现方式：**

1. promise 内部先定义好 决议/拒绝回调函数列表 
2. then 函数执行时，将接收的 决议/拒绝回调函数 push进 决议/拒绝回调函数列表
3. promise 决议/拒绝时循环遍历调用 决议/拒绝回调函数列表 内部的 决议/拒绝回调函数

```javascript
/**
 * 关于Promise，我们需要清楚：
 * 1. Promise是否决议，由开发者控制
 * 2. 开发者通过调用由 executor函数调用的 resolve/reject 来控制当前promise决议/拒绝的时机
 * 3. promise 的 resolve/reject 函数的调用，是一个状态变更的过程
 *    即 promise状态由 pending => fulfilled/rejected
 *    所以 resolve/reject 内部首先会翻转 promise 的状态，设置 promise 的值/拒绝原因
 *    然后会遍历 promise 决议成功/拒绝回调函数列表，循环调用列表中的 决议成功/拒绝回调函数
 * 4. promise 的 决议成功/拒绝回调函数由 then/catch 传入，
 *    而 决议成功/拒绝回调函数 内部并不知道promise是何时决议/拒绝，只能反过来由promise决议时，
 *    去主动调用 决议/拒绝函数。
 *    具体实现方式：
 *      promise 内部先定义好 决议/拒绝回调函数列表 
 *      then 函数执行时，将接收的 决议/拒绝回调函数 push进 决议/拒绝回调函数列表
 *      promise 决议/拒绝时循环遍历调用 决议/拒绝回调函数列表 内部的 决议/拒绝回调函数
 */
const PENDING = Symbol('pending')
const FULFILLED = Symbol('fulfilled')
const REJECTED = Symbol('rejected')

class Promise {
    // 状态
    status = PENDING
    // 值
    value = null
    // 拒绝原因
    reason = null
    // 决议成功回调函数列表
    onSuccessCallbacks = []
    // 拒绝回调函数列表
    onFailCallbacks = []

    constructor(executor) {
        try {
            executor(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }
    /**
     * 决议成功函数
     * 
     * 通过 executor 提供给开发者在Promise决议成功后调用
     * @param {any} data 决议成功数据
     */
    resolve = (data) => {
        /**
         * 当且仅当promise为pending状态，即未决议状态调用
         * 因为只有promise决议成功时才会调用
         * 所以这里会翻转promise状态为成功，并设置promise的值
         * 最后遍历执行 成功回调函数列表(onSuccessCallbacks) 里面的函数
         */
        if (this.status === PENDING) {
            this.status = FULFILLED
            this.value = data
            this.onSuccessCallbacks.forEach(fn => fn(this.value))
        }
    }
    /**
     * 决议拒绝函数
     * 
     * 通过 executor 提供给开发者在决议失败后调用
     * @param {any} err 错误信息
     */
    reject = (err) => {
        /**
         * 当且仅当promise为pending状态，即未决议状态调用
         * 因为只有promise决议失败时才会调用
         * 所以这里会翻转promise状态为失败，并设置promise的失败原因
         * 最后遍历执行 失败回调函数列表(onFailCallbacks) 里面的函数
         */
        if (this.status === PENDING) {
            this.status = REJECTED
            this.reason = err
            this.onFailCallbacks.forEach(fn => fn(this.reason))
        }
    }
    /**
     * then
     * @param {Function} onSuccess 成功回调
     * @param {Function} onFail 失败回调
     * @returns 一个新的promise
     */
    then = (onSuccess, onFail) => {
        return new Promise((resolve, reject) => {
            const onSuccessCallback = (data) => {
                queueMicrotask(() => {
                    const resolveData = typeof onSuccess === 'function' ? onSuccess(data) : data
                    resolve(resolveData)

                })
            }
            const onFailCallback = (err) => {
                queueMicrotask(() => {
                    // 有错误回调 则resolve错误回调的结果
                    if (typeof onFail === 'function') {
                        resolve(onFail(err))
                    } else {
                        // 无错误回调 则直接reject错误
                        reject(err)
                    }
                })
            }

            if (this.status === PENDING) {
                this.onSuccessCallbacks.push(onSuccessCallback)
                this.onFailCallbacks.push(onFailCallback)
            }
            if (this.status === FULFILLED) {
                onSuccessCallback(this.value)
            }
            if (this.status === REJECTED) {
                onFailCallback(this.reason)
            }
        })
    }

    catch = (errorCallback) => {
        return new Promise((resolve, reject) => {
            const onFailCallback = (err) => {
                queueMicrotask(() => {
                    resolve(errorCallback(err))
                })
            }

            if (this.status === PENDING) {
                this.onFailCallbacks.push(onFailCallback)
            }
        })
    }

    static resolve(data) {
        if (data instanceof Promise) {
            return data
        } else {
            return new Promise((resolve, reject) => {
                resolve(data)
            })
        }
    }
    static reject(data) {
        return new Promise((resolve, reject) => {
            reject(data)
        })
    }
    static all(list) {
        let result = []
        let num = 0
        let l = list.length

        const resultSort = (result) => {
            return result.sort((a, b) => a.i - b.i).map(item => item.data)
        }

        return new Promise((resolve, reject) => {
            list.forEach((item, i) => {
                if (item instanceof Promise) {
                    item.then(data => {
                        result.push({ i, data })
                        if (++num === l) {
                            resolve(resultSort(result))
                        }
                    }, err => {
                        reject(err)
                    })
                } else {
                    result.push({ i, data: item })
                    if (++num === l) {
                        resolve(resultSort(result))
                    }
                }
            })

        })
    }
}

module.exports = Promise

```