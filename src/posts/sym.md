# sym

```javascript
/*
	求n个数组的对称差集,并对对称差集从小到大排序
	入参: 需要求对称差集的数组列表
	返回: 依次求前一个数组与后一数组的对称差集,再用对称差集与再后一数组求对称差集,直至最后
*/
function sym() {
  return [].slice.call(arguments).reduce((acc, curr) => {
    [...new Set(curr)].forEach(c => {
      if(acc.includes(c)){
        acc = acc.filter(a => a !== c)
      }else{
        acc.push(c)
      }
    })
    return acc
  },[]).sort()
}

sym([1, 2, 3], [5, 2, 1, 4]); // [3,4,5]

```

