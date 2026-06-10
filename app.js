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
    matrix: [
      { feature: "扫码入场", ok: false },
      { feature: "答题训练", ok: false },
      { feature: "附近场馆", ok: true },
      { feature: "报告导出", ok: false },
    ],
  },
  {
    id: "contacts",
    title: "通讯录",
    desc: "邀请好友时可能被请求",
    needed: false,
    risk: "通讯录属于敏感信息，科普答题不需要读取联系人。",
    matrix: [
      { feature: "扫码入场", ok: false },
      { feature: "答题训练", ok: false },
      { feature: "附近场馆", ok: false },
      { feature: "报告导出", ok: false },
    ],
  },
  {
    id: "camera",
    title: "相机",
    desc: "扫码查看资料时可按需打开",
    needed: true,
    risk: "如果确实需要扫码，可临时允许；使用后可以关闭。",
    matrix: [
      { feature: "扫码入场", ok: true },
      { feature: "答题训练", ok: false },
      { feature: "附近场馆", ok: false },
      { feature: "报告导出", ok: false },
    ],
  },
  {
    id: "microphone",
    title: "麦克风",
    desc: "本实验没有语音输入",
    needed: false,
    risk: "没有语音功能时请求麦克风，应拒绝或稍后再授权。",
    matrix: [
      { feature: "扫码入场", ok: false },
      { feature: "答题训练", ok: false },
      { feature: "附近场馆", ok: false },
      { feature: "报告导出", ok: false },
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

const state = {
  screen: "home",
  found: {
    phishing: new Set(),
    deepfake: new Set(),
  },
  missed: new Set(),
  rumor: {
    share: 62,
    delay: 55,
    authority: 44,
  },
  privacy: {},
  completed: new Set(),
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

mapButton.addEventListener("click", () => render("map"));
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
  progressBar.style.width = `${percent}%`;
  progressRing.style.background = `conic-gradient(var(--color-accent) ${
    percent * 3.6
  }deg, var(--color-surface-muted) 0deg)`;

  const current = tasks.find((task) => task.id === state.screen);
  const titles = {
    report: "识伪报告",
    sources: "引用来源",
    about: "关于作品",
    map: "任务地图",
    home: "准备进入",
  };
  stepTitle.textContent = current ? current.title : titles[state.screen] || "准备进入";
  stepOrder.textContent = current
    ? `实验 ${String(tasks.findIndex((task) => task.id === current.id) + 1).padStart(2, "0")} / 04`
    : "实验 00 / 04";

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

function renderHome() {
  setScreen(`
    <section class="hero">
      <div class="hero-mark">${icon("lab")}</div>
      <div>
        <p class="eyebrow">AI 时代的信息识别科普</p>
        <h2>智辨AI</h2>
      </div>
      <p class="lead">四个互动实验，带你用更稳妥的方式处理钓鱼信息、深度伪造、网络谣言和隐私授权。</p>
      <div class="tag-row" aria-label="能力标签">
        <span class="tag">看来源</span>
        <span class="tag">找证据</span>
        <span class="tag">慢转发</span>
        <span class="tag">少授权</span>
      </div>
      <div class="hero-note">
        <strong>30 秒内你会知道：</strong>
        <p>这不是网页 PPT，而是一间可操作的识伪实验室。每个实验都对应一条权威知识线索和一个可以复述的行动建议。</p>
      </div>
      <div class="button-row">
        <button class="primary-button" type="button" data-nav="map">进入实验室</button>
        <button class="secondary-button" type="button" data-nav="about">先看作品结构</button>
      </div>
    </section>
  `);
}

function renderMap() {
  setScreen(`
    <section>
      <p class="eyebrow">任务地图</p>
      <h2 class="section-title">完成四个实验，生成匿名识伪报告</h2>
      <p class="lead">每个实验都只有一个重点：先判断，再理解原因，最后带走可复用的行动建议。</p>
      <div class="task-grid task-flow">
        ${tasks
          .map(
            (task, index) => `
          <button class="task-card ${state.completed.has(task.id) ? "is-done" : ""}" type="button" data-nav="${task.id}">
            <span class="card-icon">${icon(task.icon)}</span>
            <span class="task-copy">
              <p class="task-index">实验 ${String(index + 1).padStart(2, "0")}</p>
              <h3>${task.title}</h3>
              <p>${task.short}</p>
            </span>
            <span class="done-mark">${state.completed.has(task.id) ? `${icon("check", "tiny-icon")} 已结束` : "→ 进入"}</span>
          </button>
        `
          )
          .join("")}
      </div>
      <div class="button-row" style="margin-top:16px">
        <button class="secondary-button" type="button" data-nav="sources">查看引用来源</button>
        <button class="secondary-button" type="button" data-nav="about">查看设计说明</button>
        <button class="primary-button" type="button" data-nav="report">生成当前报告</button>
      </div>
    </section>
  `);
}

function renderPhishing() {
  setScreen(`
    <section>
      <p class="eyebrow">实验一</p>
      <h2 class="section-title">钓鱼信息诊断</h2>
      <p class="lead">先找“来源链条”和“动作要求”。点击你认为真正危险的线索。</p>
      <div class="scenario">
        <div class="message-box">
          <div class="message-head"><span>模拟通知</span><span>09:42</span></div>
          <p class="message-text">您的校园账号存在异常，30 分钟内未验证将冻结。请打开 <strong>https://safe-check.example.cn/9x</strong> 并输入验证码完成保护。</p>
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

function renderDeepfake() {
  const foundCount = state.found.deepfake.size;
  setScreen(`
    <section>
      <p class="eyebrow">实验二</p>
      <h2 class="section-title">深度伪造线索观察</h2>
      <p class="lead">这是自制示意图，不是真实人脸。视觉异常只能提示风险，不能单独定真伪。</p>
      <div class="scenario">
        <div class="diagram" aria-label="深度伪造线索示意图">
          <img class="figure-image" src="./assets/illustrations/deepfake-figure.svg" alt="" aria-hidden="true">
          <div class="hotspot-counter">已识别 ${foundCount}/4</div>
          ${evidenceSets.deepfake
            .map(
              (item) => `
            <button class="hotspot ${state.found.deepfake.has(item.id) ? "is-found" : ""}" type="button" data-evidence="deepfake:${item.id}" data-id="${item.id}" aria-label="${item.label}">
              <span class="hotspot-core">!</span>
              <span class="hotspot-ripple" aria-hidden="true"></span>
            </button>
          `
            )
            .join("")}
        </div>
        <div id="explain" class="explain-card">
          <strong>提示</strong>
          <p>把注意力放回证据链。视觉线索只是开始，来源和上下文才是判断中心。</p>
        </div>
        <button class="primary-button" type="button" data-complete="deepfake">结束本实验</button>
      </div>
    </section>
  `);
}

function renderRumor() {
  const data = calcRumor();
  setScreen(`
    <section>
      <p class="eyebrow">实验三</p>
      <h2 class="section-title">谣言传播模拟器</h2>
      <p class="lead">这里不再用凑系数。我们把公众转发场景翻译成一个可交互的 SIR 传播模型。</p>
      <div class="equation-strip">dS/dt = -β·S·I <span>[β=${data.beta.toFixed(2)} S=${Math.round(
    data.currentS
  )} I=${Math.round(data.currentI)} R=${Math.round(data.currentR)}]</span></div>
      <div class="slider-group">
        ${sliderRow("share", "β 转发率", state.rumor.share)}
        ${sliderRow("delay", "γ 核验/停止传播率", state.rumor.delay)}
        ${sliderRow("authority", "ψ 权威澄清触达率", state.rumor.authority)}
      </div>
      <div class="network-card">
        ${curveSvg(data)}
        <div class="metric-grid">
          <div class="metric"><span>I 峰值占比</span><strong>${data.peakInfected.toFixed(1)}%</strong></div>
          <div class="metric"><span>末态已止传播</span><strong>${data.finalRemoved.toFixed(1)}%</strong></div>
          <div class="metric"><span>风险等级</span><strong>${data.level}</strong></div>
        </div>
      </div>
      <div class="explain-card">
        <strong>${data.messageTitle}</strong>
        <p>${data.message}</p>
      </div>
      <details class="model-card">
        <summary>查看模型说明</summary>
        <div class="model-body">
          <p><strong>使用模型：</strong>SIR 变体，参数映射为 β 转发率、γ 核验率、ψ 权威澄清触达率。</p>
          <p><code>dS/dt = -βSI</code></p>
          <p><code>dI/dt = βSI - γI - ψI</code></p>
          <p><code>dR/dt = (γ + ψ)I</code></p>
          <p>数值方法：Euler，<code>dt = 0.01</code>，迭代 200 步。它用于科普示意，不用于现实预测。</p>
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
      <input id="${id}Range" type="range" min="0" max="100" value="${value}" data-slider="${id}">
      <p class="slider-note">${sliderNote(id)}</p>
    </div>
  `;
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
  const steps = 200;
  const points = [];
  let peakInfected = i;
  let catchUpStep = null;

  for (let step = 0; step <= steps; step += 1) {
    points.push({ step, s, i, r });
    peakInfected = Math.max(peakInfected, i);

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
  const peakPct = peakInfected * 100;
  const level = peakPct > 34 || effectiveSpread > 0.18 ? "高" : peakPct > 18 || effectiveSpread > 0 ? "中" : "低";
  const messageTitle =
    level === "高" ? "扩散仍占上风" : level === "中" ? "澄清开始追赶" : "传播被明显压缩";
  const catchup =
    catchUpStep === null ? "较慢" : catchUpStep < 80 ? "较快" : catchUpStep < 140 ? "中等" : "偏慢";
  const message =
    level === "高"
      ? `当前 β 明显高于 γ+ψ，感染态会快速放大。只要用户转发快、核验慢，权威澄清就很难及时追上。当前澄清追赶速度：${catchup}。`
      : level === "中"
      ? `γ 与 ψ 已开始压制传播，但感染峰值仍不低。把“暂停转发”和“尽快核验”一起做，才能把曲线继续压下去。当前澄清追赶速度：${catchup}。`
      : `γ+ψ 已能明显压制 β，传播链条更容易在早期收缩。公众多等一步核验，本身就是降低扩散的干预。当前澄清追赶速度：${catchup}。`;

  return {
    beta,
    gamma,
    psi,
    points,
    peakInfected: peakPct,
    finalRemoved,
    currentS,
    currentI,
    currentR,
    level,
    messageTitle,
    message,
  };
}

function mapRate(value, min, max) {
  return min + ((max - min) * value) / 100;
}

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function curveSvg(data) {
  const width = 320;
  const height = 180;
  const padX = 12;
  const padY = 12;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const lines = [
    pathForSeries(data.points, "s", innerW, innerH, padX, padY, "var(--color-chart-s)"),
    pathForSeries(data.points, "i", innerW, innerH, padX, padY, "var(--color-chart-i)"),
    pathForSeries(data.points, "r", innerW, innerH, padX, padY, "var(--color-chart-r)"),
  ];

  const nodes = buildNetworkNodes(data.points);
  return `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="SIR 传播曲线示意">
      <rect x="${padX}" y="${padY}" width="${innerW}" height="${innerH}" rx="10" fill="rgba(255,255,255,0.75)" stroke="#d8e1dc"/>
      <line x1="${padX}" y1="${height - padY}" x2="${width - padX}" y2="${height - padY}" stroke="#d8e1dc"/>
      <line x1="${padX}" y1="${padY}" x2="${padX}" y2="${height - padY}" stroke="#d8e1dc"/>
      ${lines.map((line) => `<path d="${line.d}" fill="none" stroke="${line.color}" stroke-width="3" stroke-linecap="round"/>`).join("")}
      ${legendMark(22, 24, "var(--color-chart-s)", "S")}
      ${legendMark(84, 24, "var(--color-chart-i)", "I")}
      ${legendMark(146, 24, "var(--color-chart-r)", "R")}
      ${nodes}
    </svg>
  `;
}

function buildNetworkNodes(points) {
  const step = points[Math.min(points.length - 1, 160)];
  const infected = Math.max(2, Math.round(step.i * 12));
  const baseNodes = [
    [206, 24],
    [228, 40],
    [248, 62],
    [268, 84],
    [248, 110],
    [226, 132],
    [204, 150],
  ];
  return baseNodes
    .map((node, index) => {
      const active = index < infected;
      return `<circle cx="${node[0]}" cy="${node[1]}" r="${active ? 6 : 4}" fill="${
        active ? "#c84735" : "#d8e1dc"
      }"></circle>`;
    })
    .join("");
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

function legendMark(x, y, color, label) {
  return `
    <circle cx="${x}" cy="${y}" r="5" fill="${color}"></circle>
    <text x="${x + 10}" y="${y + 4}" fill="#5b6962" font-size="12">${label}</text>
  `;
}

function renderPrivacy() {
  const result = calcPrivacy();
  setScreen(`
    <section>
      <p class="eyebrow">实验四</p>
      <h2 class="section-title">隐私授权风险判断</h2>
      <p class="lead">判断模拟 App 权限是否必要。原则不是“全都拒绝”，而是“与当前功能直接相关才临时允许”。</p>
      <div class="permission-phone">
        <div class="message-head"><span>模拟应用：安全训练营</span><span>权限设置</span></div>
        <div class="permission-list">
          ${permissions
            .map(
              (permission) => `
            <div class="permission-row">
              <div class="permission-copy">
                <h3>${permission.title}</h3>
                <p>${permission.desc}</p>
                <div class="mini-matrix" aria-label="${permission.title} 必要性矩阵">
                  ${permission.matrix
                    .map(
                      (item) =>
                        `<span class="matrix-cell ${item.ok ? "is-useful" : "is-muted"}">${
                          item.ok ? "✓" : "✗"
                        } ${item.feature}</span>`
                    )
                    .join("")}
                </div>
              </div>
              <label class="switch">
                <input type="checkbox" data-permission="${permission.id}" ${
                state.privacy[permission.id] ? "checked" : ""
              } aria-label="${permission.title}">
                <span aria-hidden="true"></span>
              </label>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      <div class="explain-card">
        <strong>${result.title}</strong>
        <p>${result.message}</p>
      </div>
      <button class="primary-button" type="button" data-complete="privacy">结束本实验</button>
    </section>
  `);
}

function calcPrivacy() {
  const risky = permissions.filter((permission) => !permission.needed && state.privacy[permission.id]);
  const neededDenied = permissions.filter((permission) => permission.needed && !state.privacy[permission.id]);
  if (risky.length > 1) {
    return {
      score: 35,
      title: "授权过多",
      message: `${risky.map((item) => item.title).join("、")}不是当前答题训练的必要权限。请按最小必要原则关闭与功能无关的敏感权限。`,
    };
  }
  if (risky.length === 1) {
    return {
      score: 65,
      title: "仍有一个高风险授权",
      message: `${risky[0].risk} 权限判断要回到“现在这项功能是否真的需要”。`,
    };
  }
  if (neededDenied.length > 0) {
    return {
      score: 82,
      title: "保护意识较好",
      message: "你没有额外放开高风险权限。确实需要扫码时，可以临时允许相机，用完后再关闭。",
    };
  }
  return {
    score: 95,
    title: "接近最小必要授权",
    message: "只允许与当前功能直接相关的权限，是降低个人信息暴露面的有效习惯。",
  };
}

function renderReport() {
  const scores = calcScores();
  const total = Math.round((scores.source + scores.evidence + scores.spread + scores.privacy) / 4);
  setScreen(`
    <section>
      <p class="eyebrow">结尾报告</p>
      <h2 class="section-title">你的识伪能力报告</h2>
      <div class="report-panel">
        <div class="report-head">
          <span class="score-big">${total}</span>
          <p class="lead">本报告只基于本次互动状态生成，不采集真实个人数据，也不保存你的操作记录。</p>
        </div>
        <div class="radar-wrap">
          ${radarSvg(scores)}
        </div>
        <div class="ability-list">
          ${abilityRow("来源核验", scores.source)}
          ${abilityRow("证据观察", scores.evidence)}
          ${abilityRow("传播抑制", scores.spread)}
          ${abilityRow("隐私保护", scores.privacy)}
        </div>
        <div>
          <h3>行动清单</h3>
          <ul class="action-list">
            <li>重要信息先看发布来源，不从陌生链接进入。</li>
            <li>看到 AI 画面或视频时，先找原始发布者和权威说明。</li>
            <li>未经核实的信息先暂停，不急着转发。</li>
            <li>App 权限按最小必要原则授权，用完及时撤回。</li>
          </ul>
        </div>
        <div class="score-rule">
          <p>来源核验力 = 真风险点识别率 × 60 + 错点惩罚修正 × 40</p>
          <p>证据观察力 = 深伪热点识别率 × 70 + 来源链判断 × 30</p>
          <p>传播抑制力 = 100 - 感染峰值占比修正</p>
          <p>隐私保护力 = 最小必要授权达成度</p>
        </div>
        <div class="button-row">
          <button class="secondary-button" type="button" data-nav="map">回到任务地图</button>
          <button class="secondary-button" type="button" data-nav="sources">查看引用来源</button>
          <button class="secondary-button" type="button" data-export="poster">导出识伪报告</button>
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
  return { source, evidence, spread, privacy };
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
  const radii = [22, 50, 78, 108];
  const labels = [
    { key: "source", label: "来源核验", angle: -90 },
    { key: "evidence", label: "证据观察", angle: 0 },
    { key: "spread", label: "传播抑制", angle: 90 },
    { key: "privacy", label: "隐私保护", angle: 180 },
  ];

  const rings = radii
    .map((radius) => polygonPoints(labels, radius, cx, cy))
    .map((points) => `<polygon points="${points}" fill="none" stroke="#d8e1dc" stroke-width="2"></polygon>`)
    .join("");

  const axes = labels
    .map((item) => {
      const pt = polarPoint(cx, cy, 108, item.angle);
      return `<line x1="${cx}" y1="${cy}" x2="${pt.x}" y2="${pt.y}" stroke="#d8e1dc" stroke-width="2"></line>`;
    })
    .join("");

  const scorePoints = labels
    .map((item) => {
      const radius = 108 * (scores[item.key] / 100);
      const pt = polarPoint(cx, cy, radius, item.angle);
      return `${pt.x},${pt.y}`;
    })
    .join(" ");

  const text = labels
    .map((item) => {
      const pt = polarPoint(cx, cy, 132, item.angle);
      return `<text x="${pt.x}" y="${pt.y}" text-anchor="middle" dominant-baseline="middle" fill="#5b6962" font-size="12">${item.label}</text>`;
    })
    .join("");

  return `
    <svg viewBox="0 0 300 300" role="img" aria-label="四维能力雷达图">
      ${rings}
      ${axes}
      <polygon points="${scorePoints}" fill="rgba(15,143,118,.2)" stroke="#08705c" stroke-width="3"></polygon>
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
  const total = Math.round((scores.source + scores.evidence + scores.spread + scores.privacy) / 4);
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#f6f8f7";
  ctx.fillRect(0, 0, 1080, 1080);

  ctx.fillStyle = "#17211d";
  ctx.font = "700 62px 'Microsoft YaHei', sans-serif";
  ctx.fillText("智辨AI", 80, 130);
  ctx.fillStyle = "#5b6962";
  ctx.font = "400 30px 'Microsoft YaHei', sans-serif";
  ctx.fillText("科创兴皖，科普育人", 80, 185);

  ctx.fillStyle = "#0f8f76";
  ctx.fillRect(80, 230, 920, 280);
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 46px 'Cascadia Mono', monospace";
  ctx.fillText("识伪能力报告", 120, 310);
  ctx.font = "700 140px 'Cascadia Mono', monospace";
  ctx.fillText(String(total), 120, 435);
  ctx.font = "400 28px 'Microsoft YaHei', sans-serif";
  ctx.fillText("总分基于来源核验、证据观察、传播抑制、隐私保护四项能力生成", 120, 480);

  const rows = [
    ["来源核验", scores.source],
    ["证据观察", scores.evidence],
    ["传播抑制", scores.spread],
    ["隐私保护", scores.privacy],
  ];
  ctx.fillStyle = "#17211d";
  ctx.font = "600 34px 'Microsoft YaHei', sans-serif";
  rows.forEach((row, index) => {
    const y = 610 + index * 84;
    ctx.fillText(row[0], 80, y);
    ctx.fillStyle = "#edf2ef";
    ctx.fillRect(280, y - 24, 560, 26);
    ctx.fillStyle = "#0f8f76";
    ctx.fillRect(280, y - 24, Math.round((560 * row[1]) / 100), 26);
    ctx.fillStyle = "#17211d";
    ctx.font = "600 30px 'Cascadia Mono', monospace";
    ctx.fillText(`${row[1].toFixed(1)}`, 880, y);
    ctx.font = "600 34px 'Microsoft YaHei', sans-serif";
  });

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(80, 900, 920, 120);
  ctx.strokeStyle = "#d8e1dc";
  ctx.strokeRect(80, 900, 920, 120);
  ctx.fillStyle = "#17211d";
  ctx.font = "700 28px 'Microsoft YaHei', sans-serif";
  ctx.fillText("行动口诀：看来源 / 找证据 / 慢转发 / 少授权", 120, 952);
  ctx.fillStyle = "#5b6962";
  ctx.font = "400 24px 'Microsoft YaHei', sans-serif";
  ctx.fillText("本报告仅基于本次互动生成，不采集真实个人数据。", 120, 993);

  const link = document.createElement("a");
  link.download = "识伪能力报告海报.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
  addLog("报告", "导出了识伪能力海报。");
}

screen.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-nav]");
  if (nav) {
    addLog(
      "导航",
      `切换到${
        nav.dataset.nav === "map"
          ? "任务地图"
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

  const evidence = event.target.closest("[data-evidence]");
  if (evidence) {
    const [group, id] = evidence.dataset.evidence.split(":");
    handleEvidence(group, id);
  }
});

screen.addEventListener("input", (event) => {
  const slider = event.target.closest("[data-slider]");
  if (slider) {
    state.rumor[slider.dataset.slider] = Number(slider.value);
    addLog("SIR", `更新 ${slider.dataset.slider} 参数为 ${slider.value}%。`);
    renderRumor();
    return;
  }

  const permission = event.target.closest("[data-permission]");
  if (permission) {
    state.privacy[permission.dataset.permission] = permission.checked;
    addLog("权限", `${permission.dataset.permission} 已${permission.checked ? "开启" : "关闭"}。`);
    renderPrivacy();
  }
});

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
    renderPhishing();
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
