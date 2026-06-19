const tasks = [
  {
    id: "phishing",
    title: "钓鱼信息诊断",
    short: "找出仿冒消息里的风险线索",
    icon: "link",
    ability: "来源核验",
  },
  {
    id: "deepfake",
    title: "深度伪造观察",
    short: "观察画面线索与来源链条",
    icon: "scan",
    ability: "证据观察",
  },
  {
    id: "rumor",
    title: "谣言传播模拟",
    short: "用 SIR 模型看扩散与澄清",
    icon: "network",
    ability: "传播抑制",
  },
  {
    id: "privacy",
    title: "隐私授权判断",
    short: "按最小必要原则做选择",
    icon: "shield",
    ability: "隐私保护",
  },
];

const PERSONA_STORAGE_KEY = "persona";
const ONLINE_URL = "https://superfox666.github.io/shuangbai-h5/";
const PASS_ISSUER = "安徽省百所高校百万大学生科普创意创新大赛 · 双百H5互动作品";

const PERSONAS = [
  {
    id: "youth",
    name: "青少年 / 大学生",
    code: "P-01",
    pain: "短视频热梗、校园群聊和扫码领福利最容易把判断时间压缩掉。",
    route: "重点训练：先看来源，再找证据。",
  },
  {
    id: "farmer",
    name: "农民",
    code: "P-02",
    pain: "农资补贴、助农项目和乡镇群消息需要更清楚的核验路径。",
    route: "重点训练：陌生链接与验证码风险。",
  },
  {
    id: "worker",
    name: "产业工人",
    code: "P-03",
    pain: "排班、招聘、补贴和工厂群通知里，谣言与仿冒通知常混在一起。",
    route: "重点训练：慢转发和传播抑制。",
  },
  {
    id: "elder",
    name: "老年人",
    code: "P-04",
    pain: "养老金、健康讲座和亲友转发内容，最需要低门槛识别口诀。",
    route: "重点训练：防诈骗、辨谣言、少授权。",
  },
  {
    id: "civil",
    name: "领导干部 / 公务员",
    code: "P-05",
    pain: "会议通知、紧急任务和仿冒上级语音视频，需要来源链条核验。",
    route: "重点训练：深伪线索与权威来源。",
  },
  {
    id: "all",
    name: "全部体验",
    code: "P-00",
    pain: "不限定身份，按全民科普路线完整走完四个 AI 识伪实验。",
    route: "推荐路线：覆盖五类人群的完整实验。",
  },
];

const iconPaths = {
  link: "./assets/icons/link.svg",
  scan: "./assets/icons/scan.svg",
  network: "./assets/icons/network.svg",
  shield: "./assets/icons/shield.svg",
  lab: "./assets/icons/lab.svg",
  report: "./assets/icons/report.svg",
  check: "./assets/icons/checkmark.svg",
};

const evidenceSets = {
  phishing: [
    {
      id: "shortlink",
      label: "陌生短链接",
      point: "POINT 01",
      good: true,
      explain:
        "短链接会隐藏真实目标地址。涉及账号、支付或验证码时，应回到官方 App 或官网入口，不从陌生链接跳转。",
    },
    {
      id: "urgent",
      label: "30 分钟内冻结",
      point: "POINT 02",
      good: true,
      explain:
        "紧急倒计时会压缩判断时间，是常见社工手法。真正重要的安全通知通常会给出明确核验渠道，而不是只催你立刻点链接。",
    },
    {
      id: "code",
      label: "索要验证码",
      point: "POINT 03",
      good: true,
      explain:
        "验证码相当于一次性通行凭证。任何通过陌生消息索要验证码的行为都应视为高风险。",
    },
    {
      id: "greeting",
      label: "使用礼貌称呼",
      point: "POINT 04",
      good: false,
      explain:
        "礼貌称呼本身不是风险点。风险判断要看来源链条和动作要求，而不是看语气是否客气。",
    },
  ],
  deepfake: [
    {
      id: "light",
      label: "光影不一致",
      explain:
        "如果光照方向与脸部阴影关系不自然，可能提示合成风险。但它只是线索，不能单独给出真伪结论。",
    },
    {
      id: "edge",
      label: "边缘融合异常",
      explain:
        "头发、耳廓、脸部边缘是深度合成里常见的伪影区域。看到边缘异常时，应继续核验来源。",
    },
    {
      id: "sync",
      label: "口型与语义节奏不稳",
      explain:
        "口型、语音和表情节奏不一致，可能提示 lip-sync 风险，但仍需结合原始发布链条判断。",
    },
    {
      id: "source",
      label: "缺少权威来源",
      explain:
        "来源链条缺失比单个视觉线索更关键。遇到重大信息时，应优先找原始发布者和权威渠道。",
    },
  ],
};

const permissions = [
  {
    id: "location",
    title: "精确定位",
    desc: "查附近科普场馆时可临时允许",
    needed: false,
    risk: "当前只是答题训练，精确定位不是必要权限。",
    riskWeight: 26,
    safeAction: "仅在导航附近场馆时临时允许",
    matrix: [
      { feature: "宿舍学习", ok: false },
      { feature: "查课表", ok: false },
      { feature: "扫码取餐", ok: false },
      { feature: "选课系统", ok: false },
    ],
  },
  {
    id: "contacts",
    title: "通讯录",
    desc: "邀请好友时可能被请求",
    needed: false,
    risk: "通讯录属于敏感信息，科普答题不需要读取联系人。",
    riskWeight: 32,
    safeAction: "拒绝读取联系人，改用手动分享",
    matrix: [
      { feature: "宿舍学习", ok: false },
      { feature: "查课表", ok: false },
      { feature: "扫码取餐", ok: false },
      { feature: "选课系统", ok: false },
    ],
  },
  {
    id: "camera",
    title: "相机",
    desc: "扫码查看资料时可按需打开",
    needed: true,
    risk: "如果确实需要扫码，可临时允许；使用后可以关闭。",
    riskWeight: 12,
    safeAction: "扫码取餐或扫码查资料时临时允许",
    matrix: [
      { feature: "宿舍学习", ok: false },
      { feature: "查课表", ok: false },
      { feature: "扫码取餐", ok: true },
      { feature: "选课系统", ok: false },
    ],
  },
  {
    id: "microphone",
    title: "麦克风",
    desc: "本实验没有语音输入",
    needed: false,
    risk: "没有语音功能时请求麦克风，应拒绝或稍后再授权。",
    riskWeight: 24,
    safeAction: "无语音输入场景时保持关闭",
    matrix: [
      { feature: "宿舍学习", ok: false },
      { feature: "查课表", ok: false },
      { feature: "扫码取餐", ok: false },
      { feature: "选课系统", ok: false },
    ],
  },
];

const sourceItems = [
  {
    title: "A Contribution to the Mathematical Theory of Epidemics",
    org: "Royal Society / Kermack & McKendrick (1927)",
    url: "https://royalsocietypublishing.org/doi/10.1098/rspa.1927.0118",
    visited: "2026-06-09",
    use: "用于实验三 SIR 方程、参数解释与学术来源。",
  },
  {
    title: "中华人民共和国个人信息保护法 第六条",
    org: "全国人大",
    url: "http://www.npc.gov.cn/npc/c2/c30834/202108/t20210820_313088.html",
    visited: "2026-06-09",
    use: "用于实验四最小必要原则与权限判断逻辑。",
  },
  {
    title: "Rössler et al. FaceForensics++",
    org: "ICCV 2019",
    url: "https://openaccess.thecvf.com/content_ICCV_2019/html/Rossler_FaceForensics_Learning_To_Detect_Manipulated_Facial_Images_ICCV_2019_paper.html",
    visited: "2026-06-09",
    use: "用于实验二深度伪造线索解释与边界说明。",
  },
  {
    title: "互联网信息服务深度合成管理规定",
    org: "国家互联网信息办公室",
    url: "https://www.cac.gov.cn/2022-12/11/c_1672221949354811.htm",
    visited: "2026-06-09",
    use: "用于实验二治理背景与科学表达边界。",
  },
  {
    title: "人工智能生成合成内容标识办法",
    org: "国家互联网信息办公室等四部门",
    url: "https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm",
    visited: "2026-06-09",
    use: "用于解释生成内容标识与公众识别场景。",
  },
  {
    title: "中国互联网联合辟谣平台",
    org: "中央网信办相关平台",
    url: "https://www.piyao.org.cn/",
    visited: "2026-06-09",
    use: "用于实验三谣言核验、辟谣与“核验后转发”建议。",
  },
  {
    title: "PhishTank",
    org: "OpenDNS / Cisco 社区项目",
    url: "https://phishtank.org/",
    visited: "2026-06-09",
    use: "用于实验一钓鱼链接样态与风险认知背景。",
  },
  {
    title: "双百大赛 H5 科普互动作品申报书模板",
    org: "双百大赛 2026 模板 / 本地副本路径",
    url: "命题/双百赛题与案例/3.H5科普互动作品作品申报书（2026年模板）.docx",
    visited: "2026-06-09",
    use: "用于申报书 8 节结构映射与材料核对。",
  },
  {
    title: "双百大赛 AI 工具使用情况说明书模板",
    org: "双百大赛 2026 模板 / 本地副本路径",
    url: "命题/双百赛题与案例/13.AI 工具使用情况说明书（2026年模板）.docx",
    visited: "2026-06-09",
    use: "用于 AI 使用声明、占比、核验与责任承诺。",
  },
];

function readPersona() {
  try {
    const saved = sessionStorage.getItem(PERSONA_STORAGE_KEY);
    return PERSONAS.some((persona) => persona.id === saved) ? saved : null;
  } catch {
    return null;
  }
}

function selectedPersona() {
  return PERSONAS.find((persona) => persona.id === state.persona) || PERSONAS.find((persona) => persona.id === "all");
}

const state = {
  screen: "home",
  persona: readPersona(),
  found: {
    phishing: new Set(),
    deepfake: new Set(),
  },
  missed: new Set(),
  deepfakeLens: { x: 58, y: 44 },
  rumor: {
    share: 62,
    delay: 44,
    authority: 35,
    preset: "medium",
    cityMode: false,
  },
  privacy: {},
  completed: new Set(),
  phishingPulse: false,
  logEntries: [
    {
      time: "14:00:00",
      label: "系统",
      text: "进入识伪实验室，准备开始四个实验。",
    },
  ],
  logExpanded: false,
};

const screen = document.querySelector("#screen");
const stepTitle = document.querySelector("#stepTitle");
const stepOrder = document.querySelector("#stepOrder");
const progressValue = document.querySelector("#progressValue");
const progressBar = document.querySelector("#progressBar");
const progressRing = document.querySelector(".progress-ring");
const sideSteps = document.querySelector("#sideSteps");
const experimentLog = document.querySelector("#experimentLog");
const mapButton = document.querySelector("#mapButton");
const logToggle = document.querySelector("#logToggle");
const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
let rumorUpdateFrame = 0;

mapButton.addEventListener("click", () => render(state.persona ? "map" : "persona"));
logToggle?.addEventListener("click", () => {
  state.logExpanded = !state.logExpanded;
  logToggle.setAttribute("aria-expanded", String(state.logExpanded));
  logToggle.textContent = state.logExpanded ? "收起日志" : "展开日志";
  experimentLog?.parentElement?.classList.toggle("is-expanded", state.logExpanded);
});

function icon(name, className = "") {
  const src = iconPaths[name] || iconPaths.lab;
  return `<img src="${src}" alt="" aria-hidden="true"${className ? ` class="${className}"` : ""}>`;
}

function render(nextScreen = state.screen) {
  state.screen = nextScreen;
  updateChrome();

  if (nextScreen === "home") {
    renderHome();
    return;
  }
  if (nextScreen === "persona") {
    renderPersona();
    return;
  }
  if (nextScreen === "map") {
    renderMap();
    return;
  }
  if (nextScreen === "phishing") {
    renderPhishing();
    return;
  }
  if (nextScreen === "deepfake") {
    renderDeepfake();
    return;
  }
  if (nextScreen === "rumor") {
    renderRumor();
    return;
  }
  if (nextScreen === "privacy") {
    renderPrivacy();
    return;
  }
  if (nextScreen === "report") {
    renderReport();
    return;
  }
  if (nextScreen === "sources") {
    renderSources();
    return;
  }
  if (nextScreen === "about") {
    renderAbout();
  }
}

