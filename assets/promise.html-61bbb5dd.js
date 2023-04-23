import{_ as n,N as s,O as a,a4 as p}from"./framework-852916ad.js";const t={},e=p(`<h1 id="手写promise" tabindex="-1"><a class="header-anchor" href="#手写promise" aria-hidden="true">#</a> 手写promise</h1><h3 id="关于promise-我们需要清楚" tabindex="-1"><a class="header-anchor" href="#关于promise-我们需要清楚" aria-hidden="true">#</a> 关于Promise，我们需要清楚：</h3><ol><li><p>Promise是否决议，由开发者控制</p></li><li><p>开发者通过调用由 executor函数调用的 resolve/reject 来控制当前promise决议/拒绝的时机</p></li><li><p>promise 的 resolve/reject 函数的调用，是一个状态变更的过程，即 promise状态由 pending =&gt; fulfilled/rejected， 所以 resolve/reject 内部首先会翻转 promise 的状态，设置 promise 的值/拒绝原因， 然后会遍历 promise 决议成功/拒绝回调函数列表，循环调用列表中的 决议成功/拒绝回调函数</p></li><li><p>promise 的 决议成功/拒绝回调函数由 then/catch 传入，而 决议成功/拒绝回调函数 内部并不知道promise是何时决议/拒绝，只能反过来由promise决议时，去主动调用 决议/拒绝函数。</p></li></ol><p><strong>具体实现方式：</strong></p><ol><li>promise 内部先定义好 决议/拒绝回调函数列表</li><li>then 函数执行时，将接收的 决议/拒绝回调函数 push进 决议/拒绝回调函数列表</li><li>promise 决议/拒绝时循环遍历调用 决议/拒绝回调函数列表 内部的 决议/拒绝回调函数</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 关于Promise，我们需要清楚：
 * 1. Promise是否决议，由开发者控制
 * 2. 开发者通过调用由 executor函数调用的 resolve/reject 来控制当前promise决议/拒绝的时机
 * 3. promise 的 resolve/reject 函数的调用，是一个状态变更的过程
 *    即 promise状态由 pending =&gt; fulfilled/rejected
 *    所以 resolve/reject 内部首先会翻转 promise 的状态，设置 promise 的值/拒绝原因
 *    然后会遍历 promise 决议成功/拒绝回调函数列表，循环调用列表中的 决议成功/拒绝回调函数
 * 4. promise 的 决议成功/拒绝回调函数由 then/catch 传入，
 *    而 决议成功/拒绝回调函数 内部并不知道promise是何时决议/拒绝，只能反过来由promise决议时，
 *    去主动调用 决议/拒绝函数。
 *    具体实现方式：
 *      promise 内部先定义好 决议/拒绝回调函数列表 
 *      then 函数执行时，将接收的 决议/拒绝回调函数 push进 决议/拒绝回调函数列表
 *      promise 决议/拒绝时循环遍历调用 决议/拒绝回调函数列表 内部的 决议/拒绝回调函数
 */</span>
<span class="token keyword">const</span> <span class="token constant">PENDING</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token constant">FULFILLED</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">&#39;fulfilled&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token constant">REJECTED</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">&#39;rejected&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
    <span class="token comment">// 状态</span>
    status <span class="token operator">=</span> <span class="token constant">PENDING</span>
    <span class="token comment">// 值</span>
    value <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token comment">// 拒绝原因</span>
    reason <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token comment">// 决议成功回调函数列表</span>
    onSuccessCallbacks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token comment">// 拒绝回调函数列表</span>
    onFailCallbacks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token function">executor</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>resolve<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>reject<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * 决议成功函数
     * 
     * 通过 executor 提供给开发者在Promise决议成功后调用
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>any<span class="token punctuation">}</span></span> <span class="token parameter">data</span> 决议成功数据
     */</span>
    <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * 当且仅当promise为pending状态，即未决议状态调用
         * 因为只有promise决议成功时才会调用
         * 所以这里会翻转promise状态为成功，并设置promise的值
         * 最后遍历执行 成功回调函数列表(onSuccessCallbacks) 里面的函数
         */</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">PENDING</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token constant">FULFILLED</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> data
            <span class="token keyword">this</span><span class="token punctuation">.</span>onSuccessCallbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">fn</span> <span class="token operator">=&gt;</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * 决议拒绝函数
     * 
     * 通过 executor 提供给开发者在决议失败后调用
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>any<span class="token punctuation">}</span></span> <span class="token parameter">err</span> 错误信息
     */</span>
    <span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * 当且仅当promise为pending状态，即未决议状态调用
         * 因为只有promise决议失败时才会调用
         * 所以这里会翻转promise状态为失败，并设置promise的失败原因
         * 最后遍历执行 失败回调函数列表(onFailCallbacks) 里面的函数
         */</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">PENDING</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token constant">REJECTED</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>reason <span class="token operator">=</span> err
            <span class="token keyword">this</span><span class="token punctuation">.</span>onFailCallbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">fn</span> <span class="token operator">=&gt;</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>reason<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * then
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span> <span class="token parameter">onSuccess</span> 成功回调
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span> <span class="token parameter">onFail</span> 失败回调
     * <span class="token keyword">@returns</span> 一个新的promise
     */</span>
    <span class="token function-variable function">then</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">onSuccess<span class="token punctuation">,</span> onFail</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> <span class="token function-variable function">onSuccessCallback</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token function">queueMicrotask</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                    <span class="token keyword">const</span> resolveData <span class="token operator">=</span> <span class="token keyword">typeof</span> onSuccess <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span> <span class="token operator">?</span> <span class="token function">onSuccess</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token operator">:</span> data
                    <span class="token function">resolve</span><span class="token punctuation">(</span>resolveData<span class="token punctuation">)</span>

                <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">const</span> <span class="token function-variable function">onFailCallback</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token function">queueMicrotask</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 有错误回调 则resolve错误回调的结果</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> onFail <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token function">onFail</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                        <span class="token comment">// 无错误回调 则直接reject错误</span>
                        <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">PENDING</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>onSuccessCallbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>onSuccessCallback<span class="token punctuation">)</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>onFailCallbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>onFailCallback<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">FULFILLED</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">onSuccessCallback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">REJECTED</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">onFailCallback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>reason<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function-variable function">catch</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">errorCallback</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> <span class="token function-variable function">onFailCallback</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token function">queueMicrotask</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token function">errorCallback</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">PENDING</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>onFailCallbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>onFailCallback<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> data
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token function">resolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token function">reject</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">reject</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token function">all</span><span class="token punctuation">(</span><span class="token parameter">list</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">let</span> num <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">let</span> l <span class="token operator">=</span> list<span class="token punctuation">.</span>length

        <span class="token keyword">const</span> <span class="token function-variable function">resultSort</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">result</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>i <span class="token operator">-</span> b<span class="token punctuation">.</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            list<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>item <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    item<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">data</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                        result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span> i<span class="token punctuation">,</span> data <span class="token punctuation">}</span><span class="token punctuation">)</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">++</span>num <span class="token operator">===</span> l<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token function">resultSort</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">)</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                        <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
                    <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span> i<span class="token punctuation">,</span> <span class="token literal-property property">data</span><span class="token operator">:</span> item <span class="token punctuation">}</span><span class="token punctuation">)</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">++</span>num <span class="token operator">===</span> l<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token function">resultSort</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>

        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> Promise

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","promise.html.vue"]]);export{r as default};
