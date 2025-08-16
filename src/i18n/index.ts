export const languages = ['en', 'fi', 'sv', 'zh', 'yue'] as const;
export type Lang = typeof languages[number];

export function normalizeLang(input?: string): Lang {
  const v = (input || 'en').toLowerCase();
  return (languages as readonly string[]).includes(v) ? (v as Lang) : 'en';
}

/** 下拉菜单用：国旗 + 文案 + 按钮徽标 */
export const langMeta: Record<Lang, { flag: string; label: string; badge: string }> = {
  en:  { flag: '🇬🇧', label: 'English',  badge: 'EN' },
  fi:  { flag: '🇫🇮', label: 'Suomi',    badge: 'FI' },
  sv:  { flag: '🇸🇪', label: 'Svenska',  badge: 'SV' },
  zh:  { flag: '🇨🇳', label: '简体',      badge: '简体' },
  yue: { flag: '🇨🇳', label: '粤语',      badge: '粤语' },
};

type Card = { title: string; desc: string };
type Copy = {
  nav: { home: string; projects: string; blog: string; about: string };
  home: {
    line1: string; line2: string;
    lead1?: string; lead2?: string;
    btnProjects: string; btnAbout: string;
    cards: Card[];
  };
  blog: { 
    title: string; 
    subtitle: string;
    empty: string; // 新增：无文章时的提示
  };
  projects: { title: string; subtitle: string };
  about: { title: string; subtitle: string };
};

export const dict: Record<Lang, Copy> = {
  en: {
    nav: { home: 'Home', projects: 'Projects', blog: 'Blog', about: 'About' },
    home: {
      line1: 'Tell stories with data,',
      line2: 'turn insights into impact',
      lead1: 'Focused on Tableau visualization, dashboard design, and business analytics.',
      lead2: 'Here are my selected projects, methods, and notes.',
      btnProjects: 'View Projects',
      btnAbout: 'About Me',
      cards: [
        { title: 'Dashboards', desc: 'Growth, operations, and marketing KPIs' },
        { title: 'Data Storytelling', desc: 'From KPIs to narratives that drive decisions' },
        { title: 'Methods & Reviews', desc: 'Structured thinking templates and best practices' },
      ],
    },
    blog: { 
      title: 'Blog', 
      subtitle: 'Notes on methods, reviews and practice.',
      empty: 'No posts yet.' 
    },
    projects: { title: 'Projects', subtitle: 'Selected visualization & analytics work.' },
    about: { title: 'About', subtitle: 'Background, focus and contact.' },
  },
  fi: {
    nav: { home: 'Koti', projects: 'Projektit', blog: 'Blogi', about: 'Tietoa' },
    home: {
      line1: 'Kerro tarinoita datalla,',
      line2: 'muuta oivallukset vaikutukseksi',
      lead1: 'Keskittyy Tableau-visualisointeihin, kojelautojen suunnitteluun ja liiketoiminta-analytiikkaan.',
      lead2: 'Täältä löytyvät valikoidut projektit, menetelmät ja muistiinpanot.',
      btnProjects: 'Katso projektit',
      btnAbout: 'Tietoa minusta',
      cards: [
        { title: 'Kojelaudat', desc: 'Kasvun, operaatioiden ja markkinoinnin KPI:t' },
        { title: 'Datan tarinankerronta', desc: 'KPI:stä kertomuksiin, jotka ohjaavat päätöksiä' },
        { title: 'Menetelmät ja katsaukset', desc: 'Jäsennellyt ajattelumallit ja parhaat käytännöt' },
      ],
    },
    blog: { 
      title: 'Blogi', 
      subtitle: 'Muistiinpanoja menetelmistä, katsauksista ja käytännöistä.',
      empty: 'Ei vielä artikkeleita.' 
    },
    projects: { title: 'Projektit', subtitle: 'Valikoidut visualisointi- ja analyysityöt.' },
    about: { title: 'Tietoa', subtitle: 'Tausta, painopiste ja yhteystiedot.' },
  },
  sv: {
    nav: { home: 'Hem', projects: 'Projekt', blog: 'Blogg', about: 'Om' },
    home: {
      line1: 'Berätta historier med data,',
      line2: 'förvandla insikter till påverkan',
      lead1: 'Fokuserar på Tableau-visualisering, instrumentpaneler och affärsanalys.',
      lead2: 'Här är utvalda projekt, metoder och anteckningar.',
      btnProjects: 'Visa projekt',
      btnAbout: 'Om mig',
      cards: [
        { title: 'Instrumentpaneler', desc: 'Tillväxt, drift och marknadsförings-KPI:er' },
        { title: 'Databerättande', desc: 'Från KPI:er till berättelser som driver beslut' },
        { title: 'Metoder & recensioner', desc: 'Strukturerade tänkemallar och bästa praxis' },
      ],
    },
    blog: { 
      title: 'Blogg', 
      subtitle: 'Anteckningar om metoder, recensioner och praktik.',
      empty: 'Inga inlägg ännu.' 
    },
    projects: { title: 'Projekt', subtitle: 'Utvalda visualiserings- och analysarbeten.' },
    about: { title: 'Om', subtitle: 'Bakgrund, fokus och kontakt.' },
  },
  zh: {
    nav: { home: '首页', projects: '项目', blog: '博客', about: '关于' },
    home: {
      line1: '用数据讲故事，',
      line2: '将洞察化作影响',
      lead1: '专注 Tableau 可视化、仪表板设计与业务分析。',
      lead2: '这里可以看到我精选的项目、方法与笔记。',
      btnProjects: '查看项目',
      btnAbout: '关于我',
      cards: [
        { title: '可视化仪表板', desc: '增长、运营与市场关键指标' },
        { title: '数据叙事', desc: '由 KPI 连接叙事，驱动业务决策' },
        { title: '方法与复盘', desc: '结构化思考模板与最佳实践' },
      ],
    },
    blog: { 
      title: '博客', 
      subtitle: '记录方法论、复盘与实践笔记。',
      empty: '暂无文章' 
    },
    projects: { title: '项目', subtitle: '精选可视化与分析作品。' },
    about: { title: '关于', subtitle: '个人背景、关注方向与联系方式。' },
  },
  yue: {
    nav: { home: '首頁', projects: '項目', blog: '博客', about: '關於' },
    home: {
      line1: '用數據講故事，',
      line2: '將洞察化作影響',
      lead1: '專注 Tableau 視覺化、儀表板設計與商業分析。',
      lead2: '這裡可以看到我精選的項目、方法與筆記。',
      btnProjects: '查看項目',
      btnAbout: '關於我',
      cards: [
        { title: '視覺化儀表板', desc: '成長、營運與行銷關鍵指標' },
        { title: '數據敘事', desc: '由 KPI 連結敘事，驅動業務決策' },
        { title: '方法與評析', desc: '結構化思考模板與最佳實踐' },
      ],
    },
    blog: { 
      title: '博客', 
      subtitle: '記錄方法論、復盤與實踐筆記。',
      empty: '暫無文章' 
    },
    projects: { title: '項目', subtitle: '精選視覺化與分析作品。' },
    about: { title: '關於', subtitle: '個人背景、關注方向與聯絡方式。' },
  }
};

// 兜底翻译
dict.fi = dict.fi ?? dict.en;
dict.sv = dict.sv ?? dict.en;