function updateChrome() {
  const completedCount = state.completed.size;
  const percent = Math.round((completedCount / tasks.length) * 100);
  progressValue.textContent = `${percent}%`;
  progressBar.style.setProperty("--progress-scale", String(percent / 100));
  progressRing.setAttribute("role", "progressbar");
  progressRing.setAttribute("aria-label", `实验完成度 ${percent}%`);
  progressRing.setAttribute("aria-valuemin", "0");
  progressRing.setAttribute("aria-valuemax", "100");
  progressRing.setAttribute("aria-valuenow", String(percent));
  progressRing.style.background = `conic-gradient(var(--color-accent) ${
    percent * 3.6
  }deg, var(--color-surface-muted) 0deg)`;

  const current = tasks.find((task) => task.id === state.screen);
  const titles = {
    report: "江淮通行证",
    sources: "引用来源",
    about: "关于作品",
    map: "任务地图",
    persona: "角色选择",
    home: "准备进入",
  };
  stepTitle.textContent = current ? current.title : titles[state.screen] || "准备进入";
  const entryOrders = {
    home: "入口 00 / 02",
    persona: "入口 01 / 02",
    map: "实验 00 / 04",
    report: "报告 / 04",
    sources: "资料 / 04",
    about: "说明 / 04",
  };
  stepOrder.textContent = current
    ? `实验 ${String(tasks.findIndex((task) => task.id === current.id) + 1).padStart(2, "0")} / 04`
    : entryOrders[state.screen] || "实验 00 / 04";

  sideSteps.innerHTML = tasks
    .map((task, index) => {
      const done = state.completed.has(task.id);
      const active = state.screen === task.id;
      return `<li class="${done ? "is-done" : ""} ${active ? "is-active" : ""}"><span class="node-index">${String(
        index + 1
      ).padStart(2, "0")}</span><span>${task.title}${done ? " 已完成" : ""}</span></li>`;
    })
    .join("");

  if (experimentLog) {
    experimentLog.innerHTML = state.logEntries
      .slice(0, 8)
      .map(
        (entry) =>
          `<li><span class="log-time">${entry.time}</span><span class="log-label">${entry.label}</span><span class="log-text">${entry.text}</span></li>`
      )
      .join("");
  }
}

function setScreen(html) {
  screen.innerHTML = `<div class="screen-view">${html}</div>`;
}

function prefersReducedMotion() {
  return Boolean(reducedMotionQuery?.matches);
}

function scheduleRumorViewUpdate() {
  if (prefersReducedMotion()) {
    updateRumorView();
    return;
  }
  if (rumorUpdateFrame) return;
  rumorUpdateFrame = window.requestAnimationFrame(() => {
    rumorUpdateFrame = 0;
    updateRumorView();
  });
}

function renderHome() {
  setScreen(`
    <section class="hero lab-cover">
      <div class="hero-grid">
        <div class="hero-copy">
          <div class="lab-system-strip" aria-label="作品定位">
            <span>JIANGHUAI AI FORENSIC LAB</span>
            <span>H5 INTERACTIVE</span>
          </div>
          <div class="hero-headline-copy">
            <div class="hero-mark">${icon("lab")}</div>
            <div>
              <p class="eyebrow">数字科普 · H5 互动 · 双百大赛 2026</p>
              <h2>江淮智辨 AI</h2>
            </div>
          </div>
          <p class="hero-subtitle">面向五类人群的 AI 时代科普互动实验室</p>
          <p class="lead">以江淮场景为入口，把钓鱼信息、深度伪造、谣言传播和隐私授权风险拆成 4 个可操作实验，显式呼应“科创兴皖、科普育人”。</p>
          <div class="tag-row lab-theme-row" aria-label="主题标签">
            <span class="tag">科创兴皖</span>
            <span class="tag">科普育人</span>
            <span class="tag">五类人群</span>
            <span class="tag">江淮防伪</span>
          </div>
          <div class="hero-facts">
            <article class="fact-card">
              <strong>4 个实验剧场</strong>
              <p>来源、证据、传播、授权四条判断链。</p>
            </article>
            <article class="fact-card">
              <strong>5 类重点人群</strong>
              <p>青少年、农民、产业工人、老年人、干部公务员。</p>
            </article>
            <article class="fact-card">
              <strong>1 张通行证</strong>
              <p>最后生成匿名的江淮防伪通行证。</p>
            </article>
          </div>
          <div class="hero-note">
            <strong>体验路径：</strong>
            <p>先选择你的身份，再进入四个实验；不采集真实身份，不上传个人数据，只在本机保存本次角色选择。</p>
          </div>
          <div class="button-row">
            <button class="primary-button" type="button" data-nav="persona">进入实验室</button>
            <button class="secondary-button" type="button" data-nav="about">先看作品结构</button>
          </div>
        </div>
        <aside class="hero-visual lab-dashboard" aria-label="实验室操作仪表板">
          <div class="dashboard-head">
            <p class="eyebrow">LIVE DASHBOARD</p>
            <span class="status-pill">RUNNING</span>
          </div>
          <div class="dashboard-grid">
            <article>
              <span>completion</span>
              <strong>${state.completed.size}/4</strong>
            </article>
            <article>
              <span>risk-detected</span>
              <strong>${state.found.phishing.size + state.found.deepfake.size}</strong>
            </article>
            <article>
              <span>experiments</span>
              <strong>04</strong>
            </article>
            <article>
              <span>time-elapsed</span>
              <strong>05-08m</strong>
            </article>
          </div>
          <div class="lab-orbit" aria-hidden="true">
            <span class="orbit-node orbit-node-a"></span>
            <span class="orbit-node orbit-node-b"></span>
            <span class="orbit-node orbit-node-c"></span>
            <span class="orbit-line orbit-line-a"></span>
            <span class="orbit-line orbit-line-b"></span>
          </div>
          <div class="lab-console" aria-label="运行日志摘要">
            <p><span>SYS</span> 初始化江淮防伪实验协议</p>
            <p><span>USR</span> 等待五类人群角色入口</p>
            <p><span>CHK</span> 科创兴皖 / 科普育人主题命中</p>
          </div>
        </aside>
      </div>
      <div class="detail-banner">
        <span>适合谁：青少年 / 农民 / 产业工人 / 老年人 / 领导干部及公务员</span>
        <span>适合场景：群聊转发 / AI 视频辨识 / App 授权判断 / 公共服务通知</span>
      </div>
    </section>
  `);
}

function renderPersona() {
  const current = selectedPersona();
  setScreen(`
    <section class="persona-screen">
      <div class="persona-intro">
        <p class="eyebrow">S0.5 PERSONA GATE</p>
        <h2 class="section-title">你今天以谁的身份进入实验室？</h2>
        <p class="lead">选择一个江淮场景身份，后续实验会按五类重点人群调整开场语境；也可以直接选择“全部体验”。</p>
      </div>
      <div class="persona-entry-panel">
        <div class="persona-entry-art" aria-hidden="true">
          <span class="persona-scanline"></span>
          <span class="persona-map-dot dot-a"></span>
          <span class="persona-map-dot dot-b"></span>
          <span class="persona-map-dot dot-c"></span>
          <strong>FIVE PUBLIC GROUPS</strong>
          <p>Jianghuai AI Forensic Pass</p>
        </div>
        <div class="persona-grid">
          ${PERSONAS.map(
            (persona) => `
            <button class="persona-card ${current.id === persona.id ? "is-active" : ""}" type="button" data-persona="${persona.id}" aria-pressed="${current.id === persona.id}">
              <span class="persona-code">${persona.code}</span>
              <span class="persona-avatar persona-avatar-${persona.id}" aria-hidden="true"></span>
              <span class="persona-copy">
                <strong>${persona.name}</strong>
                <span>${persona.pain}</span>
                <em>${persona.route}</em>
              </span>
            </button>
          `
          ).join("")}
        </div>
      </div>
      <div class="persona-footer">
        <button class="secondary-button persona-skip" type="button" data-persona="all">不选直接体验</button>
        <p>仅写入 <code>sessionStorage.persona</code>，关闭页面后失效；作品不采集姓名、学校、手机号等真实身份。</p>
      </div>
    </section>
  `);
}

function renderMap() {
  const persona = selectedPersona();
  setScreen(`
    <section class="mission-map">
      <div class="mission-brief">
        <p class="eyebrow">S1 EXPERIMENT BOARD</p>
        <h2 class="section-title">四关实验任务面板</h2>
        <p class="lead">当前路线：${persona.name}。每个实验只训练一条可复用方法，完成后汇总成匿名江淮防伪通行证。</p>
        <div class="mission-meta" aria-label="当前角色与作品主题">
          <span>${persona.code}</span>
          <strong>${persona.route}</strong>
          <em>科创兴皖 · 科普育人 · 五类人群</em>
        </div>
      </div>
      <div class="mission-queue" aria-label="实验任务面板">
        ${tasks
          .map(
            (task, index) => {
              const progress = progressForTask(task.id);
              return `
          <article class="mission-row ${state.completed.has(task.id) ? "is-done" : ""}">
            <button class="mission-main" type="button" data-nav="${task.id}">
              <span class="mission-number">EXP-${String(index + 1).padStart(2, "0")}</span>
              <span class="mission-copy">
                <span class="mission-ability">${task.ability}</span>
                <h3>${task.title}</h3>
                <span>${methodForTask(task.id)}</span>
              </span>
              <span class="mission-status" aria-label="${task.title}完成度 ${progress}%">
                <span class="mission-status-top">
                  <em>${progress}%</em>
                  <small>${state.completed.has(task.id) ? "COMPLETE" : "READY"}</small>
                </span>
                <span class="mission-bar"><span style="width:${progress}%"></span></span>
              </span>
              <span class="mission-enter">${state.completed.has(task.id) ? "复查实验" : "进入实验"}</span>
            </button>
          </article>
        `;
            }
          )
          .join("")}
      </div>
      <div class="mission-actions">
        <button class="secondary-button" type="button" data-nav="persona">重选角色</button>
        <button class="secondary-button" type="button" data-nav="sources">引用来源</button>
        <button class="secondary-button" type="button" data-nav="about">设计说明</button>
        <button class="primary-button" type="button" data-nav="report">生成当前报告</button>
      </div>
    </section>
  `);
}

function methodForTask(id) {
  const methods = {
    phishing: "看来源链条，识别短链接、倒计时和验证码索要。",
    deepfake: "找光影、边缘、口型与来源链条四类证据。",
    rumor: "用 SIR 参数观察转发冲动、核验延迟与澄清触达。",
    privacy: "按最小必要原则判断位置、通讯录、相机、麦克风。",
  };
  return methods[id] || "先判断，再理解，再带走行动口诀。";
}

function progressForTask(id) {
  if (state.completed.has(id)) return 100;
  if (id === "phishing") {
    return Math.min(90, Math.round((state.found.phishing.size / 3) * 90));
  }
  if (id === "deepfake") {
    return Math.min(90, Math.round((state.found.deepfake.size / evidenceSets.deepfake.length) * 90));
  }
  if (id === "rumor") {
    const changed =
      Math.abs(state.rumor.share - 62) +
      Math.abs(state.rumor.delay - 44) +
      Math.abs(state.rumor.authority - 35);
    const scenarioBoost = (state.rumor.preset && state.rumor.preset !== "medium" ? 16 : 0) + (state.rumor.cityMode ? 14 : 0);
    return Math.min(90, Math.round(changed * 1.8 + scenarioBoost));
  }
  if (id === "privacy") {
    return Math.min(90, Object.keys(state.privacy).length * 22);
  }
  return 0;
}

