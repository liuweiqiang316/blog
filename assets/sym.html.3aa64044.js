import{b as n}from"./app.ff0c9daa.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},p=n(`<h1 id="sym" tabindex="-1"><a class="header-anchor" href="#sym" aria-hidden="true">#</a> sym</h1><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">/*
	\u6C42n\u4E2A\u6570\u7EC4\u7684\u5BF9\u79F0\u5DEE\u96C6,\u5E76\u5BF9\u5BF9\u79F0\u5DEE\u96C6\u4ECE\u5C0F\u5230\u5927\u6392\u5E8F
	\u5165\u53C2: \u9700\u8981\u6C42\u5BF9\u79F0\u5DEE\u96C6\u7684\u6570\u7EC4\u5217\u8868
	\u8FD4\u56DE: \u4F9D\u6B21\u6C42\u524D\u4E00\u4E2A\u6570\u7EC4\u4E0E\u540E\u4E00\u6570\u7EC4\u7684\u5BF9\u79F0\u5DEE\u96C6,\u518D\u7528\u5BF9\u79F0\u5DEE\u96C6\u4E0E\u518D\u540E\u4E00\u6570\u7EC4\u6C42\u5BF9\u79F0\u5DEE\u96C6,\u76F4\u81F3\u6700\u540E
*/</span>
<span class="token keyword">function</span> <span class="token function">sym</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">acc<span class="token punctuation">,</span> curr</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token operator">...</span><span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span>curr<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">c</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>acc<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        acc <span class="token operator">=</span> acc<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">a</span> <span class="token operator">=&gt;</span> a <span class="token operator">!==</span> c<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        acc<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> acc
  <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">sym</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [3,4,5]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div>`,2);function t(c,e){return p}var l=s(a,[["render",t]]);export{l as default};
