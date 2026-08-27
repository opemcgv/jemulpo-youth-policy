const SITE_CONFIG = {
  brand: {
    prefix: '유유기지 제물포구',
    name: '청년정책상담',
    home: 'index.html'
  },
  nav: [
    { href: 'index.html', label: '홈' },
    { href: 'test.html', label: '나에게 맞는 정책찾기' },
    { href: 'policy.html', label: '분야별 청년정책' },
    { href: 'local.html', label: '우리동네 정책뉴스' },
    { href: 'growth.html', label: '성장 쑥쑥 필요정보' }
  ],
  footer: {
    title: '제물포구 청년정책.zip',
    text: '유유기지 제물포구 청년정책상담을 위한 정보 페이지 · 정책 신청 전 반드시 공식 공고를 확인해주세요.'
  }
};

function getCurrentPage() {
  const file = window.location.pathname.split('/').pop();
  return file || 'index.html';
}

function renderSiteHeader() {
  const target = document.querySelector('#site-header');
  if (!target) return;
  const current = getCurrentPage();
  const links = SITE_CONFIG.nav.map(item => {
    const active = current === item.href ? ' class="active"' : '';
    return `<a${active} href="${item.href}">${item.label}</a>`;
  }).join('');

  target.innerHTML = `
    <header class="site-header">
      <div class="container nav">
        <a class="brand" href="${SITE_CONFIG.brand.home}"><span>${SITE_CONFIG.brand.prefix}</span> ${SITE_CONFIG.brand.name}</a>
        <button class="menu-btn" aria-label="메뉴" aria-expanded="false">☰</button>
        <nav class="nav-links" aria-label="주요 메뉴">${links}</nav>
      </div>
    </header>`;
}

function renderSiteFooter() {
  const target = document.querySelector('#site-footer');
  if (!target) return;
  target.innerHTML = `
    <footer class="footer">
      <div class="container"><strong>${SITE_CONFIG.footer.title}</strong><br>${SITE_CONFIG.footer.text}</div>
    </footer>`;
}

renderSiteHeader();
renderSiteFooter();
window.SITE_CONFIG = SITE_CONFIG;
