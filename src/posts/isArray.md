# isArray
```javascript
const toString = {}.toString

Array.isArray = Array.isArray || function(arr){
	return toString.call(arr) === '[object Array]'
}
```

参考链接:

[isarray](https://github.com/juliangruber/isarray)

