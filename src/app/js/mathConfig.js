(function() {
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [['$', '$'], ["\\(", "\\)"]],
      displayMath: [['$$', '$$'], ["\\[", "\\]"]]
    },
    TeX: {
      Macros: {
        C: '{\\mathbb C}',
        R: '{\\mathbb R}',
        Q: '{\\mathbb Q}',
        Z: '{\\mathbb Z}',
        diag: '\\mathop{\\mathrm{diag}}\\nolimits',
        np: ['{#1}#2{#1}', 2],
        mf: ['{\\mathfrak{#1}}', 1],
        bm: ['{\\mathbf{#1}}', 1],
        bb: ['{\\mathbb{#1}}', 1],
        mca: ['{\\mathcal{#1}}', 1],
        msc: ['{\\mathscr{#1}}', 1],
        mm: ['{\\mathop{\\mathrm{#1}}\\nolimits}', 1]
      }
    }
  });

}).call(this);
