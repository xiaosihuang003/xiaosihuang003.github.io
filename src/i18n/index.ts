// src/i18n/index.ts
export const languages = ['en', 'fi', 'no', 'sv', 'zh', 'yue'] as const;
export type Lang = typeof languages[number];

export function normalizeLang(input?: string): Lang {
  const v = (input || 'en').toLowerCase();
  return (languages as readonly string[]).includes(v) ? (v as Lang) : 'en';
}

export const langMeta: Record<Lang, { flag: string; label: string; badge: string }> = {
  en:  { flag: '🇬🇧', label: 'English',   badge: 'EN'  },
  fi:  { flag: '🇫🇮', label: 'Suomi',     badge: 'FI'  },
  no:  { flag: '🇳🇴', label: 'Norsk',     badge: 'NO'  },
  sv:  { flag: '🇸🇪', label: 'Svenska',   badge: 'SV'  },
  zh:  { flag: '🇨🇳', label: 'Chinese',   badge: 'ZH'  },
  yue: { flag: '🇨🇳', label: 'Cantonese', badge: '粤'  },
};

export const hreflangMap = {
  en: 'en', fi: 'fi', no: 'no', sv: 'sv', zh: 'zh-Hans', yue: 'yue-Hant',
} as const;
export const htmlLangMap = hreflangMap;

type Card = { title: string; desc: string };
type Copy = {
  nav: { home: string; projects: string; blog: string; about: string; docs: string };
  ui: {
    backToBlog: string;
    backToProjects: string;
    backToDocs: string;
    breadcrumbs: { home: string; blog: string };
    tags: {
      placeholder: string;
      clear: string;
      ariaFilterByTags: string;
      result: string;
      results: string;
      noResults: string;
    };
  };
  home: {
    line1: string; line2: string;
    lead1?: string; lead2?: string;
    btnProjects: string; btnAbout: string;
    cards: Card[];
  };
  blog: { title: string; subtitle: string; empty: string };
  projects: { title: string; subtitle: string };
  docs: { title: string; subtitle: string; empty: string };
  about: {
    title: string;
    subtitle: string;
    links: string;
    education: string;
    languages: string;
    countriesVisited: string;
    speak: string;
    studied: string;
    hobbies: string;
    hobbyList: string[];
    fourSeasonsTitle: string;
    fourSeasonsSubtitle: string;
    goodAtTitle: string;
    seasons: { spring: string; summer: string; autumn: string; winter: string };
  };
};

