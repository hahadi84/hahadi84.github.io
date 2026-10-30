(() => {
  const $ = s => document.querySelector(s);
  const list = $('#projects');
  let category = 'all';
  const arrow = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>';
  function render() {
    const query = $('#search').value.trim().toLocaleLowerCase('ko');
    const matches = window.PROJECTS.filter(p => (category === 'all' || p.category === category) && `${p.name} ${p.label} ${p.description}`.toLocaleLowerCase('ko').includes(query));
    list.replaceChildren();
    matches.forEach(p => {
      const card = document.createElement('article');
      card.className = 'project';
      const visual = document.createElement('div'); visual.className = `project-visual ${p.tone}`;
      const image = document.createElement('img'); image.src = p.image; image.alt = ''; image.width = 400; image.height = 280; image.loading = 'lazy'; visual.append(image);
      const body = document.createElement('div'); body.className = 'project-body';
      const label = document.createElement('p'); label.className = 'project-label'; label.textContent = p.label;
      const title = document.createElement('h3'); title.textContent = p.name;
      const desc = document.createElement('p'); desc.className = 'project-description'; desc.textContent = p.description;
      const bottom = document.createElement('div'); bottom.className = 'project-bottom';
      const link = document.createElement('a'); link.className = 'text-link'; link.href = p.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.setAttribute('aria-label',`${p.name} ${p.action} (새 창)`); link.append(document.createTextNode(p.action+' ')); link.insertAdjacentHTML('beforeend',arrow);
      const kind = document.createElement('span'); kind.textContent = p.kind;
      bottom.append(link,kind); body.append(label,title,desc,bottom); card.append(visual,body); list.append(card);
    });
    $('#result-count').textContent = `${matches.length}개의 프로젝트`;
    $('#empty').hidden = matches.length > 0;
  }
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click',() => {
    category = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active',b === button); b.setAttribute('aria-pressed',String(b === button)); }); render();
  }));
  $('#search').addEventListener('input',render);
  $('#reset').addEventListener('click',()=>{ $('#search').value=''; document.querySelector('[data-filter="all"]').click(); $('#search').focus(); });
  let saved; try { saved = localStorage.getItem('hahadi-theme'); } catch {}
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  function setTheme(dark) { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; $('#theme').setAttribute('aria-label',dark ? '밝은 화면으로 전환' : '어두운 화면으로 전환'); $('#theme').setAttribute('aria-pressed',String(dark)); }
  setTheme(saved ? saved === 'dark' : system.matches);
  system.addEventListener('change',e=>{ if (!saved) setTheme(e.matches); });
  $('#theme').addEventListener('click',()=>{ const dark = document.documentElement.dataset.theme !== 'dark'; saved = dark ? 'dark' : 'light'; setTheme(dark); try {localStorage.setItem('hahadi-theme',saved);}catch{} });
  $('#year').textContent = new Date().getFullYear();
  $('#privacy-open').addEventListener('click',()=>$('#privacy').showModal());
  $('#privacy-close').addEventListener('click',()=>$('#privacy').close());
  $('#privacy').addEventListener('click',event=>{ if(event.target === $('#privacy')) { const r=event.target.getBoundingClientRect(); if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) event.target.close(); } });
  render();
})();
