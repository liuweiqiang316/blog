---
tag:
- JavaScript
---
# 作用域与this绑定

## 作用域

作用域是一套规则，用来确定何时以及如何查找变量（标识符）。具体查找规则是LHS，RHS。

LHS是给变量赋值，相当于set

RHS是查找变量，相当于get

变量的查找是从内到外的。

LHS没查到变量，非严格模式下会自动创建一个，严格模式会抛ReferenceError错误。

RHS没查到变量，会抛ReferenceError错误；查找到变量但是对变量做不合理的操作，比如对一个非函数类型 变量进行函数调用，或变量的值是null,undefined而引用变量的属性，引擎会抛TypeError错误。

作用域分为**词法作用域**和**动态作用域**。JavaScript用的是词法作用域，bash用的是动态作用域。大括号、函数、try/catch包裹起来的代码块，可以形成一个作用域。主要区别：词法作用域是在写代码或者说**定义时**确定的，而动态作用域是在**运行时**确定的。（this也是！）词法作用域关注函数在何处**声明**，而动态作用域关注函数从何处**调用**。

JavaScript是词法作用域，所以js的作用域是声明时就确定了。要注意不能跟函数调用栈弄混，函数调用栈是函数的调用关系，js引擎根据作用域查找变量是按照作用域的嵌套关系查找的，而这个嵌套关系在函数声明时就确认了。

## this绑定

函数的this是**运行时**绑定的，它指向什么完全取决于函数在哪里被调用，跟js作用域没有关系。

绑定规则：

1. 默认绑定  foo()

    - 严格模式绑定undefined

    - 非严格模式绑定全局对象

2. 隐式绑定 obj.foo()

    ```javascript
    function foo() {
        console.log(this.a)
    }
    
    let a = 1
    
    let obj = { a: 2, foo: foo }
    // 绑定到这个上下文对象
    obj.foo() // 2
    ```

3. 显式绑定

    - call/apply

    ```javascript
    function foo() {
        console.log(this.a)
    }
    
    let a = 1
    
    let obj = { a: 2 }
    
    foo.apply(obj) // 2
    ```

    - 硬绑定(bind)

    ```javascript
    function foo() {
        console.log(this.a)
    }
    
    let a = 1
    
    let obj = { a: 2 }
    
    let bar = foo.bind(obj)
    bar() // 2
    ```

    - 软绑定

    ```javascript
    function foo() {
        console.log(this.a)
    }
    
    let a = 1
    
    let obj = { a: 2 }
    
    Function.prototype.softBind = function (obj) {
        const fn = this
        const args = [].slice.call(arguments, 1)
        const bound = function () {
            const thisArg = !this || this === (window || global) ? obj : this
            return fn.apply(thisArg, [...args, ...arguments])
        }
        bound.prototype = Object.create(fn.prototype)
        return bound
    }
    
    let bar = foo.softBind(obj)
    bar() // 浏览器环境:2
    ```

4. new绑定

    ```javascript
    // 绑定到new出来的对象
    function foo(a){
        this.a = a
    }
    
    let a = 1
    
    let obj = new foo(3)
    console.log(obj.a) // 3
    ```

5. 箭头函数绑定

    - 使用箭头函数外面一层的函数的this

以上5种绑定规则，1,2,3,4优先级依次递增，5是针对箭头函数的固定规则。
