document.querySelectorAll('[data-carousel]').forEach(function (root) {
  var mainImg = root.querySelector('.gallery-main img');
  var thumbs = root.querySelectorAll('.gallery-thumb');
  if (!mainImg || !thumbs.length) return;

  thumbs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var thumbImg = btn.querySelector('img');
      if (!thumbImg) return;
      mainImg.src = thumbImg.src;
      mainImg.alt = thumbImg.alt || '';
      thumbs.forEach(function (t) { t.classList.remove('is-active'); });
      btn.classList.add('is-active');
    });
  });
});
