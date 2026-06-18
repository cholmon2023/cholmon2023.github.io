const fs = require('fs');
const path = require('path');

const root = __dirname;

function nav(depth) {
  const p = '../'.repeat(depth) + 'index.html';
  const assets = '../'.repeat(depth) + 'assets/logo.png';
  return `  <div class="nav">
    <a class="logo" href="${p}#top">
      <img src="${assets}" alt="logo">
      HUNNU STONE
    </a>
    <div class="nav-links">
      <a href="${p}#top">Нүүр</a>
      <a href="${p}#about">Бидний тухай</a>
      <a href="${p}#product">Бүтээгдэхүүн</a>
      <a href="${p}#scene">Хэрэглээ</a>
      <a href="${p}#contact">Холбоо</a>
    </div>
  </div>`;
}

function footerMini() {
  return `  <footer class="footer footer--mini">
    <p class="copyright">&copy; 2026 Hunnu Stone. All rights reserved.</p>
  </footer>`;
}

function heroSub(img, title, sub, depth) {
  const imgPath = '../'.repeat(depth) + 'images/' + img;
  return `  <div class="hero hero--sub" style="background-image:url('${imgPath}')">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1>${title}</h1>
      <p>${sub}</p>
    </div>
  </div>`;
}

function adSlot() {
  return `  <div class="ad-slot">
    <div class="ad-slot__inner">Зар сонгоно уу — Banner 1100 × 120</div>
  </div>`;
}

function gallery(images, depth) {
  const prefix = '../'.repeat(depth) + 'images/';
  const first = prefix + images[0];
  const thumbs = images.map((img, i) => {
    const cls = i === 0 ? 'gallery-thumb is-active' : 'gallery-thumb';
    return `        <button type="button" class="${cls}" aria-label="Зураг"><img src="${prefix}${img}" alt=""></button>`;
  }).join('\n');
  return `    <div class="gallery" data-carousel>
      <div class="gallery-main">
        <img src="${first}" alt="">
      </div>
      <div class="gallery-thumbs">
${thumbs}
      </div>
    </div>`;
}

