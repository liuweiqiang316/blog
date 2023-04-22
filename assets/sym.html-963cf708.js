const n=JSON.parse('{"key":"v-83e61732","path":"/posts/sym.html","title":"sym","lang":"zh-CN","frontmatter":{"description":"sym /* \\t求n个数组的对称差集,并对对称差集从小到大排序 \\t入参: 需要求对称差集的数组列表 \\t返回: 依次求前一个数组与后一数组的对称差集,再用对称差集与再后一数组求对称差集,直至最后 */ function sym() { return [].slice.call(arguments).reduce((acc, curr) =&gt; { [...new Set(curr)].forEach(c =&gt; { if(acc.includes(c)){ acc = acc.filter(a =&gt; a !== c) }else{ acc.push(c) } }) return acc },[]).sort() } sym([1, 2, 3], [5, 2, 1, 4]); // [3,4,5]","head":[["meta",{"property":"og:url","content":"http://liuweiqiang316.cn/blog/posts/sym.html"}],["meta",{"property":"og:title","content":"sym"}],["meta",{"property":"og:description","content":"sym /* \\t求n个数组的对称差集,并对对称差集从小到大排序 \\t入参: 需要求对称差集的数组列表 \\t返回: 依次求前一个数组与后一数组的对称差集,再用对称差集与再后一数组求对称差集,直至最后 */ function sym() { return [].slice.call(arguments).reduce((acc, curr) =&gt; { [...new Set(curr)].forEach(c =&gt; { if(acc.includes(c)){ acc = acc.filter(a =&gt; a !== c) }else{ acc.push(c) } }) return acc },[]).sort() } sym([1, 2, 3], [5, 2, 1, 4]); // [3,4,5]"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-22T16:47:24.000Z"}],["meta",{"property":"article:author","content":"微斯人"}],["meta",{"property":"article:modified_time","content":"2023-04-22T16:47:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"sym\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-22T16:47:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"微斯人\\",\\"url\\":\\"http://liuweiqiang316.cn/\\"}]}"]]},"headers":[],"git":{"createdTime":1682182044000,"updatedTime":1682182044000,"contributors":[{"name":"liuweiqiang","email":"liuweiqiang316@163.com","commits":1}]},"readingTime":{"minutes":0.4,"words":120},"filePathRelative":"posts/sym.md","localizedDate":"2023年4月22日","excerpt":"<h1> sym</h1>\\n<div class=\\"language-javascript line-numbers-mode\\" data-ext=\\"js\\"><pre class=\\"language-javascript\\"><code><span class=\\"token comment\\">/*\\n\\t求n个数组的对称差集,并对对称差集从小到大排序\\n\\t入参: 需要求对称差集的数组列表\\n\\t返回: 依次求前一个数组与后一数组的对称差集,再用对称差集与再后一数组求对称差集,直至最后\\n*/</span>\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">sym</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> <span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">slice</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">call</span><span class=\\"token punctuation\\">(</span>arguments<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">reduce</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">acc<span class=\\"token punctuation\\">,</span> curr</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token punctuation\\">[</span><span class=\\"token operator\\">...</span><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Set</span><span class=\\"token punctuation\\">(</span>curr<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">forEach</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">c</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token keyword\\">if</span><span class=\\"token punctuation\\">(</span>acc<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">includes</span><span class=\\"token punctuation\\">(</span>c<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        acc <span class=\\"token operator\\">=</span> acc<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">filter</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">a</span> <span class=\\"token operator\\">=&gt;</span> a <span class=\\"token operator\\">!==</span> c<span class=\\"token punctuation\\">)</span>\\n      <span class=\\"token punctuation\\">}</span><span class=\\"token keyword\\">else</span><span class=\\"token punctuation\\">{</span>\\n        acc<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">push</span><span class=\\"token punctuation\\">(</span>c<span class=\\"token punctuation\\">)</span>\\n      <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">return</span> acc\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">sort</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token function\\">sym</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">[</span><span class=\\"token number\\">5</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">4</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// [3,4,5]</span>\\n\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};