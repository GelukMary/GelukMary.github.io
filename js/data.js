window.siteContent = {
  hero: {
    name: "王曼鹂",
    greeting: "你好，我是王曼鹂",
    summary: "C 端产品经理，做出海订阅产品。",
    belief: "相信产品的价值最终由多少人愿意用、多少人愿意付钱决定。",
    email: "2219188969@qq.com",
    wechat: "TODO",
    github: "https://github.com/GelukMary",
    photo: "assets/hero-photo.jpg"
  },
  about: {
    paragraphs: [
      "软件工程专业在读（电子科技大学，2027 届）。2026 年在万兴科技做出海 C 端付费工具产品，以产品净利润为 OKR：做过定价默认项 AB 实验、AI 功能商业化选型与收入异常归因。",
      "比起罗列做过什么，我更在意一个判断能不能被拆成可验证的动作：指标是什么、口径是什么、实验怎么设计、什么结果算成立。"
    ],
    placeholder: "校园与实践经历（实践队队长、学生会分管主席、资助宣传大使等）正在整理，后续补充。"
  },
  education: {
    school: "电子科技大学",
    degree: "软件工程（985 · 国家示范性软件学院）· GPA 3.73/4.0 · 2023.09 — 2027.06",
    honors: "标兵奖学金（2025）· 年度社会实践优秀个人（2024）· 挑战杯校赛银奖 · RAICOM 四川赛区二等奖"
  },
  experiences: [
    {
      date: "2026.03 — 2026.07",
      company: "万兴科技集团",
      role: "产品经理（出海 C 端付费工具 App）",
      summary: "面向海外用户的订阅制工具产品，以产品净利润增长为 OKR，4 个月落地 9 个非问题修复类版本。",
      points: [
        "定价与订阅优化：广告缩量导致销售额下滑时，拆 SKU 新单/续费数据并结合 LTV 设计定价默认项 AB 实验；上线 10 日付费完成率较对照组 +15.06%，会话价值持平后全量。",
        "AI 功能商业化：从模型效果、性能、定价、成本四维完成算子选型，协调中台与算法上线，功能触达率提升的同时转化仍 +8.4%。",
        "收入异常归因：用近 1/6/12 个月销售数据定位年单续费回滚原因，区分投放扰动与产品问题。"
      ]
    }
  ],
  projects: [
    { title: "端内订阅商业化 AB Test Lab", description: "双组数据录入、完整订阅漏斗、以会话价值为主的全量判定工具。", url: "lab/index.html" },
    { title: "Agent Skill 手册", description: "6 个自用 Agent Skill，把重复的产品思考沉淀成 AI 能执行的流程。", url: "https://github.com/GelukMary/wangmanli-skills" }
  ],
  thoughts: [
    { date: "2026.05.03", title: "商业化思考：端内转化和端外转化分开看", text: "端内转化和端外转化是两套链路，先把各自的指标、负责人和可干预动作梳理出来，再谈怎么一起优化。" },
    { date: "2026.04.07", title: "AI 工具升级版本拖太久", text: "中台开发完之后要及时让开发验证，避免反复扯皮拖时间；版本节奏本身就是产品体验的一部分。" },
    { date: "2026.04.02", title: "弹窗触发时机：放在用户爽感最强的位置", text: "评价弹窗原先想放在完整用户路径的最后一步（查看相册），后来放在恢复完成界面（上一步）——越往后流失越多，前置路径流量更大，也更接近用户的爽感峰值。" },
    { date: "2026.04.02", title: "工具类产品的授权出现时机", text: "授权请求越早，打断体验的代价越大；越往后，覆盖的流量越少。需要在爽感峰值和路径流量之间找平衡点，而不是默认在启动时弹。" }
  ],
  elsewhere: [
    { title: "GitHub", description: "代码与项目", url: "https://github.com/GelukMary" },
    { title: "Skill 仓库", description: "个人 Agent Skill 手册", url: "https://github.com/GelukMary/wangmanli-skills" },
    { title: "邮箱", description: "2219188969@qq.com", url: "mailto:2219188969@qq.com" }
  ],
  footer: { slogan: "把判断变成可验证的动作。" }
};