function writeFile(rel, content) {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

const productCategories = [
  {
    slug: 'electric',
    title: 'Цахилгаан гурван дугуйт',
    sub: 'Хот болон хөдөөд зориулсан цахилгаан тээврийн хэрэгслүүд',
    image: 'electric.jpg',
    models: [
      { id: 'hs-e100', name: 'HS-E100', spec: '800W • 72V • 60km', price: '2,500 USD', motor: '800W', battery: '72V 20Ah', range: '60 km', use: 'Хүргэлт, хотын тээвэр' },
      { id: 'hs-e200', name: 'HS-E200', spec: '1000W • 72V • 80km', price: '3,200 USD', motor: '1000W', battery: '72V 32Ah', range: '80 km', use: 'Барилга, ачаа тээвэр' },
      { id: 'hs-e300', name: 'HS-E300', spec: '1200W • 96V • 90km', price: '4,500 USD', motor: '1200W', battery: '96V 32Ah', range: '90 km', use: 'Хөдөө орон нутгийн тээвэр' },
      { id: 'hs-e500', name: 'HS-E500', spec: '1500W • 96V • 100km', price: '6,000 USD', motor: '1500W', battery: '96V 45Ah', range: '100 km', use: 'Хүнд ачаа, урт зай' },
      { id: 'hs-e800', name: 'HS-E800', spec: '2000W • 96V • 120km', price: '8,000 USD', motor: '2000W', battery: '96V 58Ah', range: '120 km', use: 'Үйлдвэр, логистик' },
    ],
  },
  {
    slug: 'gas',
    title: 'Шатахуунт гурван дугуйт',
    sub: 'Хүчтэй, урт зайны шатахуунт тээврийн хэрэгслүүд',
    image: 'gas.jpg',
    models: [
      { id: 'hs-g100', name: 'HS-G100', spec: '150cc • 4 stroke', price: '3,000 USD', motor: '150cc', battery: 'N/A', range: '120 km', use: 'Хүргэлт, хотын тээвэр' },
      { id: 'hs-g200', name: 'HS-G200', spec: '200cc • 4 stroke', price: '4,500 USD', motor: '200cc', battery: 'N/A', range: '150 km', use: 'Барилга, ачаа тээвэр' },
      { id: 'hs-g300', name: 'HS-G300', spec: '250cc • 4 stroke', price: '6,000 USD', motor: '250cc', battery: 'N/A', range: '180 km', use: 'Хөдөө орон нутгийн тээвэр' },
      { id: 'hs-g500', name: 'HS-G500', spec: '300cc • 4 stroke', price: '8,000 USD', motor: '300cc', battery: 'N/A', range: '200 km', use: 'Хүнд ачаа, урт зай' },
      { id: 'hs-g800', name: 'HS-G800', spec: '350cc • 4 stroke', price: '10,000 USD', motor: '350cc', battery: 'N/A', range: '220 km', use: 'Үйлдвэр, логистик' },
    ],
  },
  {
    slug: 'agri',
    title: 'Аж ахуйн техник',
    sub: 'Хөдөө аж ахуй, жижиг бизнесийн зориулалттай тоног төхөөрөмж',
    image: 'agri.jpg',
    models: [
      { id: 'hs-a100', name: 'HS-A100', spec: 'Мини трактор • 12HP', price: '2,500 USD', motor: '12HP', battery: 'N/A', range: 'N/A', use: 'Жижиг талбай, хашаа' },
      { id: 'hs-a200', name: 'HS-A200', spec: 'Трактор • 18HP', price: '5,000 USD', motor: '18HP', battery: 'N/A', range: 'N/A', use: 'Тариалан, мал аж ахуй' },
      { id: 'hs-a300', name: 'HS-A300', spec: 'Трактор • 24HP', price: '8,000 USD', motor: '24HP', battery: 'N/A', range: 'N/A', use: 'Хөдөө аж ахуйн үйлдвэрлэл' },
      { id: 'hs-a500', name: 'HS-A500', spec: 'Трактор • 32HP', price: '12,000 USD', motor: '32HP', battery: 'N/A', range: 'N/A', use: 'Том талбай, комбайн' },
      { id: 'hs-a800', name: 'HS-A800', spec: 'Трактор • 45HP', price: '20,000 USD', motor: '45HP', battery: 'N/A', range: 'N/A', use: 'Үйлдвэрлэл, олон зориулалт' },
    ],
  },
];

productCategories.forEach((cat) => {
  const cards = cat.models.map((m) => `      <a class="card-link" href="${cat.slug}/${m.id}.html">
        <div class="card">
          <img src="../images/${cat.image}" alt="${m.name}">
          <h3>${m.name}</h3>
          <p>${m.spec}</p>
          <p>Үнэ: ${m.price}</p>
        </div>
      </a>`).join('\n');

  writeFile(`products/${cat.slug}.html`, `<!DOCTYPE html>
<html lang="mn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cat.title} | Hunnu Stone</title>
  <link rel="icon" type="image/png" href="../assets/logo.png">
  <link rel="stylesheet" href="../css/site.css">
</head>
<body>
${nav(1)}
${heroSub(cat.image, cat.title, cat.sub, 1)}
${adSlot()}
  <div class="section section--after-ad">
    <nav class="breadcrumb">
      <a href="../index.html">Нүүр</a> / <a href="../index.html#product">Бүтээгдэхүүн</a> / <span>${cat.title}</span>
    </nav>
    <div class="title">${cat.title}</div>
    <div class="sub">${cat.sub}</div>
    <div class="grid grid--3">
${cards}
    </div>
  </div>
${footerMini()}
</body>
</html>`);

  cat.models.forEach((m) => {
    const imgs = [cat.image, cat.image, 'hero.jpg'];
    writeFile(`products/${cat.slug}/${m.id}.html`, `<!DOCTYPE html>
<html lang="mn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${m.name} | ${cat.title} | Hunnu Stone</title>
  <link rel="icon" type="image/png" href="../../assets/logo.png">
  <link rel="stylesheet" href="../../css/site.css">
</head>
<body>
${nav(2)}
  <div class="hero hero--detail" style="background-image:url('../../images/${cat.image}')">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1>${m.name}</h1>
      <p>${cat.title}</p>
    </div>
  </div>
  <div class="section">
    <nav class="breadcrumb">
      <a href="../../index.html">Нүүр</a> /
      <a href="../../index.html#product">Бүтээгдэхүүн</a> /
      <a href="../${cat.slug}.html">${cat.title}</a> /
      <span>${m.name}</span>
    </nav>
    <div class="detail-layout">
${gallery(imgs, 2)}
      <div class="detail-info">
        <h2>${m.name}</h2>
        <p class="price">Үнэ: ${m.price}</p>
        <p>${m.spec} — ${m.use}</p>
        <h3>Үзүүлэлт</h3>
        <ul>
          <li>Хөдөлгүүр: ${m.motor}</li>
          <li>Зай/Хүч: ${m.battery}</li>
          <li>Зайны хүрээ: ${m.range}</li>
          <li>Ашиглалтын хугацаа: 5–15 жил</li>
        </ul>
        <h3>Хэрэглээ</h3>
        <p>${m.use}</p>
        <div class="detail-actions">
          <a class="btn btn--primary" href="../../index.html#contact">Захиалах</a>
          <a class="btn btn--ghost" href="../${cat.slug}.html">Буцах</a>
        </div>
      </div>
    </div>
  </div>
${footerMini()}
  <script src="../../js/carousel.js"></script>
</body>
</html>`);
  });
});

const scenes = [
  {
    slug: 'construction',
    title: 'Барилгын талбайн тээвэр',
    sub: 'Барилгын материал, төхөөрөмж тээвэрлэх шийдэл',
    image: 'hero.jpg',
    desc: 'Барилгын талбай дээр материал, төхөөрөмж, хэрэгслийг хурдан, найдвартай зөөх шийдэл. Хүнд ачаа, өндөр давтамжтай тээвэрт тохирсон.',
    points: [
      'Талбайн дотор материал, цемент, элс зөөх',
      'Хүнд ачаа, төхөөрөмж тээвэрлэх',
      'Олон тээврийн хэрэгслийн автопарк',
      'Хол зайд байрлах обьектод ашиглах',
    ],
  },
  {
    slug: 'livestock',
    title: 'Мал аж ахуй, хөдөө орон нутаг',
    sub: 'Малчид, хөдөө орон нутгийн тээврийн шийдэл',
    image: 'agri.jpg',
    desc: 'Өргөн нутаг, хол зай, хүнд нөхцөлд мал аж ахуйн ажил, ачаа тээвэр, өдөр тутмын хэрэгцээг хангах шийдэл.',
    points: [
      'Бэлчээрийн хяналт, малын ажил',
      'Корм, багаж, хэрэгслийн тээвэр',
      'Холын сум, аймагт найдвартай ажиллагаа',
      'Өвлийн хүйтэн нөхцөлд ашиглах',
    ],
  },
  {
    slug: 'delivery',
    title: 'Жижиг бизнес, хүргэлт үйлчилгээ',
    sub: 'Хүргэлт, логистик, жижиг бизнесийн тээвэр',
    image: 'electric.jpg',
    desc: 'Жижиг бизнес, дэлгүүр, кафе, хүргэлтийн үйлчилгээнд зориулсан хурдан, бага зардалтай тээврийн шийдэл.',
    points: [
      'Хот дотор хурдан хүргэлт',
      'Сүүлчийн км хүргэлт',
      'Жижиг бизнесийн өдөр тутмын тээвэр',
      'Логистик төв, агуулахын хүргэлт',
    ],
  },
  {
    slug: 'farm',
    title: 'Хөдөө аж ахуйн үйлдвэрлэл',
    sub: 'Тариалан, газар тариалан, үйлдвэрлэлийн техник',
    image: 'agri.jpg',
    desc: 'Тариалан, хураалт, усжуулалт, фермийн үйлдвэрлэлд зориулсан олон зориулалтын техникийн шийдэл.',
    points: [
      'Тариалан, суулгалтын үеийн ажил',
      'Ургац хураах, тээвэрлэх',
      'Ус, бордоо тээвэрлэлт',
      'Фермийн олон зориулалтын автопарк',
    ],
  },
];

scenes.forEach((scene) => {
  const imgs = [scene.image, scene.image, 'hero.jpg'];
  const pointsHtml = scene.points.map((p) => `          <li>${p}</li>`).join('\n');

  writeFile(`scenes/${scene.slug}.html`, `<!DOCTYPE html>
<html lang="mn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${scene.title} | Hunnu Stone</title>
  <link rel="icon" type="image/png" href="../assets/logo.png">
  <link rel="stylesheet" href="../css/site.css">
</head>
<body>
${nav(1)}
  <div class="hero hero--detail" style="background-image:url('../images/${scene.image}')">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1>${scene.title}</h1>
      <p>${scene.sub}</p>
    </div>
  </div>
  <div class="section">
    <nav class="breadcrumb">
      <a href="../index.html">Нүүр</a> /
      <a href="../index.html#scene">Хэрэглээ</a> /
      <span>${scene.title}</span>
    </nav>
    <div class="detail-layout">
${gallery(imgs, 1)}
      <div class="detail-info">
        <h2>${scene.title}</h2>
        <p>${scene.desc}</p>
        <h3>Хэрэглээний чиглэл</h3>
        <ul>
${pointsHtml}
        </ul>
        <h3>Тохирох бүтээгдэхүүн</h3>
        <p>Цахилгаан, шатахуунт тээвэр болон аж ахуйн техник — таны хэрэгцээнд тохируулан сонгоно.</p>
        <div class="detail-actions">
          <a class="btn btn--primary" href="../index.html#product">Бүтээгдэхүүн үзэх</a>
          <a class="btn btn--ghost" href="../index.html#scene">Буцах</a>
        </div>
      </div>
    </div>
  </div>
${footerMini()}
  <script src="../js/carousel.js"></script>
</body>
</html>`);
});

console.log('Generated all pages.');
