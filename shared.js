const T = {
  en: { nav_cta:"" },
  zh: { nav_cta:"" }
};
let lang = localStorage.getItem('bn_lang') || 'en';

function setLang(l) {
  lang = l;
  localStorage.setItem('bn_lang', l);
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === l));
  document.querySelectorAll('[data-en],[data-zh]').forEach(el => {
    const txt = el.dataset[l];
    if (txt !== undefined) el.innerHTML = txt;
  });
  // tw-prefix spans (not data-en/zh, need explicit toggle)
  var pfxEn = document.getElementById('tw-prefix-en');
  var pfxZh = document.getElementById('tw-prefix-zh');
  if (pfxEn) pfxEn.style.display = l === 'en' ? 'inline' : 'none';
  if (pfxZh) pfxZh.style.display = l === 'zh' ? 'inline' : 'none';
  // nav logo swap
  var logoZh = document.querySelector('.logo-zh');
  var logoEn = document.querySelector('.logo-en');
  if (logoZh && logoEn) {
    logoZh.style.display = l === 'zh' ? '' : 'none';
    logoEn.style.display = l === 'en' ? '' : 'none';
  }
  // legacy logo swap
  const logoEl = document.querySelector('.nav-logo-img');
  if (logoEl) {
    const ROOT = (document.querySelector('meta[name=root]') || {content:''}).content;
    logoEl.src = l === 'zh'
      ? ROOT + 'assets/images/logo-cn.png'
      : ROOT + 'assets/images/logo-en.png';
    logoEl.alt = l === 'zh' ? '马股报报看' : 'BursaNews';
  }
  // swap footer logo
  const ftLogo = document.querySelector('.ft-logo-img');
  if (ftLogo) {
    const ROOT = (document.querySelector('meta[name=root]') || {content:''}).content;
    ftLogo.src = l === 'zh'
      ? ROOT + 'assets/images/logo-cn.png'
      : ROOT + 'assets/images/logo-en.png';
  }
}


function toggleMob() {
  var mob = document.getElementById('mob-menu');
  var btn = document.querySelector('.nav-mob-toggle');
  if (!mob) return;
  var isOpen = mob.classList.contains('open');
  if (isOpen) {
    mob.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded','false');
    document.removeEventListener('click', _mobClose);
  } else {
    mob.classList.add('open');
    if (btn) btn.setAttribute('aria-expanded','true');
    setTimeout(function(){ document.addEventListener('click', _mobClose); }, 10);
  }
}
function _mobClose(e) {
  var mob = document.getElementById('mob-menu');
  var btn = document.querySelector('.nav-mob-toggle');
  if (!mob) return;
  if (!mob.contains(e.target) && (!btn || !btn.contains(e.target))) {
    mob.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded','false');
    document.removeEventListener('click', _mobClose);
  }
}

function openWA(m) {
  const text = m || (lang === 'zh'
    ? 'Hi，我想了解更多关于马股报报看的信息'
    : 'Hi, I would like to know more about BursaNews');
  window.open('https://wa.me/601156482183?text=' + encodeURIComponent(text), '_blank');
}

