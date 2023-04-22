const e=JSON.parse('{"key":"v-ab6367da","path":"/posts/promise.html","title":"手写promise","lang":"zh-CN","frontmatter":{"description":"手写promise 关于Promise，我们需要清楚： Promise是否决议，由开发者控制 开发者通过调用由 executor函数调用的 resolve/reject 来控制当前promise决议/拒绝的时机 promise 的 resolve/reject 函数的调用，是一个状态变更的过程，即 promise状态由 pending =&gt; fulfilled/rejected， 所以 resolve/reject 内部首先会翻转 promise 的状态，设置 promise 的值/拒绝原因， 然后会遍历 promise 决议成功/拒绝回调函数列表，循环调用列表中的 决议成功/拒绝回调函数 promise 的 决议成功/拒绝回调函数由 then/catch 传入，而 决议成功/拒绝回调函数 内部并不知道promise是何时决议/拒绝，只能反过来由promise决议时，去主动调用 决议/拒绝函数。","head":[["meta",{"property":"og:url","content":"http://liuweiqiang316.cn/blog/posts/promise.html"}],["meta",{"property":"og:title","content":"手写promise"}],["meta",{"property":"og:description","content":"手写promise 关于Promise，我们需要清楚： Promise是否决议，由开发者控制 开发者通过调用由 executor函数调用的 resolve/reject 来控制当前promise决议/拒绝的时机 promise 的 resolve/reject 函数的调用，是一个状态变更的过程，即 promise状态由 pending =&gt; fulfilled/rejected， 所以 resolve/reject 内部首先会翻转 promise 的状态，设置 promise 的值/拒绝原因， 然后会遍历 promise 决议成功/拒绝回调函数列表，循环调用列表中的 决议成功/拒绝回调函数 promise 的 决议成功/拒绝回调函数由 then/catch 传入，而 决议成功/拒绝回调函数 内部并不知道promise是何时决议/拒绝，只能反过来由promise决议时，去主动调用 决议/拒绝函数。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-22T16:47:24.000Z"}],["meta",{"property":"article:author","content":"微斯人"}],["meta",{"property":"article:modified_time","content":"2023-04-22T16:47:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"手写promise\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-22T16:47:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"微斯人\\",\\"url\\":\\"http://liuweiqiang316.cn/\\"}]}"]]},"headers":[{"level":3,"title":"关于Promise，我们需要清楚：","slug":"关于promise-我们需要清楚","link":"#关于promise-我们需要清楚","children":[]}],"git":{"createdTime":1682182044000,"updatedTime":1682182044000,"contributors":[{"name":"liuweiqiang","email":"liuweiqiang316@163.com","commits":1}]},"readingTime":{"minutes":3.73,"words":1118},"filePathRelative":"posts/promise.md","localizedDate":"2023年4月22日","excerpt":"<h1> 手写promise</h1>\\n<h3> 关于Promise，我们需要清楚：</h3>\\n<ol>\\n<li>\\n<p>Promise是否决议，由开发者控制</p>\\n</li>\\n<li>\\n<p>开发者通过调用由 executor函数调用的 resolve/reject 来控制当前promise决议/拒绝的时机</p>\\n</li>\\n<li>\\n<p>promise 的 resolve/reject 函数的调用，是一个状态变更的过程，即 promise状态由 pending =&gt; fulfilled/rejected，  所以 resolve/reject 内部首先会翻转 promise 的状态，设置 promise 的值/拒绝原因， 然后会遍历 promise 决议成功/拒绝回调函数列表，循环调用列表中的 决议成功/拒绝回调函数</p>\\n</li>\\n<li>\\n<p>promise 的 决议成功/拒绝回调函数由 then/catch 传入，而 决议成功/拒绝回调函数 内部并不知道promise是何时决议/拒绝，只能反过来由promise决议时，去主动调用 决议/拒绝函数。</p>\\n</li>\\n</ol>","autoDesc":true}');export{e as data};
