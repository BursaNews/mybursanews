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
  // swap logo
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
    <a href="${ROOT}insights.html" class="nav-link" data-en="Market Insights" data-zh="市场分析" role="menuitem">市场分析</a>
    <a href="${ROOT}resources.html" class="nav-link" data-en="Resources" data-zh="学习资源" role="menuitem">学习资源</a>
    <a href="${ROOT}affiliates.html" class="nav-link" data-en="Brokers" data-zh="开户指南" role="menuitem">开户指南</a>
    <a href="${ROOT}subscription.html" class="nav-link" data-en="Subscribe" data-zh="订阅计划" role="menuitem">订阅计划</a>
    <a href="${ROOT}coaching.html" class="nav-link" data-en="Coaching" data-zh="课程辅导" role="menuitem">课程辅导</a>
    <a href="${ROOT}community.html" class="nav-link" data-en="Community" data-zh="社群" role="menuitem">社群</a>
    <a href="${ROOT}about.html" class="nav-link" data-en="About" data-zh="关于我们" role="menuitem">关于我们</a>
  </div>
  <div class="nav-actions">
    <button class="lang-toggle" onclick="toggleLang()" aria-label="Switch language">
      <span class="lang-btn" data-lang="en" onclick="setLang('en')">EN</span>
      <span class="lang-btn active" data-lang="zh" onclick="setLang('zh')">中文</span>
    </button>
    <button class="nav-mob-toggle" onclick="toggleMob()" aria-label="Open menu" aria-expanded="false">☰</button>
  </div>
</nav>
<div class="mob" id="mob-menu" role="dialog" aria-label="Mobile navigation">
  <a href="${ROOT}index.html" data-en="Home" data-zh="首页">首页</a>
  <a href="${ROOT}starterkit.html" data-en="🎁 Free Starter Kit" data-zh="🎁 免费入门包">🎁 免费入门包</a>
  <a href="${ROOT}insights.html" data-en="Market Insights" data-zh="市场分析">市场分析</a>
  <a href="${ROOT}resources.html" data-en="Resources" data-zh="学习资源">学习资源</a>
  <a href="${ROOT}affiliates.html" data-en="Brokers" data-zh="开户指南">开户指南</a>
  <a href="${ROOT}subscription.html" data-en="Subscribe" data-zh="订阅计划">订阅计划</a>
  <a href="${ROOT}coaching.html" data-en="Coaching" data-zh="课程辅导">课程辅导</a>
  <a href="${ROOT}community.html" data-en="Community" data-zh="社群">社群</a>
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
      <a href="${ROOT}posts/how-to-start-investing-malaysia.html" data-en="How to Start Investing" data-zh="如何开始投资">How to Start Investing</a>
      <a href="${ROOT}posts/what-is-cds-account.html" data-en="CDS Account Guide" data-zh="CDS账户指南">CDS Account Guide</a>
      <a href="${ROOT}posts/moomoo-sign-up-guide.html" data-en="Moomoo Sign Up Guide" data-zh="Moomoo开户指南">Moomoo Sign Up Guide</a>
      <a href="${ROOT}posts/rights-issue-explained.html" data-en="Rights Issue Explained" data-zh="供股详解">Rights Issue Explained</a>
    </div>
    <div class="ft-col">
      <h4 data-en="Services" data-zh="服务">Services</h4>
      <a href="${ROOT}subscription.html" data-en="Daily Reports (订阅)" data-zh="每日报告（订阅）">Daily Reports (订阅)</a>
      <a href="${ROOT}affiliates.html" data-en="Moomoo Sign Up Rewards" data-zh="Moomoo开户奖励">Moomoo Sign Up Rewards</a>
      <a href="${ROOT}affiliates.html" data-en="Webull Sign Up Rewards" data-zh="Webull开户奖励">Webull Sign Up Rewards</a>
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" style="display:block;margin:auto;">
  <path fill="white" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.306A9.935 9.935 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm5.2 14.4c-.22.61-1.3 1.16-1.78 1.22-.46.06-.9.22-3.06-.64-2.6-1.04-4.28-3.7-4.4-3.88-.14-.18-1.1-1.46-1.1-2.78 0-1.32.68-1.96 1-2.22.26-.22.58-.28.78-.28l.56.01c.18 0 .44-.07.68.52.26.62.88 2.14.96 2.3.08.16.14.36.03.58-.1.22-.16.36-.32.56l-.48.56c-.16.16-.32.32-.14.64.18.32.8 1.32 1.72 2.14 1.18 1.06 2.18 1.38 2.5 1.54.32.16.5.14.68-.08.2-.22.82-.96 1.04-1.3.22-.32.44-.26.74-.16.3.1 1.9.9 2.22 1.06.32.16.54.24.62.38.08.28-.14 1.14-.36 1.72z"/>
</svg>
  </button>
</div>`);

  // active nav
  document.querySelectorAll('.nav-links a, .mob a').forEach(a => {
    if (a.getAttribute('href') && a.getAttribute('href').split('/').pop() === pg) a.classList.add('active');
  });

  setLang(lang);
});
