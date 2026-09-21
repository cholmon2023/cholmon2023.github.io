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
    '    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-links">Цэс <span aria-hidden="true">☰</span></button>\n' +
    '    <div class="nav-links" id="site-links">\n' +
    '      ' + linksHtml + '\n' +
    '    </div>\n' +
    '  </div>';

  var mount = document.getElementById('site-nav');
  if (mount) {
    mount.outerHTML = html;
  } else if (script) {
    script.insertAdjacentHTML('beforebegin', html);
  }

  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  var quickActions = document.createElement('div');
  quickActions.className = 'quick-actions';
  quickActions.setAttribute('aria-label', 'Холбоо барих хурдан холбоос');
  quickActions.innerHTML =
    '<a class="quick-action quick-action--call" href="tel:94577757" aria-label="94577757 дугаар руу залгах">☎ <span>Залгах</span></a>' +
    '<a class="quick-action quick-action--message" href="https://m.me/HunnuStone" target="_blank" rel="noopener noreferrer" aria-label="Messenger-ээр бичих">✉ <span>Messenger</span></a>';
  document.body.appendChild(quickActions);

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.detail-info ul li').forEach(function (item) {
      var parts = item.textContent.split(/[：:]/);
      if (parts.length < 2) return;
      item.innerHTML = '<span class="spec-label">' + parts.shift().trim() + '</span><span class="spec-value">' + parts.join(':').trim() + '</span>';
    });

    document.querySelectorAll('.card-link .card').forEach(function (card) {
      var paragraphs = card.querySelectorAll('p');
      if (paragraphs.length) paragraphs[0].classList.add('card-spec');
    });

    var detailLayout = document.querySelector('.detail-layout');
    var path = window.location.pathname;
    var category = path.indexOf('/electric/') > -1 ? 'electric' : path.indexOf('/gas/') > -1 ? 'gas' : path.indexOf('/agri/') > -1 ? 'agri' : '';
    var related = {
      electric: [
        { file: 'dj650.html', title: 'DJ600', spec: '600W • 60V/20AH • 200кг', image: 'IMG_20260726_180506.jpg' },
        { file: 'dj1000.html', title: 'DJ800', spec: '1200W • 60V/45AH • 500кг', image: 'IMG_20260804_195847.jpg' },
        { file: 'dj1200.html', title: 'DJ1200', spec: '1200W • 72V/45AH • 600кг', image: '微信图片_20260527085102.jpg' },
        { file: 'dj1500-plus.html', title: 'DJ1500 Plus', spec: '1500W • 72V/52AH • 800кг', image: '160-g.jpg' }
      ],
      gas: [
        { file: 'hs-g100.html', title: 'Zongshen-200 Саарал', spec: '200cc • 4 stroke • Гидртэй', image: 'gas11.jpg' },
        { file: 'hs-g200.html', title: 'Zongshen-200 Цэнхэр', spec: '200cc • 4 stroke • Гидртэй', image: 'gas22.jpg' }
      ],
      agri: [
        { file: 'saaltuur.html', title: 'HS-A200', spec: 'Аж ахуйн техник', image: 'agri.jpg' },
        { file: 'hs-a300.html', title: 'HS-A300', spec: 'Аж ахуйн техник', image: 'agri.jpg' },
        { file: 'hs-a500.html', title: 'HS-A500', spec: 'Аж ахуйн техник', image: 'agri.jpg' },
        { file: 'hs-a800.html', title: 'HS-A800', spec: 'Аж ахуйн техник', image: 'agri.jpg' }
      ]
    };
    if (detailLayout && category && related[category]) {
      var current = path.split('/').pop();
      var models = related[category].filter(function (model) { return model.file !== current; }).slice(0, 3);
      if (models.length) {
        var section = document.createElement('section');
        section.className = 'related-products';
        section.innerHTML = '<h2>Төстэй загварууд</h2><div class="grid grid--3">' + models.map(function (model) {
          return '<a class="card-link" href="' + model.file + '"><div class="card"><img src="../../images/' + model.image + '" alt="' + model.title + '"><h3>' + model.title + '</h3><p class="card-spec">' + model.spec + '</p></div></a>';
        }).join('') + '</div>';
        detailLayout.insertAdjacentElement('afterend', section);
      }
    }
  });
})();