export const dict: Record<Lang, Copy> = {
  en: {
    nav: { home: 'Home', projects: 'Projects', blog: 'Blog', about: 'About me', docs: 'Docs' },
    ui: {
      backToBlog: 'Back to Blog',
      backToProjects: 'Back to Projects',
      backToDocs: 'Back to Docs',
      breadcrumbs: { home: 'Home', blog: 'Blog' },
      tags: {
        placeholder: 'Filter tags…',
        clear: 'Clear selection',
        ariaFilterByTags: 'Filter posts by tags',
        result: 'result',
        results: 'results',
        noResults: 'No results',
      },
    },
    home: {
      line1: 'Tell stories with data,',
      line2: 'turn insights into impact',
      lead1: 'Focused on Data visualization, dashboard design, and business analytics.',
      lead2: 'Here are my selected projects, methods, and notes.',
      btnProjects: 'View Projects', btnAbout: 'About Me',
      cards: [
        { title: 'Dashboards', desc: 'Growth, operations, and marketing KPIs' },
        { title: 'Data Storytelling', desc: 'From KPIs to narratives that drive decisions' },
        { title: 'Methods & Reviews', desc: 'Structured thinking templates and best practices' },
      ],
    },
    blog: { title: 'Blog', subtitle: 'Notes on methods, reviews and practice.', empty: 'No posts yet.' },
    projects: { title: 'Projects', subtitle: 'Selected visualization & analytics work.' },
    docs: { title: 'Docs', subtitle: 'Technical notes and how-to commands.', empty: 'No docs yet.' },
    about: {
      title: 'About me',
      subtitle: 'Hi, I am Xiaosi.',
      links: 'Links',
      education: 'Education',
      languages: 'Languages',
      countriesVisited: 'Countries visited',
      speak: 'I speak',
      studied: 'I have learned',
      hobbies: 'Hobbies',
      hobbyList: ['🎹 Piano', '🎵 Kalimba', '🎬 Video Editing', '✈️ Travel'],
      fourSeasonsTitle: 'Four Seasons',
      fourSeasonsSubtitle: "A tiny photo diary, four seasons each year. I'll keep it updated.",
      goodAtTitle: 'What I am good at?',
      seasons: { spring: 'Spring', summer: 'Summer', autumn: 'Autumn', winter: 'Winter' },
    },
  },

  fi: {
    nav: { home: 'Koti', projects: 'Projektit', blog: 'Blogi', about: 'Tietoa minusta', docs: 'Dokumentit' },
    ui: {
      backToBlog: 'Takaisin blogiin',
      backToProjects: 'Takaisin projekteihin',
      backToDocs: 'Takaisin dokumentteihin',
      breadcrumbs: { home: 'Koti', blog: 'Blogi' },
      tags: {
        placeholder: 'Suodata tunnisteita…',
        clear: 'Tyhjennä valinta',
        ariaFilterByTags: 'Suodata julkaisuja tunnisteilla',
        result: 'tulos',
        results: 'tulosta',
        noResults: 'Ei tuloksia',
      },
    },
    home: {
      line1: 'Kerro tarinoita datalla,',
      line2: 'muuta oivallukset vaikutukseksi',
      lead1: 'Keskittyy Data-visualisointeihin, kojelautojen suunnitteluun ja liiketoiminta-analytiikkaan.',
      lead2: 'Täältä löytyvät valikoidut projektit, menetelmät ja muistiinpanot.',
      btnProjects: 'Katso projektit', btnAbout: 'Tietoa minusta',
      cards: [
        { title: 'Kojelaudat', desc: 'Kasvun, operaatioiden ja markkinoinnin KPI:t' },
        { title: 'Datan tarinankerronta', desc: 'KPI:stä kertomuksiin, jotka ohjaavat päätöksiä' },
        { title: 'Menetelmät ja katsaukset', desc: 'Jäsennellyt ajattelumallit ja parhaat käytännöt' },
      ],
    },
    blog: { title: 'Blogi', subtitle: 'Muistiinpanoja menetelmistä, katsauksista ja käytännöistä.', empty: 'Ei vielä artikkeleita.' },
    projects: { title: 'Projektit', subtitle: 'Valikoidut visualisointi- ja analyysityöt.' },
    docs: { title: 'Dokumentit', subtitle: 'Tekniset muistiinpanot ja komennot.', empty: 'Ei vielä dokumentteja.' },
    about: {
      title: 'Tietoa minusta',
      subtitle: 'Hei, olen Xiaosi.',
      links: 'Linkit',
      education: 'Koulutus',
      languages: 'Kielet',
      countriesVisited: 'Käydyt maat',
      speak: 'Puhun',
      studied: 'Olen oppinut',
      hobbies: 'Harrastukset',
      hobbyList: ['🎹 Piano', '🎵 Kalimba', '🎬 Videoeditointi', '✈️ Matkustaminen'],
      fourSeasonsTitle: 'Neljä vuodenaikaa',
      fourSeasonsSubtitle: 'Pieni kuvapäiväkirja, neljä vuodenaikaa vuodessa. Päivitän sitä.',
      goodAtTitle: 'Missä olen hyvä?',
      seasons: { spring: 'Kevät', summer: 'Kesä', autumn: 'Syksy', winter: 'Talvi' },
    },
  },

  no: {
    nav: { home: 'Hjem', projects: 'Prosjekter', blog: 'Blogg', about: 'Om meg', docs: 'Dokumenter' },
    ui: {
      backToBlog: 'Tilbake til blogg',
      backToProjects: 'Tilbake til prosjekter',
      backToDocs: 'Tilbake til dokumenter',
      breadcrumbs: { home: 'Hjem', blog: 'Blogg' },
      tags: {
        placeholder: 'Filtrer tagger…',
        clear: 'Tøm valg',
        ariaFilterByTags: 'Filtrer innlegg etter tagger',
        result: 'resultat',
        results: 'resultater',
        noResults: 'Ingen resultater',
      },
    },
    home: {
      line1: 'Fortell historier med data,',
      line2: 'gjør innsikt om til effekt',
      lead1: 'Fokus på Data-visualisering, dashboards og forretningsanalyse.',
      lead2: 'Her finner du utvalgte prosjekter, metoder og notater.',
      btnProjects: 'Se prosjekter', btnAbout: 'Om meg',
      cards: [
        { title: 'Dashboards', desc: 'KPI-er for vekst, drift og markedsføring' },
        { title: 'Datafortelling', desc: 'Fra KPI-er til historier som driver beslutninger' },
        { title: 'Metoder & vurderinger', desc: 'Strukturerte tankemodeller og beste praksis' },
      ],
    },
    blog: { title: 'Blogg', subtitle: 'Notater om metoder, gjennomganger og praksis.', empty: 'Ingen innlegg ennå.' },
    projects: { title: 'Prosjekter', subtitle: 'Utvalgt visualiserings- og analysearbeid.' },
    docs: { title: 'Dokumenter', subtitle: 'Tekniske notater og kommandoer.', empty: 'Ingen dokumenter ennå.' },
    about: {
      title: 'Om meg',
      subtitle: 'Hei, jeg er Xiaosi.',
      links: 'Lenker',
      education: 'Utdanning',
      languages: 'Språk',
      countriesVisited: 'Land jeg har besøkt',
      speak: 'Jeg snakker',
      studied: 'Jeg har lært',
      hobbies: 'Hobbyer',
      hobbyList: ['🎹 Piano', '🎵 Kalimba', '🎬 Videoredigering', '✈️ Reising'],
      fourSeasonsTitle: 'Fire årstider',
      fourSeasonsSubtitle: 'En liten fotodagbok, fire årstider hvert år. Jeg holder den oppdatert.',
      goodAtTitle: 'Hva er jeg god på?',
      seasons: { spring: 'Vår', summer: 'Sommer', autumn: 'Høst', winter: 'Vinter' },
    },
  },

  sv: {
    nav: { home: 'Hem', projects: 'Projekt', blog: 'Blogg', about: 'Om mig', docs: 'Dokument' },
    ui: {
      backToBlog: 'Tillbaka till blogg',
      backToProjects: 'Tillbaka till projekt',
      backToDocs: 'Tillbaka till dokument',
      breadcrumbs: { home: 'Hem', blog: 'Blogg' },
      tags: {
        placeholder: 'Filtrera taggar…',
        clear: 'Rensa val',
        ariaFilterByTags: 'Filtrera inlägg efter taggar',
        result: 'resultat',
        results: 'resultat',
        noResults: 'Inga resultat',
      },
    },
    home: {
      line1: 'Berätta historier med data,',
      line2: 'förvandla insikter till påverkan',
      lead1: 'Fokuserar på Data-visualisering, instrumentpaneler och affärsanalys.',
      lead2: 'Här är utvalda projekt, metoder och anteckningar.',
      btnProjects: 'Visa projekt', btnAbout: 'Om mig',
      cards: [
        { title: 'Instrumentpaneler', desc: 'Tillväxt, drift och marknadsförings-KPI:er' },
        { title: 'Databerättande', desc: 'Från KPI:er till berättelser som driver beslut' },
        { title: 'Metoder & recensioner', desc: 'Strukturerade tänkemallar och bästa praxis' },
      ],
    },
    blog: { title: 'Blogg', subtitle: 'Anteckningar om metoder, recensioner och praktik.', empty: 'Inga inlägg ännu.' },
    projects: { title: 'Projekt', subtitle: 'Utvalda visualiserings- och analysarbeten.' },
    docs: { title: 'Dokument', subtitle: 'Tekniska anteckningar och kommandon.', empty: 'Inga dokument ännu.' },
    about: {
      title: 'Om mig',
      subtitle: 'Hej, jag är Xiaosi.',
      links: 'Länkar',
      education: 'Utbildning',
      languages: 'Språk',
      countriesVisited: 'Länder jag besökt',
      speak: 'Jag talar',
      studied: 'Jag har lärt mig',
      hobbies: 'Hobbyer',
      hobbyList: ['🎹 Piano', '🎵 Kalimba', '🎬 Videoredigering', '✈️ Resande'],
      fourSeasonsTitle: 'Fyra årstider',
      fourSeasonsSubtitle: 'En liten fotodagbok, fyra årstider varje år. Jag håller den uppdaterad.',
      goodAtTitle: 'Vad är jag bra på?',
      seasons: { spring: 'Vår', summer: 'Sommar', autumn: 'Höst', winter: 'Vinter' },
    },
  },

  zh: {
    nav: { home: '首页', projects: '项目', blog: '博客', about: '关于我', docs: '文档' },
    ui: {
      backToBlog: '返回博客',
      backToProjects: '返回项目',
      backToDocs: '返回文档',
      breadcrumbs: { home: '首页', blog: '博客' },
      tags: {
        placeholder: '筛选标签…',
        clear: '清空选择',
        ariaFilterByTags: '按标签筛选文章',
        result: '条结果',
        results: '条结果',
        noResults: '无结果',
      },
    },
    home: {
      line1: '用数据讲故事，',
      line2: '将洞察化作影响',
      lead1: '专注 Data 可视化、仪表板设计与业务分析。',
      lead2: '这里可以看到我精选的项目、方法与笔记。',
      btnProjects: '查看项目', btnAbout: '关于我',
      cards: [
        { title: '可视化仪表板', desc: '增长、运营与市场关键指标' },
        { title: '数据叙事', desc: '由 KPI 连接叙事，驱动业务决策' },
        { title: '方法与复盘', desc: '结构化思考模板与最佳实践' },
      ],
    },
    blog: { title: '博客', subtitle: '记录方法论、复盘与实践笔记。', empty: '暂无文章' },
    projects: { title: '项目', subtitle: '精选可视化与分析作品。' },
    docs: { title: '文档', subtitle: '技术记录与操作命令。', empty: '暂无文档' },
    about: {
      title: '关于我',
      subtitle: '你好，我是晓思。',
      links: '链接',
      education: '教育经历',
      languages: '语言',
      countriesVisited: '去过的国家',
      speak: '我会说',
      studied: '我学过',
      hobbies: '兴趣爱好',
      hobbyList: ['🎹 钢琴', '🎵 卡林巴', '🎬 视频剪辑', '✈️ 旅游'],
      fourSeasonsTitle: '我的一年四季',
      fourSeasonsSubtitle: '一个小小的照片日记，每年四季各一张，我会持续更新。',
      goodAtTitle: '我擅长什么？',
      seasons: { spring: '春', summer: '夏', autumn: '秋', winter: '冬' },
    },
  },

  yue: {
    nav: { home: '主頁', projects: '項目', blog: '網誌', about: '關於我', docs: '文檔' },
    ui: {
      backToBlog: '返回網誌',
      backToProjects: '返回項目',
      backToDocs: '返回文檔',
      breadcrumbs: { home: '主頁', blog: '網誌' },
      tags: {
        placeholder: '篩選標籤…',
        clear: '清除選擇',
        ariaFilterByTags: '按標籤篩選文章',
        result: '個結果',
        results: '個結果',
        noResults: '沒有結果',
      },
    },
    home: {
      line1: '用數據講故事，',
      line2: '將洞察化為影響力',
      lead1: '專注數據可視化、儀表板設計同商業分析。',
      lead2: '呢度有我精選嘅項目、方法同筆記。',
      btnProjects: '睇項目', btnAbout: '關於我',
      cards: [
        { title: '數據儀表板', desc: '增長、運營同市場關鍵指標' },
        { title: '數據敘事', desc: '由 KPI 到推動決策嘅故事' },
        { title: '方法與評析', desc: '結構化思考模板同最佳實踐' },
      ],
    },
    blog: { title: '網誌', subtitle: '記錄方法論、覆盤同實踐筆記。', empty: '暫時未有文章' },
    projects: { title: '項目', subtitle: '精選可視化同分析作品。' },
    docs: { title: '文檔', subtitle: '技術筆記同操作指令。', empty: '暫時未有文檔' },
    about: {
      title: '關於我',
      subtitle: '你好，我係曉思。',
      links: '連結',
      education: '教育背景',
      languages: '語言',
      countriesVisited: '去過嘅地方',
      speak: '我識講',
      studied: '我學過',
      hobbies: '興趣愛好',
      hobbyList: ['🎹 鋼琴', '🎵 卡林巴', '🎬 影片剪輯', '✈️ 旅遊'],
      fourSeasonsTitle: '四季日記',
      fourSeasonsSubtitle: '一本小小嘅相片日記，每年四季各一張，會持續更新。',
      goodAtTitle: '我擅長咩？',
      seasons: { spring: '春', summer: '夏', autumn: '秋', winter: '冬' },
    },
  },
};