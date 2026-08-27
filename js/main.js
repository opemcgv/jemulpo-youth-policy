document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav-links');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const search = document.querySelector('#policy-search');
  const category = document.querySelector('#category-filter');
  const region = document.querySelector('#region-filter');
  const cards = [...document.querySelectorAll('[data-policy-card]')];
  const empty = document.querySelector('#empty-state');

  const filter = () => {
    if (!cards.length) return;
    const q = (search?.value || '').trim().toLowerCase();
    const c = category?.value || '전체';
    const r = region?.value || '전체';
    let visible = 0;
    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      const ok = (!q || text.includes(q)) && (c === '전체' || card.dataset.category === c) && (r === '전체' || card.dataset.region === r);
      card.style.display = ok ? '' : 'none';
      if (ok) visible++;
    });
    if (empty) empty.style.display = visible ? 'none' : 'block';
  };
  search?.addEventListener('input', filter);
  category?.addEventListener('change', filter);
  region?.addEventListener('change', filter);

  const testForm = document.querySelector('#policy-test');
  testForm?.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(testForm);
    const interest = data.get('interest');
    const regionChoice = data.get('region');
    const status = data.get('status');
    const result = document.querySelector('#test-result');
    const list = document.querySelector('#test-result-list');
    const recommendations = [
      { title:'청년 취업역량 지원', cat:'취업', region:'전국', for:['취업준비','대학생'], desc:'직무교육·상담·취업 준비에 활용할 수 있는 예시 정책입니다.' },
      { title:'청년 창업 성장지원', cat:'창업', region:'인천', for:['창업준비','사업운영'], desc:'창업 교육·사업화·전문가 지원을 묶은 예시 정책입니다.' },
      { title:'청년 주거비 지원', cat:'주거', region:'인천', for:['취업준비','재직','대학생'], desc:'주거 부담을 덜어주는 지원사업을 찾을 때 확인할 예시입니다.' },
      { title:'청년 생활·마음돌봄 지원', cat:'생활', region:'제물포구', for:['취업준비','재직','대학생','창업준비','사업운영'], desc:'생활 안정과 관계·마음돌봄 프로그램을 찾는 청년을 위한 예시입니다.' }
    ];
    let picked = recommendations.filter(x => (!interest || x.cat === interest) && (!status || x.for.includes(status)) && (regionChoice !== '제물포구' || ['제물포구','인천','전국'].includes(x.region)));
    if (!picked.length) picked = recommendations.filter(x => !interest || x.cat === interest);
    if (!picked.length) picked = recommendations.slice(0,2);
    list.innerHTML = picked.slice(0,3).map(x => `<div class="result-item"><strong>${x.title}</strong><div class="badges" style="margin:7px 0"><span class="badge">${x.cat}</span><span class="badge">${x.region}</span></div><small>${x.desc}</small></div>`).join('');
    result.classList.add('show');
    result.scrollIntoView({behavior:'smooth', block:'center'});
  });
});