document.addEventListener('DOMContentLoaded', function() {
  const ROOT = (document.querySelector('meta[name=root]') || {content:''}).content;
  const pg = location.pathname.split('/').pop() || 'index.html';

  document.body.insertAdjacentHTML('afterbegin', `
<nav id="main-nav" role="navigation" aria-label="Main navigation">
  <a href="${ROOT}index.html" class="nav-logo" aria-label="BursaNews Home">
    <img src="${ROOT}assets/images/logo-cn.png" class="logo-zh" alt="马股报报看 BursaNews Logo" height="44" loading="eager">
    <img src="${ROOT}assets/images/logo-en.png" class="logo-en" alt="BursaNews Malaysia Bursa Investing Logo" height="44" loading="eager" style="display:none;">
  </a>
  <div class="nav-links" role="menubar">
    <a href="${ROOT}index.html" class="nav-link" data-en="Home" data-zh="首页" role="menuitem">首页</a>
    <a href="${ROOT}starterkit.html" class="nav-link nav-highlight" data-en="🎁 Starter Kit" data-zh="🎁 免费入门包" role="menuitem">🎁 免费入门包</a>
    <a href="${ROOT}resources.html" class="nav-link" data-en="Investing Guide" data-zh="投资指南" role="menuitem">投资指南</a>
    <a href="${ROOT}affiliates.html" class="nav-link" data-en="Broker Bonuses" data-zh="券商推荐" role="menuitem">券商推荐</a>
    <a href="${ROOT}subscription.html" class="nav-link" data-en="Subscribe" data-zh="订阅计划" role="menuitem">订阅计划</a>
    <a href="${ROOT}coaching.html" class="nav-link" data-en="Coaching" data-zh="课程辅导" role="menuitem">课程辅导</a>
    <a href="${ROOT}community.html" class="nav-link" data-en="Social Media" data-zh="社交媒体" role="menuitem">社交媒体</a>
    <a href="${ROOT}about.html" class="nav-link" data-en="About" data-zh="关于我们" role="menuitem">关于我们</a>
  </div>
  <div class="nav-actions" style="display:flex;flex-direction:row;align-items:center;gap:8px;flex-shrink:0;">
    <div class="lang-toggle" role="group" aria-label="Language selector" style="display:inline-flex;flex-direction:row;align-items:center;background:rgba(0,0,0,.06);border-radius:26px;padding:3px;gap:2px;white-space:nowrap;flex-shrink:0;">
      <span class="lang-btn" data-lang="en" onclick="setLang('en')" role="button" tabindex="0" style="font-size:14px;font-weight:700;padding:6px 16px;border-radius:22px;cursor:pointer;line-height:1;display:inline-block;">EN</span>
      <span class="lang-btn active" data-lang="zh" onclick="setLang('zh')" role="button" tabindex="0" style="font-size:14px;font-weight:700;padding:6px 16px;border-radius:22px;cursor:pointer;line-height:1;display:inline-block;">中文</span>
    </div>
    <button class="nav-mob-toggle" onclick="toggleMob()" aria-label="Open menu" aria-expanded="false" style="width:42px;height:42px;border:1.5px solid var(--navy,#0a1628);border-radius:9px;background:#fff;cursor:pointer;display:none;align-items:center;justify-content:center;flex-shrink:0;padding:0;">
      <div style="display:flex;flex-direction:column;gap:4.5px;align-items:center;pointer-events:none;">
        <span style="display:block;width:20px;height:2px;background:var(--navy,#0a1628);border-radius:2px;"></span>
        <span style="display:block;width:20px;height:2px;background:var(--navy,#0a1628);border-radius:2px;"></span>
        <span style="display:block;width:20px;height:2px;background:var(--navy,#0a1628);border-radius:2px;"></span>
      </div>
    </button>
  </div>
</nav>
<div class="mob" id="mob-menu" role="dialog" aria-label="Mobile navigation">
  <a href="${ROOT}index.html" data-en="Home" data-zh="首页">首页</a>
  <a href="${ROOT}starterkit.html" data-en="🎁 Free Starter Kit" data-zh="🎁 免费入门包" style="color:#16a34a!important;font-weight:700;background:#f0fdf4;">🎁 免费入门包</a>
  <a href="${ROOT}resources.html" data-en="Investing Guide" data-zh="投资指南">投资指南</a>
  <a href="${ROOT}affiliates.html" data-en="Broker Bonuses" data-zh="券商推荐">券商推荐</a>
  <a href="${ROOT}subscription.html" data-en="Subscribe" data-zh="订阅计划">订阅计划</a>
  <a href="${ROOT}coaching.html" data-en="Coaching" data-zh="课程辅导">课程辅导</a>
  <a href="${ROOT}community.html" data-en="Social Media" data-zh="社交媒体">社交媒体</a>
  <a href="${ROOT}about.html" data-en="About" data-zh="关于我们">关于我们</a>
</div>
`);

document.body.insertAdjacentHTML('beforeend', `
<footer>
  <div class="ft-grid">
    <div class="ft-brand">
      <img class="ft-logo-img" src="${ROOT}assets/images/logo-en.png" alt="BursaNews"
        style="height:52px;width:52px;border-radius:12px;object-fit:cover;margin-bottom:.75rem;">
      <p data-en="Real talk about real money. Built by ex-investment banking professionals with 10+ years experience advising 50+ listed companies." data-zh="认真聊钱这件事。由前投资银行顾问打造，拥有逾10年资本市场经验，曾为50+家上市公司提供顾问服务。">Real talk about real money. Built by ex-investment banking professionals with 10+ years experience advising 50+ listed companies.</p>
      <div class="socials">
        <a href="https://youtube.com/@bursa-news?si=e3_hLvL3iAulMiA9" target="_blank" rel="noopener" title="YouTube">▶</a>
        <a href="https://www.facebook.com/share/1CsRJJJLku/" target="_blank" rel="noopener" title="Facebook">f</a>
        <a href="https://www.instagram.com/bursa_news_" target="_blank" rel="noopener" title="Instagram">ig</a>
        <a href="https://www.tiktok.com/@bursa_news_" target="_blank" rel="noopener" title="TikTok">tt</a>
        <a href="https://xhslink.com/m/8TsW6O4Y3u" target="_blank" rel="noopener" title="小红书">红</a>
      </div>
    </div>
    <div class="ft-col">
      <h4 data-en="Learn" data-zh="学习">Learn</h4>
      <a href="${ROOT}posts/moomoo-review-malaysia.html" data-en="Moomoo Malaysia Review" data-zh="Moomoo完整评测">Moomoo Malaysia Review</a>
      <a href="${ROOT}posts/webull-review-malaysia.html" data-en="Webull Malaysia Review" data-zh="Webull完整评测">Webull Malaysia Review</a>
      <a href="${ROOT}posts/how-to-start-investing-malaysia.html" data-en="How to Start Investing" data-zh="如何开始投资">How to Start Investing</a>
      <a href="${ROOT}posts/what-is-cds-account.html" data-en="CDS Account Guide" data-zh="CDS账户指南">CDS Account Guide</a>
      <a href="${ROOT}posts/rights-issue-explained.html" data-en="Rights Issue Explained" data-zh="供股详解">Rights Issue Explained</a>
    </div>
    <div class="ft-col">
      <h4 data-en="Services" data-zh="服务">Services</h4>
      <a href="${ROOT}subscription.html" data-en="Daily Reports (订阅)" data-zh="每日报告（订阅）">Daily Reports (订阅)</a>
      <a href="${ROOT}moomoo-sign-up-code.html" data-en="Moomoo Sign Up Rewards" data-zh="Moomoo开户奖励">Moomoo Sign Up Rewards</a>
      <a href="${ROOT}webull-sign-up-code.html" data-en="Webull Sign Up Rewards" data-zh="Webull开户奖励">Webull Sign Up Rewards</a>
      <a href="${ROOT}coaching.html" data-en="1-on-1 Coaching" data-zh="一对一辅导">1-on-1 Coaching</a>
    </div>
    <div class="ft-col">
      <h4 data-en="Company" data-zh="关于">Company</h4>
      <a href="${ROOT}about.html" data-en="About Us" data-zh="关于我们">About Us</a>
      <a href="${ROOT}social.html" data-en="Social Media" data-zh="社交媒体">Social Media</a>
      <a href="${ROOT}about.html#disclaimer" data-en="Disclaimer" data-zh="免责声明">Disclaimer</a>
    </div>
  </div>
  <div class="ft-bottom">
    <p data-en="© 2026 BursaNews | 马股报报看. All rights reserved." data-zh="© 2026 马股报报看 | BursaNews. 版权所有。">© 2026 BursaNews | 马股报报看. All rights reserved.</p>
    <p>bursanews.my</p>
  </div>
  <p class="ft-disc" data-en="BursaNews is not a licensed financial advisor. All content is for educational purposes only and does not constitute investment advice. Trading involves risk. This site contains affiliate links — we may earn a commission if you sign up via our links, at no extra cost to you." data-zh="马股报报看不是持牌财务顾问。所有内容仅供教育参考，不构成投资建议。投资涉及风险。本站含联盟推广链接，若您通过我们的链接注册，我们可能获得佣金，对您无额外费用。">BursaNews is not a licensed financial advisor. All content is for educational purposes only and does not constitute investment advice.</p>
</footer>
<div class="wa-float">
  <div class="wa-tip" data-en="Chat on WhatsApp" data-zh="WhatsApp 联系">Chat on WhatsApp</div>
  <button class="wa-btn" onclick="openWA()" aria-label="WhatsApp">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30" height="30" style="display:block;margin:auto;">
      <circle cx="16" cy="16" r="14" fill="rgba(255,255,255,0.2)"/>
      <path fill="white" d="M16 4C9.373 4 4 9.373 4 16c0 2.385.668 4.61 1.822 6.5L4 28l5.688-1.79A11.9 11.9 0 0016 28c6.627 0 12-5.373 12-12S22.627 4 16 4zm6.406 16.594c-.27.758-1.587 1.45-2.188 1.522-.562.068-1.273.096-2.055-.129-.474-.14-1.083-.328-1.86-.642-3.27-1.313-5.402-4.617-5.563-4.832-.16-.215-1.312-1.74-1.312-3.32 0-1.578.828-2.355 1.121-2.676.27-.293.586-.363.781-.363l.563.01c.18 0 .43-.068.672.512.27.617.918 2.25 1 2.441.082.192.133.418.027.664-.105.247-.16.402-.316.617l-.484.563c-.16.176-.332.367-.145.715.188.348.836 1.371 1.797 2.219 1.234 1.094 2.273 1.434 2.594 1.598.32.164.508.137.695-.082.188-.22.805-.937 1.02-1.261.214-.324.43-.27.726-.164.293.105 1.875.883 2.195 1.043.32.16.535.238.613.371.078.293-.136 1.172-.432 1.934z"/>
    </svg>
  </button>
</div>`);

  // active nav
  document.querySelectorAll('.nav-links a, .mob a').forEach(a => {
    if (a.getAttribute('href') && a.getAttribute('href').split('/').pop() === pg) a.classList.add('active');
  });

  setLang(lang);
});
