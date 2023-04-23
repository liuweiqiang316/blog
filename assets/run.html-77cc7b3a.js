import{_ as t,N as p,O as e,U as n,a2 as s,a3 as o,a4 as c,E as l}from"./framework-852916ad.js";const u={},i=c(`<h1 id="生成器自动执行函数" tabindex="-1"><a class="header-anchor" href="#生成器自动执行函数" aria-hidden="true">#</a> 生成器自动执行函数</h1><p>调用生成器函数会生成一个迭代器（<code>iterator</code>）。</p><p>对迭代器进行遍历就是一个生成器的执行函数（<code>run0</code>），这个函数是同步执行的只能用来处理<code>gen</code>这种简单的生成器函数。<code>run0</code>这里用到<code>while</code>循环遍历，其实用<code>for</code>循环应该也是一样的。</p><p><code>run1、run2</code>用的都是内部函数递归调用。不同点在于，<code>run1</code>用的是回调函数的形式，<code>run2</code>用的是<code>Promise</code>的形式，所以其实<code>run1</code>递归调用<code>step</code>时同步代码不会等异步函数执行，<code>run2</code>递归调用的<code>step</code>是包裹在Promise.then函数的内部执行函数中，所以<code>run2</code>一定是等到<code>gen1</code>内部的异步代码执行完成后才会执行下一次<code>step</code>也就是说一定会等到<code>gen1</code>函数内部<code>yield</code>的结果后才开始执行下面的代码。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 同步生成器执行函数
 * <span class="token keyword">@param</span> <span class="token parameter">gen</span> 生成器
 */</span>
<span class="token keyword">function</span> <span class="token function">run0</span><span class="token punctuation">(</span><span class="token parameter">gen</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> it <span class="token operator">=</span> <span class="token function">gen</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">let</span> result <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token operator">!</span>result<span class="token punctuation">.</span>done<span class="token punctuation">)</span><span class="token punctuation">{</span>
        result <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token doc-comment comment">/**
 * 回调形式生成器执行函数(支持异步)
 * <span class="token keyword">@param</span> <span class="token parameter">gen</span> 生成器
 */</span>
<span class="token keyword">function</span> <span class="token function">run1</span><span class="token punctuation">(</span><span class="token parameter">gen</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> it <span class="token operator">=</span> <span class="token function">gen</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">let</span> result <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">function</span> <span class="token function">step</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>result<span class="token punctuation">.</span>done<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> result<span class="token punctuation">.</span>value <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// error-first风格</span>
                result<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        result <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">throw</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                    result <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
                    <span class="token function">step</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                result <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
                <span class="token function">step</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">step</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token doc-comment comment">/**
 * Promise形式生成器执行函数(支持异步)
 * <span class="token keyword">@param</span> <span class="token parameter">gen</span> 生成器
 */</span>
<span class="token keyword">function</span> <span class="token function">run2</span><span class="token punctuation">(</span><span class="token parameter">gen</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> it <span class="token operator">=</span> <span class="token function">gen</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">let</span> result <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">function</span> <span class="token function">step</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>result<span class="token punctuation">.</span>done<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                result <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
                <span class="token function">step</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                result <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">throw</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">step</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">gen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">yield</span> <span class="token number">1</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">yield</span> <span class="token number">1</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token keyword">yield</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">sleep</span> <span class="token operator">=</span> <span class="token parameter">t</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> t<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">gen1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">yield</span> <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1.1</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">yield</span> <span class="token number">2</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token keyword">yield</span> <span class="token number">3</span>
<span class="token punctuation">}</span>

<span class="token comment">// 三个run函数分别放开执行</span>
<span class="token comment">// run0(gen) // 结果: 1, 2, 3</span>
<span class="token comment">// run1(gen1) // 结果: 1, 2, 3, 1.1</span>
<span class="token function">run2</span><span class="token punctuation">(</span>gen1<span class="token punctuation">)</span> <span class="token comment">// 结果: 1, 1.1, 2, 3</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),k={href:"https://book.douban.com/subject/27072230/",target:"_blank",rel:"noopener noreferrer"};function r(d,v){const a=l("ExternalLinkIcon");return p(),e("div",null,[i,n("p",null,[s("参考："),n("a",k,[s("深入理解ES6"),o(a)])])])}const b=t(u,[["render",r],["__file","run.html.vue"]]);export{b as default};