function phishingScenario() {
  const personaId = state.persona || "all";
  const copy = {
    farmer: {
      label: "江淮乡镇 · 农资补贴核验",
      time: "09:11",
      intro: "农资补贴消息看起来像公共服务通知，但真正风险在“陌生链接 + 验证码”。",
      message:
        "【皖农字 0911】您的农资补贴待核验，30 分钟内未确认将退回。请打开 https://safe-check.example.cn/9x 并输入验证码。",
      principle: "APWG 钓鱼报告强调，仿冒通知常把可信名义、短链接和凭证索要合并出现。",
    },
    elder: {
      label: "江淮社区 · 养老金复核提醒",
      time: "08:36",
      intro: "养老金类消息要先回官方渠道核验，不通过陌生链接提交验证码。",
      message:
        "【皖老办 1234】养老金资格需重新核验，30 分钟内未完成将暂停发放。点击 https://safe-check.example.cn/9x 输入验证码。",
      principle: "紧急倒计时会制造稀缺与恐惧，容易触发不核验就行动的社工反应。",
    },
    youth: {
      label: "江淮校园 · 账号异常通知",
      time: "09:42",
      intro: "校园群里的账号通知要先看来源链条，再看是否索要一次性凭证。",
      message:
        "您的校园账号存在异常，30 分钟内未验证将冻结。请打开 https://safe-check.example.cn/9x 并输入验证码完成保护。",
      principle: "账号冻结和领奖通知常用时间压力压缩判断，验证码不应交给陌生页面。",
    },
    worker: {
      label: "江淮工厂 · 补贴名单确认",
      time: "18:20",
      intro: "补贴、排班、招聘类通知要回企业正式系统核验，不能从群链接直接提交验证码。",
      message:
        "【岗位补贴】您已进入本月补贴名单，30 分钟内未确认将视为放弃。打开 https://safe-check.example.cn/9x 输入验证码。",
      principle: "群通知里出现“限时确认 + 短链接 + 验证码”，应按高风险处理。",
    },
    civil: {
      label: "江淮政务 · 会议系统登录提醒",
      time: "07:58",
      intro: "政务或会议通知更要核验来源，不把验证码交给非正式入口。",
      message:
        "【会议系统】您的账号需紧急校验，30 分钟内未完成将影响材料接收。打开 https://safe-check.example.cn/9x 输入验证码。",
      principle: "仿冒工作通知会利用责任压力催促操作，核验渠道比语气更关键。",
    },
    all: {
      label: "通用场景 · 账号异常通知",
      time: "09:42",
      intro: "先找“来源链条”和“动作要求”。点击你认为真正危险的线索。",
      message:
        "您的校园账号存在异常，30 分钟内未验证将冻结。请打开 https://safe-check.example.cn/9x 并输入验证码完成保护。",
      principle: "APWG / 社工研究都提示：可信名义、紧急压力和凭证索要叠加时，应先停止操作。",
    },
  };
  return copy[personaId] || copy.all;
}

function renderPhishing() {
  const scenario = phishingScenario();
  const phishingScore = Math.max(0, Math.min(100, Math.round((state.found.phishing.size / 3) * 100 - state.missed.size * 8)));
  const pulseClass = state.phishingPulse ? " is-pulsing" : "";
  const signalCards = [
    {
      id: "shortlink",
      eyebrow: "来源链条",
      title: "陌生短链接",
      desc: "先回官方入口，不从陌生链接跳转。",
    },
    {
      id: "urgent",
      eyebrow: "时间压力",
      title: "倒计时催促",
      desc: "越催越要停，真正通知会给出核验渠道。",
    },
    {
      id: "code",
      eyebrow: "动作要求",
      title: "索要验证码",
      desc: "验证码就是一次性通行凭证。",
    },
  ];
  setScreen(`
    <section class="phishing-lab">
      <p class="eyebrow">EXP-01 · JIANGHUAI TERMINAL</p>
      <h2 class="section-title">钓鱼信息诊断</h2>
      <p class="lead">${scenario.intro}</p>
      <div class="scenario">
        <div class="phishing-board">
          <div class="terminal-window" aria-label="终端模拟器">
            <div class="terminal-head">
              <span>${scenario.label}</span>
              <span>${scenario.time}</span>
            </div>
            <p class="terminal-line" data-persona-line>${scenario.message}</p>
          </div>
          <div class="message-layout">
            <div class="message-box phishing-phone">
              <div class="message-head"><span>模拟通知</span><span>${scenario.time}</span></div>
              <p class="message-text">
                ${highlightPhishingMessage(scenario.message, pulseClass)}
              </p>
              <div class="message-highlight" aria-label="风险摘要">
                <span class="message-chip is-risk">来源未验证</span>
                <span class="message-chip is-warning">倒计时施压</span>
                <span class="message-chip is-risk">索要验证码</span>
              </div>
            </div>
            <div class="signal-grid">
              ${signalCards.map((item) => phishingSignalCard(item)).join("")}
            </div>
          </div>
          <div class="phishing-analysis-panel" aria-label="三步分析面板">
            <article tabindex="0" title="先确认发送者、链接域名和跳转入口是否可信。" data-tooltip="先确认发送者、链接域名和跳转入口是否可信。">
              <span>来源</span>
              <strong>陌生短链</strong>
              <em>回官方 App / 官网核验</em>
            </article>
            <article tabindex="0" title="倒计时与冻结威胁会压缩判断时间。" data-tooltip="倒计时与冻结威胁会压缩判断时间。">
              <span>时间压力</span>
              <strong>30 分钟</strong>
              <em>越催越慢，先停一步</em>
            </article>
            <article tabindex="0" title="验证码、密码、付款动作属于高风险请求。" data-tooltip="验证码、密码、付款动作属于高风险请求。">
              <span>动作</span>
              <strong>输入验证码</strong>
              <em>一次性凭证不交给陌生页</em>
            </article>
          </div>
          <div class="analysis-strip phishing-feedback">
            <div class="analysis-item">
              <span>本关得分</span>
              <strong class="score-readout">${phishingScore}</strong>
            </div>
            <div class="analysis-item">
              <span>误点</span>
              <strong>${state.missed.size}</strong>
            </div>
            <div class="analysis-item">
              <span>原理</span>
              <strong>${scenario.principle}</strong>
            </div>
          </div>
        </div>
        <div class="evidence-grid">
          ${evidenceSets.phishing.map((item) => evidenceButton("phishing", item)).join("")}
        </div>
        <div id="explain" class="explain-card">
          <strong>提示</strong>
          <p>先暂停，不急着点。看它让你去哪里、填什么、为什么要现在做。</p>
        </div>
        <button class="primary-button" type="button" data-complete="phishing">结束本实验</button>
      </div>
    </section>
  `);
}

function highlightPhishingMessage(message, pulseClass = "") {
  return message
    .replace(/30 分钟/g, `<span class="risk-token is-warning${pulseClass}">30 分钟</span>`)
    .replace(
      /https:\/\/safe-check\.example\.cn\/9x/g,
      `<strong class="message-link risk-token is-risk${pulseClass}">https://safe-check.example.cn/9x</strong>`
    )
    .replace(/验证码/g, `<span class="risk-token is-risk${pulseClass}">验证码</span>`);
}

function deepfakeScenario() {
  const personaId = state.persona || "all";
  const copy = {
    civil: {
      eyebrow: "EXP-02 · CIVIL DEEPFAKE BRIEFING",
      title: "AI 换脸冒充上级布置紧急任务",
      lead:
        "模拟江淮某会议场景：一段“上级紧急布置任务”的视频被转发到工作群。先看来源链，再用光影、边缘、口型三类线索做交叉核验。",
      mission: "判断这段视频是否只靠“权威口吻”制造服从压力，并找出深伪破绽。",
      chips: ["江淮某会议室", "上级口吻诱导", "先核验来源链"],
      safeLabel: "原始会议片段",
      fakeLabel: "AI 换脸片段",
    },
    all: {
      eyebrow: "EXP-02 · DEEPFAKE COMPARISON",
      title: "深度伪造线索观察",
      lead:
        "这是自制剪影示意图，不是真实人脸。视觉异常只能提示风险，不能单独定真伪，需要和来源、上下文一起判断。",
      mission: "比较上下两段画面，拖动放大镜观察同一区域，再点击你发现的破绽点。",
      chips: ["剪影对比", "光影边缘核验", "来源链优先"],
      safeLabel: "参考画面",
      fakeLabel: "疑似合成画面",
    },
  };
  return copy[personaId] || copy.all;
}

const deepfakeTerms = {
  light: "GAN light-estimation",
  edge: "blending artifact",
  sync: "lip-sync drift",
  source: "source-chain missing",
};

const deepfakeHotspots = {
  light: { x: 28, y: 23 },
  edge: { x: 70, y: 47 },
  sync: { x: 55, y: 74 },
  source: { x: 18, y: 82 },
};

function evidenceButton(group, item) {
  const found = state.found[group].has(item.id);
  const missed = state.missed.has(item.id);
  return `
    <button class="evidence-button ${found ? "is-found" : ""} ${missed ? "is-missed" : ""}" type="button" data-evidence="${group}:${item.id}">
      <span class="evidence-copy">
        <span class="point-tag">${item.point}</span>
        <span>${item.label}</span>
      </span>
      <span>${found ? `${icon("check", "tiny-icon")} 已识别` : missed ? "✗ 再判断" : "点击"}</span>
    </button>
  `;
}

function phishingSignalCard(item) {
  const active = state.found.phishing.has(item.id);
  return `
    <article class="signal-card ${active ? "is-found" : ""}">
      <p class="eyebrow">${item.eyebrow}</p>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
      <span class="signal-state">${active ? "已识别" : "待判断"}</span>
    </article>
  `;
}

function renderDeepfake() {
  const foundCount = state.found.deepfake.size;
  const scenario = deepfakeScenario();
  const score = Math.min(100, Math.round((foundCount / evidenceSets.deepfake.length) * 100));
  const foundItems = evidenceSets.deepfake.filter((item) => state.found.deepfake.has(item.id));
  const barrage = foundItems.length
    ? foundItems
        .map(
          (item, index) =>
            `<span class="deepfake-barrage-token" style="--i:${index}">${deepfakeTerms[item.id] || item.label}</span>`
        )
        .join("")
    : `<span class="deepfake-barrage-token is-muted" style="--i:0">点击破绽后显示原理弹幕</span>`;
  setScreen(`
    <section class="deepfake-lab">
      <p class="eyebrow">${scenario.eyebrow}</p>
      <h2 class="section-title">${scenario.title}</h2>
      <p class="lead" data-persona-line>${scenario.lead}</p>
      <div class="deepfake-brief">
        ${scenario.chips
          .map((chip, index) => `<span class="scenario-chip is-${index === 1 ? "warning" : index === 2 ? "risk" : "safe"}">${chip}</span>`)
          .join("")}
      </div>
      <div class="scenario">
        <div class="deepfake-stage" aria-label="深度伪造双图对比实验" style="--lens-x:${state.deepfakeLens.x}%; --lens-y:${state.deepfakeLens.y}%">
          <img class="deepfake-watermark" src="./assets/generated/civil-meeting-deepfake-r3.webp?v=20260619s3" alt="" aria-hidden="true">
          <div class="scan-line" aria-hidden="true"></div>
          <div class="deepfake-stage-head">
            <div>
              <strong>对比任务</strong>
              <p>${scenario.mission}</p>
            </div>
            <div class="hotspot-counter">已识别 ${foundCount}/4</div>
          </div>
          <div class="deepfake-compare-grid">
            <article class="deepfake-frame is-reference">
              <span class="frame-label">${scenario.safeLabel}</span>
              <img src="./assets/generated/exp2-deepfake-pair-r2.webp?v=20260619s3" alt="抽象剪影对比参考图，画面不含真实人脸">
            </article>
            <article class="deepfake-frame is-suspect">
              <span class="frame-label">${scenario.fakeLabel}</span>
              <img src="./assets/generated/exp2-deepfake-pair-r2.webp?v=20260619s3" alt="抽象剪影对比疑似合成图，画面不含真实人脸">
              <div class="deepfake-lens" aria-hidden="true">
                <span>放大镜</span>
              </div>
              ${evidenceSets.deepfake
                .map((item) => {
                  const pos = deepfakeHotspots[item.id];
                  const found = state.found.deepfake.has(item.id);
                  return `
                <button class="hotspot ${found ? "is-found" : ""}" type="button" data-evidence="deepfake:${item.id}" data-id="${item.id}" aria-label="${item.label}" style="--x:${pos.x}%; --y:${pos.y}%">
                  <span class="hotspot-core">!</span>
                  <span class="hotspot-ripple" aria-hidden="true"></span>
                </button>
                ${found ? `<span class="deepfake-flaw-box" data-id="${item.id}" style="--x:${pos.x}%; --y:${pos.y}%">${deepfakeTerms[item.id]}</span>` : ""}
              `;
                })
                .join("")}
            </article>
          </div>
          <div class="deepfake-barrage" aria-live="polite">
            ${barrage}
          </div>
        </div>
        <div class="hotspot-legend">
          ${evidenceSets.deepfake.map((item) => deepfakeLegendItem(item)).join("")}
        </div>
        <div class="deepfake-score-strip">
          <div>
            <span>本关得分</span>
            <strong class="score-readout">${score}</strong>
          </div>
          <div>
            <span>证据进度</span>
            <strong>${foundCount}/4</strong>
          </div>
          <p>参考 Rössler et al. FaceForensics++：深伪判断应结合光影、边缘、口型和来源链多证据核验。</p>
        </div>
        <div id="explain" class="explain-card">
          <strong>提示</strong>
          <p>拖动或移动指针调整放大镜位置。视觉线索只是开始，来源和上下文才是判断中心。</p>
        </div>
        <button class="primary-button" type="button" data-complete="deepfake">结束本实验</button>
      </div>
    </section>
  `);
}

