(function () {
  var LINKS = [
    { hash: '#top', label: 'Нүүр' },
    { hash: '#about', label: 'Бидний тухай' },
    { hash: '#product', label: 'Бүтээгдэхүүн' },
    { hash: '#scene', label: 'Хэрэглээ' },
    { hash: '#service', label: 'үйлчилгээ' },
    { hash: '#contact', label: 'Холбоо' },
  ];

  var script = document.currentScript;
  var src = script ? script.getAttribute('src') || 'js/nav.js' : 'js/nav.js';
  var depth = (src.match(/\.\.\//g) || []).length;
  var root = depth ? '../'.repeat(depth) : '';

  var page = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0];
  var isIndex = !page || page === 'index.html';

  function pageHref(hash) {
    if (isIndex) return hash;
    var base = depth === 0 ? 'index.html' : root + 'index.html';
    return base + hash;
  }

  var logoHref = isIndex ? '#top' : pageHref('#top');
  var logoSrc = root + 'assets/logo.png';

  var linksHtml = LINKS.map(function (item) {
    return '<a href="' + pageHref(item.hash) + '">' + item.label + '</a>';
  }).join('\n      ');

  var html =
    '<div class="nav">\n' +
    '    <a class="logo" href="' + logoHref + '">\n' +
    '      <img src="' + logoSrc + '" alt="logo">\n' +
    '      HUNNU STONE\n' +
    '    </a>\n' +
    '    <div class="nav-links">\n' +
    '      ' + linksHtml + '\n' +
    '    </div>\n' +
    '  </div>';

  var mount = document.getElementById('site-nav');
  if (mount) {
    mount.outerHTML = html;
  } else if (script) {
    script.insertAdjacentHTML('beforebegin', html);
  }
})();
