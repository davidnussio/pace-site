// Language: ?lang=, then the last choice, then the browser; Italian or English.
(function () {
  var root = document.documentElement
  function pick() {
    var q = new URLSearchParams(location.search).get('lang')
    if (q === 'it' || q === 'en') return q
    try {
      var saved = localStorage.getItem('pace-lang')
      if (saved === 'it' || saved === 'en') return saved
    } catch (e) {}
    return /^it\b/i.test(navigator.language || '') ? 'it' : 'en'
  }
  function apply(lang) {
    root.dataset.lang = lang
    root.lang = lang
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.setLang === lang))
    })
  }
  apply(pick())
  document.addEventListener('DOMContentLoaded', function () {
    apply(root.dataset.lang)
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.addEventListener('click', function () {
        try { localStorage.setItem('pace-lang', b.dataset.setLang) } catch (e) {}
        apply(b.dataset.setLang)
      })
    })
  })
})()