function deepfakeLegendItem(item) {
  const found = state.found.deepfake.has(item.id);
  return `
    <article class="legend-card ${found ? "is-found" : ""}">
      <header>
        <span class="legend-dot"></span>
        <strong>${item.label}</strong>
      </header>
      <p>${item.explain}</p>
    </article>
  `;
}

const rumorPresets = {
  low: {
    label: "低风险",
    share: 24,
    delay: 86,
    authority: 82,
    note: "低转发、快核验、澄清前置，传播链条会在早期收缩。",
  },
  medium: {
    label: "中风险",
    share: 62,
    delay: 44,
    authority: 35,
    note: "群聊转发开始超过核验速度，需要同步压低 β 并提高 γ/ψ。",
  },
  high: {
    label: "高风险",
    share: 94,
    delay: 8,
    authority: 5,
    note: "高转发、低核验、澄清滞后，I(t) 峰值会显著抬升。",
  },
};

function rumorScenario() {
  const personaId = state.persona || "all";
  const copy = {
    worker: {
      eyebrow: "EXP-03 · WORKSHOP SIR LAB",
      title: "工厂裁员谣言传播推演",
      lead:
        "模拟江淮某产业园班组群：一条“下月集中裁员”的截图被连续转发。用 β、γ、ψ 看转发冲动、核验速度和澄清触达如何改变峰值。",
      chips: ["班组群", "裁员谣言", "先核验再转发"],
      scene: "工友群里，未经证实的排班截图比正式通知更快扩散。",
    },
    elder: {
      eyebrow: "EXP-03 · COMMUNITY HEALTH SIR",
      title: "健康谣言扩散推演",
      lead:
        "模拟江淮某社区家庭群：一条“偏方能快速治病”的短视频被转发。看 Rₑ 何时大于 1，理解为什么慢一步转发也是科普行动。",
      chips: ["家庭群", "健康谣言", "等权威来源"],
      scene: "亲友转发看似善意，但缺少来源链时会抬高传播峰值。",
    },
    farmer: {
      eyebrow: "EXP-03 · TOWNSHIP SIR LAB",
      title: "农资补贴谣言传播推演",
      lead:
        "模拟江淮某乡镇合作群：一条“补贴名额最后一天确认”的消息被扩散。调节参数，观察核验和澄清如何压低 I(t)。",
      chips: ["乡镇群", "补贴谣言", "回官方入口"],
      scene: "补贴、农资、项目名额类消息要先回正式渠道核验。",
    },
    youth: {
      eyebrow: "EXP-03 · CAMPUS SIR LAB",
      title: "校园群聊谣言传播推演",
      lead:
        "模拟江淮某高校群聊：一条“AI 伪科普截图”被连续转发。用 S/I/R 曲线看转发前多核验一步如何降低峰值。",
      chips: ["校园群聊", "AI 伪科普", "来源链优先"],
      scene: "群聊里的截图越像科普，越需要追溯原始出处和权威解释。",
    },
    civil: {
      eyebrow: "EXP-03 · DUTY GROUP SIR LAB",
      title: "工作群误传风险推演",
      lead:
        "模拟江淮某工作群：一段未经核验的视频被当成紧急通知扩散。观察权威澄清触达率 ψ 如何改变 Rₑ。",
      chips: ["工作群", "伪通知误传", "来源链核验"],
      scene: "越像正式任务，越要核验发布链条，不能只看口吻。",
    },
    all: {
      eyebrow: "EXP-03 · JIANGHUAI SIR LAB",
      title: "谣言传播 SIR 模拟器",
      lead:
        "把公共传播场景翻译成 SIR 模型：S 是未接触或未相信的人，I 是正在传播的人，R 是停止传播或已澄清的人。",
      chips: ["江淮某地市", "三层传播网络", "Rₑ 实时读数"],
      scene: "城市、行业、社区三层节点共同决定一条谣言的传播峰值。",
    },
  };
  return copy[personaId] || copy.all;
}

function activeRumorPresetLabel() {
  return rumorPresets[state.rumor.preset]?.label || "自定义";
}

function rumorEquationHtml(data) {
  return `dS/dt = -βSI <span>dI/dt = βSI - γI · dR/dt = γI · Rₑ = β / (γ + ψ) = ${data.reproduction.toFixed(
    2
  )}</span>`;
}

function rumorPresetButtons() {
  return Object.entries(rumorPresets)
    .map(
      ([id, preset]) => `
        <button class="preset-button ${state.rumor.preset === id ? "is-active" : ""}" type="button" data-rumor-preset="${id}">
          <span>${preset.label}</span>
          <small>β${preset.share} · γ${preset.delay} · ψ${preset.authority}</small>
        </button>
      `
    )
    .join("");
}

function applyRumorPreset(presetId) {
  const preset = rumorPresets[presetId];
  if (!preset) return;
  state.rumor.share = preset.share;
  state.rumor.delay = preset.delay;
  state.rumor.authority = preset.authority;
  state.rumor.preset = presetId;
  addLog("SIR", `切换为${preset.label}预设。`);
  scheduleRumorViewUpdate();
}

function renderRumor() {
  const data = calcRumor();
  const scenario = rumorScenario();
  setScreen(`
    <section class="rumor-lab">
      <p class="eyebrow">${scenario.eyebrow}</p>
      <h2 class="section-title">${scenario.title}</h2>
      <p class="lead" data-persona-line>${scenario.lead}</p>
      <div class="rumor-brief">
        <div class="rumor-brief-copy">
          <span>当前剧本</span>
          <strong>${scenario.scene}</strong>
        </div>
        <div class="rumor-preset-readout">
          <span>预设</span>
          <strong id="presetMetric">${activeRumorPresetLabel()}</strong>
        </div>
      </div>
      <div class="equation-strip" id="equationStrip">${rumorEquationHtml(data)}</div>
      <div class="rumor-scenario-tags" id="rumorTags">${rumorTagsHtml(data)}</div>
      <div class="rumor-visual-grid">
        <div class="network-card sir-chart-card">
          <div class="panel-title-row">
            <span>S/I/R 时序曲线</span>
            <code>X(t/天) · Y(占比 %)</code>
          </div>
          <div id="rumorChart">${curveSvg(data)}</div>
          <div class="metric-grid">
            <div class="metric"><span>I 峰值占比</span><strong id="peakMetric">${data.peakInfected.toFixed(1)}%</strong></div>
            <div class="metric"><span>峰值出现步</span><strong id="peakStepMetric">t${data.peakStep}</strong></div>
            <div class="metric"><span>末态已止传播</span><strong id="removedMetric">${data.finalRemoved.toFixed(1)}%</strong></div>
            <div class="metric"><span>风险等级</span><strong id="riskMetric">${data.level}</strong></div>
          </div>
        </div>
        <aside class="network-card rumor-map-card">
          <div class="panel-title-row">
            <span>三层节点图</span>
            <code>省域 · 城市/行业 · 乡镇/群组</code>
          </div>
          <div id="rumorNetwork">${rumorClusterSvg(data)}</div>
        </aside>
        <aside class="chart-stage-card">
          <p class="side-label">传播态势</p>
          <h3 id="stageTitle">${data.stageTitle}</h3>
          <p class="stage-copy" id="stageCopy">${data.stageCopy}</p>
          <div class="network-stats">
            <div class="network-stat">
              <span>易感 S</span>
              <strong id="susceptibleMetric">${Math.round(data.currentS)}</strong>
              <small>/1000</small>
            </div>
            <div class="network-stat">
              <span>感染 I</span>
              <strong id="infectedMetric">${Math.round(data.currentI)}</strong>
              <small>/1000</small>
            </div>
            <div class="network-stat">
              <span>移出 R</span>
              <strong id="resolvedMetric">${Math.round(data.currentR)}</strong>
              <small>/1000</small>
            </div>
            <div class="network-stat">
              <span>即时 Rₑ</span>
              <strong id="reMetric">${data.reproduction.toFixed(2)}</strong>
              <small>${data.reproduction > 1 ? "扩散占优" : "澄清占优"}</small>
            </div>
          </div>
        </aside>
      </div>
      <div class="rumor-control-deck">
        <div class="preset-row" id="rumorPresetButtons">${rumorPresetButtons()}</div>
        <label class="city-toggle">
          <input id="cityModeToggle" type="checkbox" data-rumor-city ${state.rumor.cityMode ? "checked" : ""}>
          <span>江淮某地市仿真</span>
          <small>勾选后 16 个匿名地市节点亮起：A 市 / B 市 / ...</small>
        </label>
      </div>
      <div class="slider-group">
        ${sliderRow("share", "β 转发率", state.rumor.share)}
        ${sliderRow("delay", "γ 核验/停止传播率", state.rumor.delay)}
        ${sliderRow("authority", "ψ 权威澄清触达率", state.rumor.authority)}
      </div>
      <div class="explain-card" id="rumorExplain">
        <strong>${data.recommendationTitle}</strong>
        <p>${data.recommendation}</p>
      </div>
      <details class="model-card">
        <summary>查看模型说明</summary>
        <div class="model-body">
          <p><strong>使用模型：</strong>SIR 变体，参数映射为 β 转发率、γ 核验率、ψ 权威澄清触达率。</p>
          <p><code>dS/dt = -βSI</code></p>
          <p><code>dI/dt = βSI - γI</code></p>
          <p><code>dR/dt = γI</code></p>
          <p><code>Rₑ = β / (γ + ψ)</code>，其中 ψ 表示平台、社区或权威渠道的澄清触达强度。</p>
          <p>数值方法：Euler，<code>dt = 0.01</code>，迭代 320 步。它用于科普示意，不用于现实预测。</p>
        </div>
      </details>
      <button class="primary-button" type="button" data-complete="rumor">结束本实验</button>
    </section>
  `);
}

function sliderRow(id, label, value) {
  return `
    <div class="slider-row">
      <label for="${id}Range"><span class="equation-label">${label}</span><output id="${id}Output">${value}%</output></label>
      <div class="slider-shell" data-slider-shell="${id}">
        <div class="slider-rail" aria-hidden="true">
          <span class="slider-fill" id="${id}Fill" style="--slider-scale:${value / 100}"></span>
          <span class="slider-thumb" id="${id}Thumb" style="--slider-x:${value}%"></span>
        </div>
        <input id="${id}Range" class="slider-input" type="range" min="0" max="100" value="${value}" data-slider="${id}">
      </div>
      <div class="slider-scale">${sliderScale(id)}</div>
      <p class="slider-note">${sliderNote(id)}</p>
    </div>
  `;
}

function sliderScale(id) {
  const labels = {
    share: ["谨慎", "中等", "刷屏扩散"],
    delay: ["迟疑", "核验中", "快速止损"],
    authority: ["失联", "正在触达", "前置澄清"],
  };
  return labels[id].map((item) => `<span>${item}</span>`).join("");
}

function updateRumorView() {
  if (state.screen !== "rumor") return;
  const data = calcRumor();
  const equation = document.querySelector("#equationStrip");
  const tags = document.querySelector("#rumorTags");
  const chart = document.querySelector("#rumorChart");
  const network = document.querySelector("#rumorNetwork");
  const presetMetric = document.querySelector("#presetMetric");
  const presetButtons = document.querySelector("#rumorPresetButtons");
  const cityToggle = document.querySelector("#cityModeToggle");
  const peak = document.querySelector("#peakMetric");
  const peakStep = document.querySelector("#peakStepMetric");
  const removed = document.querySelector("#removedMetric");
  const risk = document.querySelector("#riskMetric");
  const explain = document.querySelector("#rumorExplain");
  const stageTitle = document.querySelector("#stageTitle");
  const stageCopy = document.querySelector("#stageCopy");
  const susceptible = document.querySelector("#susceptibleMetric");
  const infected = document.querySelector("#infectedMetric");
  const resolved = document.querySelector("#resolvedMetric");
  const reMetric = document.querySelector("#reMetric");
  const outputs = {
    share: document.querySelector("#shareOutput"),
    delay: document.querySelector("#delayOutput"),
    authority: document.querySelector("#authorityOutput"),
  };

  if (outputs.share) outputs.share.textContent = `${state.rumor.share}%`;
  if (outputs.delay) outputs.delay.textContent = `${state.rumor.delay}%`;
  if (outputs.authority) outputs.authority.textContent = `${state.rumor.authority}%`;
  updateRumorSliderShell("share");
  updateRumorSliderShell("delay");
  updateRumorSliderShell("authority");
  if (equation) {
    equation.innerHTML = rumorEquationHtml(data);
  }
  if (tags) tags.innerHTML = rumorTagsHtml(data);
  if (chart) chart.innerHTML = curveSvg(data);
  if (network) network.innerHTML = rumorClusterSvg(data);
  if (presetMetric) presetMetric.textContent = activeRumorPresetLabel();
  if (presetButtons) presetButtons.innerHTML = rumorPresetButtons();
  if (cityToggle) cityToggle.checked = state.rumor.cityMode;
  if (peak) peak.textContent = `${data.peakInfected.toFixed(1)}%`;
  if (peakStep) peakStep.textContent = `t${data.peakStep}`;
  if (removed) removed.textContent = `${data.finalRemoved.toFixed(1)}%`;
  if (risk) risk.textContent = data.level;
  if (stageTitle) stageTitle.textContent = data.stageTitle;
  if (stageCopy) stageCopy.textContent = data.stageCopy;
  if (susceptible) susceptible.textContent = `${Math.round(data.currentS)}`;
  if (infected) infected.textContent = `${Math.round(data.currentI)}`;
  if (resolved) resolved.textContent = `${Math.round(data.currentR)}`;
  if (reMetric) reMetric.textContent = data.reproduction.toFixed(2);
  if (explain) {
    explain.innerHTML = `<strong>${data.recommendationTitle}</strong><p>${data.recommendation}</p>`;
  }
}

