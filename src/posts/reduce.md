# myReduce

```javascript
Array.prototype.myReduce = function () {
    const [fn, initAcc] = [].slice.call(arguments)

    let acc = initAcc || null

    for (let i = 0; i < this.length; i++) {
        acc = fn(acc, this[i], i)
    }

    return acc
}

```