function updateRumorSliderShell(id) {
  const fill = document.querySelector(`#${id}Fill`);
  const thumb = document.querySelector(`#${id}Thumb`);
  const input = document.querySelector(`#${id}Range`);
  const value = state.rumor[id];
  const scale = String(value / 100);
  if (fill) fill.style.setProperty("--slider-scale", scale);
  if (thumb) thumb.style.setProperty("--slider-x", `${value}%`);
  if (input && Number(input.value) !== value) input.value = String(value);
}

function rumorTagsHtml(data) {
  const scenario = rumorScenario();
  const chips = [
    {
      tone: "safe",
      label: scenario.chips[0],
    },
    {
      tone: state.rumor.cityMode ? "safe" : "neutral",
      label: state.rumor.cityMode ? "16 个匿名地市节点已亮起" : "未启用地市标签",
    },
    {
      tone: state.rumor.share > 68 ? "risk" : state.rumor.share < 40 ? "safe" : "neutral",
      label: state.rumor.share > 68 ? "高转发冲动" : state.rumor.share < 40 ? "用户转发谨慎" : "转发意愿中等",
    },
    {
      tone: state.rumor.delay > 65 ? "safe" : state.rumor.delay < 40 ? "warning" : "neutral",
      label: state.rumor.delay > 65 ? "核验速度较快" : state.rumor.delay < 40 ? "核验动作偏慢" : "核验速度中等",
    },
    {
      tone: state.rumor.authority > 60 ? "safe" : state.rumor.authority < 35 ? "warning" : "neutral",
      label:
        state.rumor.authority > 60 ? "权威澄清前置触达" : state.rumor.authority < 35 ? "澄清信息滞后" : "澄清触达一般",
    },
    {
      tone: data.reproduction > 1 ? "risk" : "safe",
      label: `即时 Rₑ = ${data.reproduction.toFixed(2)}`,
    },
    {
      tone: data.level === "高" ? "risk" : data.level === "中" ? "warning" : "safe",
      label: `${data.level}风险峰值`,
    },
  ];
  return chips.map((item) => `<span class="scenario-chip is-${item.tone}">${item.label}</span>`).join("");
}

function sliderNote(id) {
  const notes = {
    share: "转发率：节点之间继续扩散的概率",
    delay: "核验率：用户停止传播的速度",
    authority: "澄清触达率：权威信息追上的速度",
  };
  return notes[id];
}

function calcRumor() {
  const beta = mapRate(state.rumor.share, 0.08, 1.15);
  const gamma = mapRate(state.rumor.delay, 0.02, 0.78);
  const psi = mapRate(state.rumor.authority, 0.01, 0.72);

  let s = 0.98;
  let i = 0.02;
  let r = 0;
  const dt = 0.01;
  const steps = 320;
  const points = [];
  let peakInfected = i;
  let peakStep = 0;
  let catchUpStep = null;

  for (let step = 0; step <= steps; step += 1) {
    points.push({ step, s, i, r });
    if (i >= peakInfected) {
      peakInfected = i;
      peakStep = step;
    }

    if (catchUpStep === null && gamma + psi >= beta * 0.92 && i <= peakInfected * 0.9) {
      catchUpStep = step;
    }

    const ds = -beta * s * i;
    const di = beta * s * i - gamma * i - psi * i;
    const dr = (gamma + psi) * i;

    s = clamp01(s + ds * dt);
    i = clamp01(i + di * dt);
    r = clamp01(r + dr * dt);
  }

  const finalState = points[points.length - 1];
  const finalRemoved = finalState.r * 100;
  const currentS = finalState.s * 1000;
  const currentI = finalState.i * 1000;
  const currentR = finalState.r * 1000;
  const effectiveSpread = beta - (gamma + psi);
  const reproduction = beta / Math.max(0.08, gamma + psi);
  const peakPct = peakInfected * 100;
  const level =
    peakPct > 24 || reproduction > 2.2 || effectiveSpread > 0.42
      ? "高"
      : peakPct > 2.35 || reproduction > 1 || effectiveSpread > 0
      ? "中"
      : "低";
  const catchup =
    catchUpStep === null ? "较慢" : catchUpStep < 80 ? "较快" : catchUpStep < 140 ? "中等" : "偏慢";
  const stageTitle =
    reproduction > 1.25 || level === "高" ? "失控扩散区" : reproduction > 0.95 ? "拉锯压制区" : "澄清领先区";
  const stageCopy =
    stageTitle === "失控扩散区"
      ? `β 明显高于 γ+ψ，节点在高压转发下会快速串联。只要用户先转发再核验，澄清就会持续落后，当前追赶速度：${catchup}。`
      : stageTitle === "拉锯压制区"
      ? `γ 与 ψ 已开始追赶扩散，但峰值仍然不低。把“暂停转发”和“尽快核验”一起做，才能把峰值继续压低，当前追赶速度：${catchup}。`
      : `γ+ψ 已经领先于 β，传播链条更容易在早期收缩。公众多等一步核验，本身就是降低扩散的干预，当前追赶速度：${catchup}。`;
  const recommendationTitle =
    stageTitle === "失控扩散区" ? "压低曲线的做法" : stageTitle === "拉锯压制区" ? "继续压低峰值" : "维持低扩散状态";
  const recommendation =
    stageTitle === "失控扩散区"
      ? "优先把“先转发”改成“先核验”，同时提升权威澄清触达率。单靠一种干预通常不够，需要让 γ 与 ψ 一起追上 β。"
      : stageTitle === "拉锯压制区"
      ? "这时最有效的是继续降低转发冲动，并把核验动作前置。只要公众多停一步，峰值就有机会继续下压。"
      : "当前传播已经被明显约束，但仍要保持来源核验和延迟转发。好的信息习惯不是一次操作，而是长期稳定执行。";
  const presetNote = rumorPresets[state.rumor.preset]?.note || "当前为手动调参状态，用滑块观察 β、γ、ψ 对峰值和 Rₑ 的共同影响。";

  return {
    beta,
    gamma,
    psi,
    points,
    totalSteps: steps,
    peakInfected: peakPct,
    peakStep,
    finalRemoved,
    currentS,
    currentI,
    currentR,
    reproduction,
    level,
    stageTitle,
    stageCopy: `${stageCopy} ${presetNote}`,
    recommendationTitle,
    recommendation: `${recommendation} 当前 ${activeRumorPresetLabel()}：I 峰值 ${peakPct.toFixed(1)}%，Rₑ ${
      reproduction > 1 ? "大于" : "小于"
    } 1。`,
    messageTitle: stageTitle,
    message: stageCopy,
  };
}

function mapRate(value, min, max) {
  return min + ((max - min) * value) / 100;
}

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function curveSvg(data) {
  const width = 360;
  const height = 248;
  const chartX = 44;
  const chartY = 26;
  const chartW = 286;
  const chartH = 160;
  const bottomY = chartY + chartH;
  const sLine = pathForSeriesScaled(data.points, "s", 1, chartW, chartH, chartX, chartY, "#62d4f5");
  const iLine = pathForSeriesScaled(data.points, "i", 1, chartW, chartH, chartX, chartY, "#ff654f");
  const rLine = pathForSeriesScaled(data.points, "r", 1, chartW, chartH, chartX, chartY, "#6de6a6");
  const infectedArea = areaPathForSeriesScaled(data.points, "i", 1, chartW, chartH, chartX, chartY);
  const peakPoint = seriesPointScaled(data.points, data.peakStep, "i", 1, chartW, chartH, chartX, chartY);
  const finalPoint = seriesPointScaled(data.points, data.points.length - 1, "i", 1, chartW, chartH, chartX, chartY);
  const grid = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
    const y = chartY + chartH * ratio;
    return `<g>
      <line x1="${chartX}" y1="${y}" x2="${chartX + chartW}" y2="${y}" stroke="rgba(255,255,255,.1)" stroke-width="1"></line>
      <text x="${chartX - 10}" y="${y + 4}" text-anchor="end" fill="rgba(230,248,242,.58)" font-size="10">${Math.round(
        (1 - ratio) * 100
      )}%</text>
    </g>`;
  });
  const totalSteps = data.totalSteps || data.points.length - 1;
  const dayTicks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
    const step = Math.round(totalSteps * ratio);
    const x = chartX + chartW * ratio;
    return `<g>
      <line x1="${x}" y1="${chartY}" x2="${x}" y2="${bottomY}" stroke="rgba(255,255,255,.055)" stroke-width="1"></line>
      <text x="${x}" y="${bottomY + 17}" text-anchor="middle" fill="rgba(230,248,242,.54)" font-size="10">${step}</text>
    </g>`;
  });
  return `
    <svg class="sir-chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="SIR 传播曲线，X 轴为 t 天，Y 轴为占比百分比">
      <defs>
        <linearGradient id="infectedFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(255,101,79,.38)"/>
          <stop offset="100%" stop-color="rgba(255,101,79,0)"/>
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="${width - 16}" height="${height - 16}" rx="18" fill="rgba(5,9,14,.72)" stroke="rgba(255,255,255,.12)"/>
      <rect x="${chartX}" y="${chartY}" width="${chartW}" height="${chartH}" rx="12" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.12)"/>
      ${grid.join("")}
      ${dayTicks.join("")}
      <line x1="${chartX}" y1="${bottomY}" x2="${chartX + chartW}" y2="${bottomY}" stroke="rgba(230,248,242,.36)" stroke-width="1.5"/>
      <line x1="${chartX}" y1="${chartY}" x2="${chartX}" y2="${bottomY}" stroke="rgba(230,248,242,.36)" stroke-width="1.5"/>
      <text x="${chartX + chartW / 2}" y="${height - 13}" text-anchor="middle" fill="rgba(230,248,242,.62)" font-size="11">X(t/天)</text>
      <text x="16" y="${chartY + chartH / 2}" text-anchor="middle" fill="rgba(230,248,242,.62)" font-size="11" transform="rotate(-90 16 ${chartY + chartH / 2})">Y(占比 %)</text>
      <path d="${sLine.d}" fill="none" stroke="${sLine.color}" stroke-width="3" stroke-linecap="round"/>
      <path d="${infectedArea}" fill="url(#infectedFill)"></path>
      <path d="${iLine.d}" fill="none" stroke="${iLine.color}" stroke-width="4.6" stroke-linecap="round"/>
      <path d="${rLine.d}" fill="none" stroke="${rLine.color}" stroke-width="3.4" stroke-linecap="round"/>
      <circle cx="${peakPoint.x}" cy="${peakPoint.y}" r="5.8" fill="#ff654f" stroke="#fff" stroke-width="1.8"></circle>
      <circle cx="${finalPoint.x}" cy="${finalPoint.y}" r="4.4" fill="#ff654f" stroke="#fff" stroke-width="1.6"></circle>
      <text x="${Math.min(peakPoint.x + 10, chartX + chartW - 60)}" y="${Math.max(peakPoint.y - 10, chartY + 14)}" fill="#ffb4a6" font-size="11" font-weight="700">I 峰值 ${data.peakInfected.toFixed(
        1
      )}%</text>
      ${legendMark(58, 210, "#62d4f5", "S 易感")}
      ${legendMark(142, 210, "#ff654f", "I 传播中")}
      ${legendMark(244, 210, "#6de6a6", "R 已止传播")}
      <text x="${chartX + chartW - 2}" y="${chartY + 15}" text-anchor="end" fill="rgba(230,248,242,.68)" font-size="11">β=${data.beta.toFixed(
        2
      )} γ=${data.gamma.toFixed(2)} ψ=${data.psi.toFixed(2)}</text>
    </svg>
  `;
}

function pathForSeries(points, key, innerW, innerH, padX, padY, color) {
  const maxIndex = points.length - 1;
  const d = points
    .map((point, index) => {
      const x = padX + (innerW * index) / maxIndex;
      const y = padY + innerH - point[key] * innerH;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
  return { d, color };
}

function pathForSeriesScaled(points, key, scaleMax, innerW, innerH, padX, padY, color, floor = 0) {
  const maxIndex = points.length - 1;
  const d = points
    .map((point, index) => {
      const x = padX + (innerW * index) / maxIndex;
      const normalized = key === "s" && floor
        ? Math.max(0, Math.min(1, (point[key] - floor) / Math.max(0.001, 1 - floor)))
        : Math.max(0, Math.min(1, point[key] / Math.max(0.001, scaleMax)));
      const y = padY + innerH - normalized * innerH;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
  return { d, color };
}

function areaPathForSeries(points, key, innerW, innerH, padX, padY) {
  const maxIndex = points.length - 1;
  const upper = points
    .map((point, index) => {
      const x = padX + (innerW * index) / maxIndex;
      const y = padY + innerH - point[key] * innerH;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
  const baseEnd = `${(padX + innerW).toFixed(2)} ${(padY + innerH).toFixed(2)}`;
  const baseStart = `${padX.toFixed(2)} ${(padY + innerH).toFixed(2)}`;
  return `${upper} L${baseEnd} L${baseStart} Z`;
}

function areaPathForSeriesScaled(points, key, scaleMax, innerW, innerH, padX, padY) {
  const maxIndex = points.length - 1;
  const upper = points
    .map((point, index) => {
      const x = padX + (innerW * index) / maxIndex;
      const normalized = Math.max(0, Math.min(1, point[key] / Math.max(0.001, scaleMax)));
      const y = padY + innerH - normalized * innerH;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
  const baseEnd = `${(padX + innerW).toFixed(2)} ${(padY + innerH).toFixed(2)}`;
  const baseStart = `${padX.toFixed(2)} ${(padY + innerH).toFixed(2)}`;
  return `${upper} L${baseEnd} L${baseStart} Z`;
}

function seriesPoint(points, index, key, innerW, innerH, padX, padY) {
  const maxIndex = points.length - 1;
  const point = points[index];
  return {
    x: +(padX + (innerW * index) / maxIndex).toFixed(2),
    y: +(padY + innerH - point[key] * innerH).toFixed(2),
  };
}

function seriesPointScaled(points, index, key, scaleMax, innerW, innerH, padX, padY) {
  const maxIndex = points.length - 1;
  const point = points[index];
  const normalized = Math.max(0, Math.min(1, point[key] / Math.max(0.001, scaleMax)));
  return {
    x: +(padX + (innerW * index) / maxIndex).toFixed(2),
    y: +(padY + innerH - normalized * innerH).toFixed(2),
  };
}

function rumorClusterSvg(data) {
  const width = 360;
  const height = 248;
  const center = { x: 180, y: 120 };
  const middle = [
    { x: 180, y: 48, label: "行业层" },
    { x: 246, y: 84, label: "社区层" },
    { x: 246, y: 156, label: "群组层" },
    { x: 180, y: 196, label: "家庭层" },
    { x: 114, y: 156, label: "乡镇层" },
    { x: 114, y: 84, label: "校园层" },
  ];
  const cityLabels = "ABCDEFGHIJKLMNOP".split("").map((letter) => `${letter} 市`);
  const outer = cityLabels.map((label, index) => {
    const angle = -Math.PI / 2 + (index / cityLabels.length) * Math.PI * 2;
    return {
      x: +(center.x + Math.cos(angle) * 132).toFixed(1),
      y: +(center.y + Math.sin(angle) * 94).toFixed(1),
      label,
      anchor: middle[index % middle.length],
    };
  });
  const infectedCount = Math.min(
    outer.length,
    Math.max(1, Math.round((data.peakInfected / 100) * outer.length * 2.8 + Math.max(0, data.reproduction - 1)))
  );
  const resolvedCount = Math.min(outer.length - infectedCount, Math.round((data.finalRemoved / 100) * outer.length * 2.4));
  const middleLines = middle
    .map(
      (node) =>
        `<line x1="${center.x}" y1="${center.y}" x2="${node.x}" y2="${node.y}" stroke="rgba(109,230,166,.32)" stroke-width="1.4"></line>`
    )
    .join("");
  const outerLines = outer
    .map(
      (node, index) =>
        `<line x1="${node.anchor.x}" y1="${node.anchor.y}" x2="${node.x}" y2="${node.y}" stroke="${
          index < infectedCount ? "rgba(255,101,79,.44)" : "rgba(98,212,245,.16)"
        }" stroke-width="${index < infectedCount ? 1.5 : 1}"></line>`
    )
    .join("");
  const middleNodes = middle
    .map(
      (node) => `
        <g>
          <circle cx="${node.x}" cy="${node.y}" r="10" fill="rgba(98,212,245,.2)" stroke="rgba(98,212,245,.86)" stroke-width="1.6"></circle>
          <text x="${node.x}" y="${node.y - 15}" text-anchor="middle" fill="rgba(230,248,242,.68)" font-size="10">${node.label}</text>
        </g>
      `
    )
    .join("");
  const outerNodes = outer
    .map((node, index) => {
      const isInfected = index < infectedCount;
      const isResolved = !isInfected && index < infectedCount + resolvedCount;
      const fill = isInfected ? "#ff654f" : isResolved ? "#6de6a6" : "#263842";
      const stroke = isInfected ? "rgba(255,180,166,.92)" : isResolved ? "rgba(109,230,166,.88)" : "rgba(98,212,245,.36)";
      const labelVisible = state.rumor.cityMode;
      return `
        <g class="${labelVisible ? "city-label-on" : "city-label-off"}">
          <circle cx="${node.x}" cy="${node.y}" r="${isInfected ? 6.8 : 5.3}" fill="${fill}" stroke="${stroke}" stroke-width="1.4"></circle>
          ${
            labelVisible
              ? `<text x="${node.x}" y="${node.y - 9}" text-anchor="middle" fill="${
                  isInfected ? "#ffb4a6" : "rgba(230,248,242,.76)"
                }" font-size="9.5" font-weight="700">${node.label}</text>`
              : ""
          }
        </g>
      `;
    })
    .join("");

  return `
    <svg class="rumor-network-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="江淮抽象三层传播节点图，包含中心节点、城市行业节点和乡镇群组节点">
      <rect x="8" y="8" width="${width - 16}" height="${height - 16}" rx="18" fill="rgba(5,9,14,.66)" stroke="rgba(255,255,255,.12)"></rect>
      <path d="M118 62 C150 20 223 24 252 66 C300 82 309 156 262 187 C230 226 155 220 118 185 C74 164 76 94 118 62Z"
        fill="none" stroke="rgba(230,248,242,.05)" stroke-width="18" stroke-linejoin="round"></path>
      ${middleLines}
      ${outerLines}
      <circle cx="${center.x}" cy="${center.y}" r="23" fill="rgba(109,230,166,.16)" stroke="rgba(109,230,166,.92)" stroke-width="2.4"></circle>
      <circle cx="${center.x}" cy="${center.y}" r="8" fill="#6de6a6"></circle>
      <text x="${center.x}" y="${center.y + 39}" text-anchor="middle" fill="rgba(230,248,242,.78)" font-size="11" font-weight="700">省域抽象中心</text>
      ${middleNodes}
      ${outerNodes}
      <g transform="translate(22 202)">
        ${legendMark(0, 0, "#ff654f", "I 传播中")}
        ${legendMark(92, 0, "#6de6a6", "R 已止传播")}
        ${legendMark(205, 0, "#263842", "S 易感")}
      </g>
      <text x="22" y="226" fill="rgba(230,248,242,.56)" font-size="10">当前亮起 ${infectedCount}/${outer.length} 个扩散节点 · ${
    state.rumor.cityMode ? "16 个匿名地市标签已显示" : "地市标签未显示"
  }</text>
    </svg>
  `;
}

function legendMark(x, y, color, label) {
  return `
    <circle cx="${x}" cy="${y}" r="5" fill="${color}"></circle>
    <text x="${x + 10}" y="${y + 4}" fill="rgba(230,248,242,.66)" font-size="11">${label}</text>
  `;
}

function renderPrivacy() {
  const result = calcPrivacy();
  const scenario = privacyScenario();
  setScreen(`
    <section class="privacy-lab">
      <p class="eyebrow">${scenario.eyebrow}</p>
      <h2 class="section-title">${scenario.title}</h2>
      <p class="lead" data-persona-line>${scenario.lead}</p>
      <div class="privacy-scene-card">
        <div>
          <span>当前场景</span>
          <strong>${scenario.scene}</strong>
        </div>
        <p>${scenario.prompt}</p>
      </div>
      <div class="privacy-risk-strip" style="--risk:${result.riskScore}">
        <div class="privacy-risk-head">
          <span>实时风险条</span>
          <strong id="privacyRiskMetric">${result.riskScore}</strong>
        </div>
        <div class="privacy-risk-track" aria-hidden="true"><span style="width:${result.riskScore}%"></span></div>
        <div class="privacy-risk-scale"><span>低暴露</span><span>谨慎</span><span>高暴露</span></div>
      </div>
      <div class="privacy-summary">
        <div class="privacy-score-ring" style="--score:${result.score}">
          <div class="privacy-score-inner">
            <strong>${result.score}</strong>
            <span>最小必要分</span>
          </div>
        </div>
        <div class="privacy-summary-copy">
          <strong>${result.title}</strong>
          <p>${result.message}</p>
          <div class="privacy-chip-row">
            <span class="privacy-chip ${result.riskyCount ? "is-risk" : "is-safe"}">多余授权 ${result.riskyCount}</span>
            <span class="privacy-chip ${result.neededDeniedCount ? "is-warning" : "is-safe"}">必要权限缺失 ${result.neededDeniedCount}</span>
            <span class="privacy-chip is-neutral">当前已开 ${result.allowedCount}/4</span>
          </div>
        </div>
      </div>
      <div class="permission-phone">
        <div class="message-head"><span>${scenario.appName}</span><span>权限矩阵</span></div>
        <div class="permission-list">
          ${permissions.map((permission) => permissionRow(permission)).join("")}
        </div>
      </div>
      <div class="privacy-scorecard">
        <div class="scorecard-head">
          <span>最小必要原则评分卡</span>
          <strong>${result.grade}</strong>
        </div>
        <div class="scorecard-grid">
          <div><span>必要权限</span><strong>${result.neededAllowed}/${result.neededTotal}</strong></div>
          <div><span>多余暴露</span><strong>${result.riskyCount}</strong></div>
          <div><span>撤回建议</span><strong>${result.revokeList.length}</strong></div>
        </div>
        <p>${result.scorecard}</p>
      </div>
      <div class="explain-card">
        <strong>${result.title}</strong>
        <p>${result.message}</p>
      </div>
      <button class="primary-button" type="button" data-complete="privacy">结束本实验</button>
    </section>
  `);
}

function privacyScenario() {
  const personaId = state.persona || "all";
  const copy = {
    youth: {
      eyebrow: "EXP-04 · DORM PRIVACY MATRIX",
      title: "宿舍学习 App 权限判断",
      lead: "模拟江淮某高校宿舍夜间学习场景：一个学习助手同时请求定位、通讯录、相机和麦克风。判断哪些权限与当前功能直接相关。",
      scene: "宿舍学习 / 查课表 / 扫码取餐 / 选课系统",
      prompt: "当前任务是学习、课表与扫码取餐，不需要读取通讯录，也不需要常开麦克风。",
      appName: "模拟应用：宿舍学习助手",
    },
    elder: {
      eyebrow: "EXP-04 · FAMILY APP PERMISSION",
      title: "健康服务 App 权限判断",
      lead: "模拟家庭群推荐的健康服务 App。权限越多不代表越安全，先看当前功能是否真的需要。",
      scene: "健康资讯 / 扫码挂号 / 报告导出 / 家庭提醒",
      prompt: "健康资讯和报告导出通常不需要通讯录或麦克风；扫码时可临时允许相机。",
      appName: "模拟应用：健康服务助手",
    },
    all: {
      eyebrow: "EXP-04 · PRIVACY MINIMUM LAB",
      title: "隐私授权风险判断",
      lead: "判断模拟 App 权限是否必要。原则不是“全都拒绝”，而是“与当前功能直接相关才临时允许”。",
      scene: "学习任务 / 扫码资料 / 报告导出 / 账号设置",
      prompt: "把每个权限放回具体功能里判断：现在不用，就先不开；临时用完，就撤回。",
      appName: "模拟应用：安全训练营",
    },
  };
  return copy[personaId] || copy.all;
}

function permissionRow(permission) {
  const enabled = !!state.privacy[permission.id];
  const riskClass = enabled && !permission.needed ? "is-risk" : enabled ? "is-safe" : "is-neutral";
  return `
    <div class="permission-row ${riskClass}">
      <div class="permission-copy">
        <div class="permission-title-row">
          <h3>${permission.title}</h3>
          <span>${enabled ? "已开启" : "未开启"}</span>
        </div>
        <p>${permission.desc}</p>
        <div class="mini-matrix" aria-label="${permission.title} 必要性矩阵">
          ${permission.matrix
            .map((item) => `<span class="matrix-cell ${item.ok ? "is-useful" : "is-muted"}">${item.ok ? "✓" : "✗"} ${item.feature}</span>`)
            .join("")}
        </div>
        <em>${permission.safeAction}</em>
      </div>
      <label class="switch">
        <input type="checkbox" data-permission="${permission.id}" ${enabled ? "checked" : ""} aria-label="${permission.title}">
        <span aria-hidden="true"></span>
      </label>
    </div>
  `;
}

function calcPrivacy() {
  const risky = permissions.filter((permission) => !permission.needed && state.privacy[permission.id]);
  const neededDenied = permissions.filter((permission) => permission.needed && !state.privacy[permission.id]);
  const allowedCount = permissions.filter((permission) => state.privacy[permission.id]).length;
  const neededAllowed = permissions.filter((permission) => permission.needed && state.privacy[permission.id]).length;
  const neededTotal = permissions.filter((permission) => permission.needed).length;
  const riskScore = Math.min(
    100,
    Math.max(
      0,
      8 +
        risky.reduce((sum, permission) => sum + permission.riskWeight, 0) +
        neededDenied.length * 8 +
        Math.max(0, allowedCount - neededAllowed) * 6
    )
  );
  const revokeList = risky.map((permission) => permission.title);
  const base = {
    riskyCount: risky.length,
    neededDeniedCount: neededDenied.length,
    allowedCount,
    neededAllowed,
    neededTotal,
    riskScore,
    revokeList,
  };
  if (risky.length > 1) {
    return {
      ...base,
      score: 35,
      title: "授权过多",
      message: `${risky.map((item) => item.title).join("、")}不是当前答题训练的必要权限。请按最小必要原则关闭与功能无关的敏感权限。`,
      grade: "高暴露",
      scorecard: `建议立即撤回：${revokeList.join("、")}。当前功能不需要这些敏感权限。`,
    };
  }
  if (risky.length === 1) {
    return {
      ...base,
      score: 65,
      title: "仍有一个高风险授权",
      message: `${risky[0].risk} 权限判断要回到“现在这项功能是否真的需要”。`,
      grade: "需收紧",
      scorecard: `建议撤回：${risky[0].title}。保留必要权限时也要选择“仅本次允许”。`,
    };
  }
  if (neededDenied.length > 0) {
    return {
      ...base,
      score: 82,
      title: "保护意识较好",
      message: "你没有额外放开高风险权限。确实需要扫码时，可以临时允许相机，用完后再关闭。",
      grade: "低暴露",
      scorecard: "当前没有多余敏感授权。若现场需要扫码，再临时打开相机，完成后撤回。",
    };
  }
  return {
    ...base,
    score: 95,
    title: "接近最小必要授权",
    message: "只允许与当前功能直接相关的权限，是降低个人信息暴露面的有效习惯。",
    grade: "最小必要",
    scorecard: "只保留与当前功能直接相关的权限，符合个人信息处理应限于最小范围的原则。",
  };
}

function renderReport() {
  const scores = calcScores();
  const total = reportTotal(scores);
  const issuedAt = passportIssuedAt();
  const level = passportLevel(total);
  const serial = passportSerial(total);
  setScreen(`
    <section class="passport-screen">
      <p class="eyebrow">江淮防伪通行证</p>
      <h2 class="section-title">匿名实验室通行证</h2>
      <p class="lead">本通行证只基于本次互动状态生成，不采集真实个人数据，也不保存你的操作记录。</p>
      <div class="report-panel">
        <article class="passport-card" id="passportCard">
          <div class="passport-corners" aria-hidden="true"></div>
          <header class="passport-header">
            <div>
              <span class="passport-label">ANON PASS ID</span>
              <strong>${serial}</strong>
            </div>
            <span class="passport-stamp ${level.tone}">${level.label}</span>
          </header>
          <p class="passport-issuer">签发来源：${PASS_ISSUER}</p>
          <div class="passport-main">
            <div class="report-head">
              <span class="passport-label">江淮智辨 AI · 防伪实验室</span>
              <span class="score-big">${total}</span>
              <p>五维能力均按 100 分制折算，用于提示本次训练状态，不代表真实身份认证。</p>
            </div>
            <div class="radar-wrap passport-radar">
              ${radarSvg(scores)}
            </div>
          </div>
          <footer class="passport-footer">
            <span>完成时间 ${issuedAt}</span>
            <span>风险等级章戳 ${level.stamp}</span>
          </footer>
        </article>
        <div class="report-insight-row">
          ${reportHighlights(scores, total)}
        </div>
        <div class="passport-lower-grid">
          <div class="ability-list">
            ${abilityRow("来源核验", scores.source)}
            ${abilityRow("证据观察", scores.evidence)}
            ${abilityRow("传播抑制", scores.spread)}
            ${abilityRow("隐私保护", scores.privacy)}
            ${abilityRow("行动转化", scores.practice)}
          </div>
          <article class="passport-action-card">
            <h3>行动清单</h3>
            <ul class="action-list">
              <li>重要信息先看发布来源，不从陌生链接进入。</li>
              <li>看到 AI 画面或视频时，先找原始发布者和权威说明。</li>
              <li>未经核实的信息先暂停，不急着转发。</li>
              <li>App 权限按最小必要原则授权，用完及时撤回。</li>
            </ul>
          </article>
          <article class="passport-qr-card">
            <img src="./assets/generated/qr-shuangbai-h5.svg" alt="作品在线链接二维码">
            <div>
              <span class="passport-label">ONLINE LINK</span>
              <strong>扫码查看 H5</strong>
              <p>${ONLINE_URL}</p>
            </div>
          </article>
        </div>
        <div class="score-rule">
          <p>来源核验力 = 真风险点识别率 × 60 + 错点惩罚修正 × 40</p>
          <p>证据观察力 = 深伪热点识别率 × 70 + 来源链判断 × 30</p>
          <p>传播抑制力 = 100 - 感染峰值占比修正</p>
          <p>隐私保护力 = 最小必要授权达成度</p>
          <p>行动转化力 = 完成实验数 + 五类人群路线覆盖度</p>
        </div>
        <div class="button-row">
          <button class="secondary-button" type="button" data-nav="map">回到任务地图</button>
          <button class="secondary-button" type="button" data-nav="sources">查看引用来源</button>
          <button class="secondary-button" type="button" data-copy="online">以匿名身份分享</button>
          <button class="secondary-button" type="button" data-export="poster">保存为 JPG</button>
          <button class="primary-button" type="button" data-nav="about">查看作品说明</button>
        </div>
      </div>
    </section>
  `);
}

function calcScores() {
  const source = Math.min(100, 45 + state.found.phishing.size * 16 - state.missed.size * 4);
  const evidence = Math.min(100, 40 + state.found.deepfake.size * 15);
  const rumorData = calcRumor();
  const spread = Math.max(25, 100 - Math.round(rumorData.peakInfected * 1.5));
  const privacy = calcPrivacy().score;
  const practice = Math.min(100, 48 + state.completed.size * 10 + (state.persona === "all" ? 12 : 6));
  return { source, evidence, spread, privacy, practice };
}

function reportTotal(scores) {
  return Math.round((scores.source + scores.evidence + scores.spread + scores.privacy + scores.practice) / 5);
}

function passportLevel(total) {
  if (total >= 86) return { label: "稳定通行", stamp: "低风险", tone: "is-safe" };
  if (total >= 72) return { label: "复核通行", stamp: "中风险", tone: "is-neutral" };
  return { label: "继续训练", stamp: "需加练", tone: "is-warning" };
}

function passportSerial(total) {
  const date = new Date();
  const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(
    2,
    "0"
  )}`;
  const personaCode = selectedPersona().code.replace("P-", "G");
  return `JH-AI-${stamp}-${personaCode}-${String(total).padStart(3, "0")}`;
}

function passportIssuedAt() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(
    2,
    "0"
  )} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function reportHighlights(scores, total) {
  const entries = [
    { label: "来源核验", value: scores.source },
    { label: "证据观察", value: scores.evidence },
    { label: "传播抑制", value: scores.spread },
    { label: "隐私保护", value: scores.privacy },
    { label: "行动转化", value: scores.practice },
  ];
  const best = [...entries].sort((a, b) => b.value - a.value)[0];
  const weakest = [...entries].sort((a, b) => a.value - b.value)[0];
  const tone = total >= 86 ? "is-safe" : total >= 72 ? "is-neutral" : "is-warning";
  return `
    <article class="insight-pill ${tone}">
      <span>综合状态</span>
      <strong>${passportLevel(total).label}</strong>
    </article>
    <article class="insight-pill is-safe">
      <span>最佳维度</span>
      <strong>${best.label} ${best.value.toFixed(0)}</strong>
    </article>
    <article class="insight-pill is-warning">
      <span>待加强</span>
      <strong>${weakest.label} ${weakest.value.toFixed(0)}</strong>
    </article>
  `;
}

function abilityRow(label, value) {
  return `
    <div class="ability-row">
      <header><span>${label}</span><span>${value.toFixed(1)}</span></header>
      <div class="bar"><span style="width:${value}%"></span></div>
    </div>
  `;
}

function radarSvg(scores) {
  const cx = 150;
  const cy = 150;
  const radii = [22, 48, 74, 100];
  const labels = [
    { key: "source", label: "来源核验", angle: -90 },
    { key: "evidence", label: "证据观察", angle: -18 },
    { key: "spread", label: "传播抑制", angle: 54 },
    { key: "privacy", label: "隐私保护", angle: 126 },
    { key: "practice", label: "行动转化", angle: 198 },
  ];

  const rings = radii
    .map((radius) => polygonPoints(labels, radius, cx, cy))
    .map((points) => `<polygon points="${points}" fill="none" stroke="rgba(194,231,220,.24)" stroke-width="1"></polygon>`)
    .join("");

  const axes = labels
    .map((item) => {
      const pt = polarPoint(cx, cy, 100, item.angle);
      return `<line x1="${cx}" y1="${cy}" x2="${pt.x}" y2="${pt.y}" stroke="rgba(194,231,220,.28)" stroke-width="1"></line>`;
    })
    .join("");

  const scorePoints = labels
    .map((item) => {
      const radius = 100 * (scores[item.key] / 100);
      const pt = polarPoint(cx, cy, radius, item.angle);
      return `${pt.x},${pt.y}`;
    })
    .join(" ");

  const text = labels
    .map((item) => {
      const pt = polarPoint(cx, cy, 126, item.angle);
      return `<text x="${pt.x}" y="${pt.y}" text-anchor="middle" dominant-baseline="middle" fill="#b9ccc6" font-size="10" font-family="Cascadia Mono, monospace">${item.label}</text>`;
    })
    .join("");

  return `
    <svg viewBox="0 0 300 300" role="img" aria-label="五维能力雷达图">
      ${rings}
      ${axes}
      <polygon points="${scorePoints}" fill="rgba(48,214,171,.2)" stroke="#30d6ab" stroke-width="2"></polygon>
      ${text}
    </svg>
  `;
}

function polygonPoints(labels, radius, cx, cy) {
  return labels
    .map((item) => {
      const pt = polarPoint(cx, cy, radius, item.angle);
      return `${pt.x},${pt.y}`;
    })
    .join(" ");
}

function polarPoint(cx, cy, radius, angle) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: +(cx + radius * Math.cos(rad)).toFixed(2),
    y: +(cy + radius * Math.sin(rad)).toFixed(2),
  };
}

function renderSources() {
  setScreen(`
    <section>
      <p class="eyebrow">引用来源</p>
      <h2 class="section-title">本页列出 H5 内部用到的核心依据</h2>
      <p class="lead">本页统一使用“机构 / URL / 用途 / 访问日期”四段式，便于公开评审时直接追溯。</p>
      ${sourceItems
        .map(
          (item) => `
        <article class="source-card">
          <h3>${item.title}</h3>
          <p><strong>机构：</strong>${item.org}</p>
          <p><strong>URL：</strong>${item.url}</p>
          <p><strong>用途：</strong>${item.use}</p>
          <p><strong>访问日期：</strong>${item.visited}</p>
        </article>
      `
        )
        .join("")}
      <div class="button-row" style="margin-top:16px">
        <button class="secondary-button" type="button" data-nav="map">回到任务地图</button>
        <button class="secondary-button" type="button" data-nav="report">查看报告</button>
        <button class="primary-button" type="button" data-nav="about">关于作品</button>
      </div>
    </section>
  `);
}

function renderAbout() {
  setScreen(`
    <section>
      <p class="eyebrow">关于作品</p>
      <h2 class="section-title">为什么它是一个实验室，而不是网页 PPT</h2>
      <div class="source-card">
        <h3>作品结构</h3>
        <p>四个实验分别处理四类高频信息风险：钓鱼信息、深度伪造、谣言传播、隐私授权。每个实验都包含情境、操作、解释和行动建议。</p>
      </div>
      <div class="source-card">
        <h3>技术边界</h3>
        <p>作品使用纯静态 HTML、CSS、JavaScript 实现，不接入后端、不存储用户数据、不依赖外部 CDN，可提供在线链接与离线包。</p>
      </div>
      <div class="source-card">
        <h3>专业抓手</h3>
        <p>谣言模块采用 SIR 变体数值积分；深伪模块强调来源核验；隐私模块绑定最小必要原则；钓鱼模块绑定反诈与社工识别知识。</p>
      </div>
      <div class="button-row" style="margin-top:16px">
        <button class="secondary-button" type="button" data-nav="home">回到首页</button>
        <button class="secondary-button" type="button" data-nav="sources">查看来源</button>
        <button class="primary-button" type="button" data-nav="map">进入实验室</button>
      </div>
    </section>
  `);
}

function completeTask(id) {
  state.completed.add(id);
  addLog(`实验${tasks.findIndex((task) => task.id === id) + 1}`, `结束本实验，当前已完成 ${state.completed.size}/4。`);
  const index = tasks.findIndex((task) => task.id === id);
  const next = tasks[index + 1];
  render(next ? next.id : "report");
}

function addLog(label, text) {
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
    now.getSeconds()
  ).padStart(2, "0")}`;
  state.logEntries.unshift({ time, label, text });
}

function exportPoster() {
  const scores = calcScores();
  const qrImage = new Image();
  qrImage.onload = () => drawPassportPoster(scores, qrImage);
  qrImage.onerror = () => drawPassportPoster(scores);
  qrImage.src = "./assets/generated/qr-shuangbai-h5.svg";
}

function drawPassportPoster(scores, qrImage) {
  const total = reportTotal(scores);
  const level = passportLevel(total);
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#071016";
  ctx.fillRect(0, 0, 1080, 1080);
  ctx.fillStyle = "rgba(48,214,171,0.08)";
  for (let x = 0; x < 1080; x += 36) ctx.fillRect(x, 0, 1, 1080);
  for (let y = 0; y < 1080; y += 36) ctx.fillRect(0, y, 1080, 1);

  ctx.fillStyle = "#0d1b20";
  roundRect(ctx, 70, 70, 940, 700, 34);
  ctx.fill();
  ctx.strokeStyle = "rgba(48,214,171,0.42)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#d6fff1";
  ctx.font = "700 54px 'Microsoft YaHei', sans-serif";
  ctx.fillText("江淮智辨 AI · 防伪实验室", 112, 150);
  ctx.fillStyle = "#8aa89f";
  ctx.font = "400 25px 'Microsoft YaHei', sans-serif";
  ctx.fillText(PASS_ISSUER, 112, 198);

  ctx.fillStyle = "#30d6ab";
  ctx.font = "700 132px 'Cascadia Mono', monospace";
  ctx.fillText(String(total), 112, 360);
  ctx.fillStyle = "#d6fff1";
  ctx.font = "700 38px 'Microsoft YaHei', sans-serif";
  ctx.fillText(`匿名通行状态：${level.label}`, 112, 420);
  ctx.fillStyle = "#8aa89f";
  ctx.font = "400 25px 'Microsoft YaHei', sans-serif";
  ctx.fillText("五维能力：来源核验 / 证据观察 / 传播抑制 / 隐私保护 / 行动转化", 112, 466);
  ctx.fillText(`编号：${passportSerial(total)}    完成时间：${passportIssuedAt()}`, 112, 510);

  const rows = [
    ["来源核验", scores.source],
    ["证据观察", scores.evidence],
    ["传播抑制", scores.spread],
    ["隐私保护", scores.privacy],
    ["行动转化", scores.practice],
  ];
  rows.forEach((row, index) => {
    const y = 585 + index * 44;
    ctx.fillStyle = "#d6fff1";
    ctx.font = "600 25px 'Microsoft YaHei', sans-serif";
    ctx.fillText(row[0], 80, y);
    ctx.fillStyle = "rgba(214,255,241,0.12)";
    ctx.fillRect(230, y - 20, 560, 16);
    ctx.fillStyle = "#30d6ab";
    ctx.fillRect(230, y - 20, Math.round((560 * row[1]) / 100), 16);
    ctx.fillStyle = "#d6fff1";
    ctx.font = "600 24px 'Cascadia Mono', monospace";
    ctx.fillText(`${row[1].toFixed(1)}`, 830, y);
  });

  ctx.fillStyle = "#d6fff1";
  ctx.font = "700 30px 'Microsoft YaHei', sans-serif";
  ctx.fillText("行动口诀：看来源 / 找证据 / 慢转发 / 少授权", 92, 815);
  ctx.fillStyle = "#8aa89f";
  ctx.font = "400 23px 'Microsoft YaHei', sans-serif";
  ctx.fillText("本通行证仅基于本次互动生成，不采集真实个人数据。", 92, 860);

  ctx.fillStyle = "#d6fff1";
  ctx.fillRect(810, 785, 170, 170);
  if (qrImage) ctx.drawImage(qrImage, 822, 797, 146, 146);
  ctx.fillStyle = "#8aa89f";
  ctx.font = "400 20px 'Cascadia Mono', monospace";
  ctx.fillText(ONLINE_URL, 92, 930);

  const link = document.createElement("a");
  link.download = "江淮防伪通行证.jpg";
  link.href = canvas.toDataURL("image/jpeg", 0.92);
  link.click();
  addLog("通行证", "保存了江淮防伪通行证 JPG。");
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function copyPassportLink(button) {
  const markCopied = () => {
    button.textContent = "已复制链接";
    addLog("通行证", "复制了匿名分享链接。");
    window.setTimeout(() => {
      button.textContent = "以匿名身份分享";
    }, 1400);
  };
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(ONLINE_URL).then(markCopied).catch(() => fallbackCopy(markCopied));
    return;
  }
  fallbackCopy(markCopied);
}

function fallbackCopy(done) {
  const input = document.createElement("textarea");
  input.value = ONLINE_URL;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.left = "-999px";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
  done();
}

screen.addEventListener("click", (event) => {
  const personaButton = event.target.closest("[data-persona]");
  if (personaButton) {
    const personaId = personaButton.dataset.persona;
    state.persona = PERSONAS.some((persona) => persona.id === personaId) ? personaId : "all";
    try {
      sessionStorage.setItem(PERSONA_STORAGE_KEY, state.persona);
    } catch {
      // sessionStorage can be unavailable in hardened browsers; the in-memory state still works.
    }
    addLog("角色", `选择 ${selectedPersona().name} 路线。`);
    render("map");
    return;
  }

  const nav = event.target.closest("[data-nav]");
  if (nav) {
    addLog(
      "导航",
      `切换到${
        nav.dataset.nav === "map"
          ? "任务地图"
          : nav.dataset.nav === "persona"
          ? "角色选择"
          : nav.dataset.nav === "sources"
          ? "引用来源"
          : nav.dataset.nav === "about"
          ? "关于作品"
          : nav.dataset.nav === "home"
          ? "首页"
          : "目标页面"
      }。`
    );
    render(nav.dataset.nav);
    return;
  }

  const complete = event.target.closest("[data-complete]");
  if (complete) {
    completeTask(complete.dataset.complete);
    return;
  }

  const exportButton = event.target.closest("[data-export]");
  if (exportButton) {
    exportPoster();
    return;
  }

  const copyButton = event.target.closest("[data-copy]");
  if (copyButton) {
    copyPassportLink(copyButton);
    return;
  }

  const evidence = event.target.closest("[data-evidence]");
  if (evidence) {
    const [group, id] = evidence.dataset.evidence.split(":");
    handleEvidence(group, id);
    return;
  }

  const preset = event.target.closest("[data-rumor-preset]");
  if (preset) {
    applyRumorPreset(preset.dataset.rumorPreset);
  }
});

screen.addEventListener("input", (event) => {
  const slider = event.target.closest("[data-slider]");
  if (slider) {
    state.rumor[slider.dataset.slider] = Number(slider.value);
    state.rumor.preset = "custom";
    scheduleRumorViewUpdate();
    return;
  }

  const cityToggle = event.target.closest("[data-rumor-city]");
  if (cityToggle) {
    state.rumor.cityMode = cityToggle.checked;
    addLog("SIR", state.rumor.cityMode ? "开启江淮某地市仿真标签。" : "关闭江淮某地市仿真标签。");
    scheduleRumorViewUpdate();
    return;
  }

  const permission = event.target.closest("[data-permission]");
  if (permission) {
    state.privacy[permission.dataset.permission] = permission.checked;
    addLog("权限", `${permission.dataset.permission} 已${permission.checked ? "开启" : "关闭"}。`);
    renderPrivacy();
  }
});

screen.addEventListener("pointermove", (event) => {
  const stage = event.target.closest(".deepfake-stage");
  if (!stage) return;
  updateDeepfakeLens(stage, event.clientX, event.clientY);
});

screen.addEventListener(
  "touchmove",
  (event) => {
    const touch = event.touches[0];
    const stage = event.target.closest(".deepfake-stage");
    if (!touch || !stage) return;
    updateDeepfakeLens(stage, touch.clientX, touch.clientY);
  },
  { passive: true }
);

screen.addEventListener("change", (event) => {
  const slider = event.target.closest("[data-slider]");
  if (slider) {
    addLog("SIR", `更新 ${slider.dataset.slider} 参数为 ${slider.value}%。`);
  }
});

function updateDeepfakeLens(stage, clientX, clientY) {
  const rect = stage.getBoundingClientRect();
  const x = Math.max(8, Math.min(92, ((clientX - rect.left) / rect.width) * 100));
  const y = Math.max(10, Math.min(90, ((clientY - rect.top) / rect.height) * 100));
  state.deepfakeLens = { x: Math.round(x), y: Math.round(y) };
  stage.style.setProperty("--lens-x", `${state.deepfakeLens.x}%`);
  stage.style.setProperty("--lens-y", `${state.deepfakeLens.y}%`);
}

function handleEvidence(group, id) {
  if (group === "phishing") {
    const item = evidenceSets.phishing.find((entry) => entry.id === id);
    if (item.good) {
      state.found.phishing.add(id);
      state.missed.delete(id);
      addLog("实验1", `识别到风险线索：${item.label}。`);
    } else {
      state.missed.add(id);
      addLog("实验1", `误把“${item.label}”当成主风险点。`);
    }
    state.phishingPulse = true;
    renderPhishing();
    window.setTimeout(() => {
      if (state.screen === "phishing") {
        state.phishingPulse = false;
        renderPhishing();
      }
    }, 700);
    showExplain(item.label, item.explain);
    if (!item.good) {
      const btn = [...document.querySelectorAll(".evidence-button")].find((node) => node.textContent.includes(item.label));
      btn?.classList.add("shake");
    }
    return;
  }

  if (group === "deepfake") {
    const item = evidenceSets.deepfake.find((entry) => entry.id === id);
    state.found.deepfake.add(id);
    addLog("实验2", `标记深伪线索：${item.label}。`);
    renderDeepfake();
    showExplain(item.label, item.explain);
  }
}

function showExplain(title, text) {
  const explain = document.querySelector("#explain");
  if (!explain) return;
  explain.innerHTML = `<strong>${title}</strong><p>${text}</p>`;
}

render("home");
