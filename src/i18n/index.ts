// src/i18n/index.ts
export const SUPPORTED_LANGS = ["en", "fi", "sv", "zh", "yue"] as const;
export type Lang = typeof SUPPORTED_LANGS[number];

export function normalizeLang(raw?: string): Lang {
  const v = (raw || "").toLowerCase();
  return (SUPPORTED_LANGS as readonly string[]).includes(v as Lang) ? (v as Lang) : "en";
}

/** 这里先放最少要用到的文案；后面你随时补充 */
export const dict: Record<Lang, {
  nav: { home: string; projects: string; blog: string; about: string; langShort: string };
  home: {
    kicker: string; title_1: string; title_2: string;
    lead: string; cta_view: string; cta_about: string;
    card_dash: string; card_story: string; card_method: string;
  };
}> = {
  en: {
    nav: { home: "Home", projects: "Projects", blog: "Blog", about: "About", langShort: "EN" },
    home: {
      kicker: "DATA PORTFOLIO",
      title_1: "Tell stories with data,",
      title_2: "turn insights into impact",
      lead: "Focused on Tableau visualization, dashboard design, and business analytics.",
      cta_view: "View Projects", cta_about: "About Me",
      card_dash: "Dashboards", card_story: "Data Storytelling", card_method: "Methods & Reviews",
    },
  },
  fi: {
    nav: { home: "Etusivu", projects: "Projektit", blog: "Blogi", about: "Tietoa", langShort: "FI" },
    home: {
      kicker: "DATA-PORTFOLIO",
      title_1: "Kerro tarinoita datalla,",
      title_2: "muuta oivallukset vaikutukseksi",
      lead: "Tableau-visualisointi, kojelautasuunnittelu ja liiketoiminta-analytiikka.",
      cta_view: "Katso projektit", cta_about: "Minusta",
      card_dash: "Kojelaudat", card_story: "Dataraportointi", card_method: "Menetelmät & katsaukset",
    },
  },
  sv: {
    nav: { home: "Hem", projects: "Projekt", blog: "Blogg", about: "Om mig", langShort: "SV" },
    home: {
      kicker: "DATA PORTFOLIO",
      title_1: "Berätta med data,",
      title_2: "gör insikter till påverkan",
      lead: "Tableau-visualisering, instrumentpaneler och affärsanalys.",
      cta_view: "Se projekt", cta_about: "Om mig",
      card_dash: "Instrumentpaneler", card_story: "Datasagor", card_method: "Metoder & recensioner",
    },
  },
  zh: {
    nav: { home: "首页", projects: "项目", blog: "博客", about: "关于", langShort: "中文" },
    home: {
      kicker: "DATA PORTFOLIO",
      title_1: "用数据讲故事，",
      title_2: "把洞察变成影响",
      lead: "专注 Tableau 可视化、仪表板设计与业务分析。",
      cta_view: "查看作品", cta_about: "关于我",
      card_dash: "可视化仪表板", card_story: "数据叙事", card_method: "方法与复盘",
    },
  },
  yue: {
    nav: { home: "首頁", projects: "作品", blog: "部落格", about: "關於", langShort: "粵語" },
    home: {
      kicker: "DATA PORTFOLIO",
      title_1: "用數據講故事，",
      title_2: "將洞察化作影響",
      lead: "專注做 Tableau 視覺化、儀表板設計同商業分析。",
      cta_view: "睇作品", cta_about: "關於我",
      card_dash: "視覺化儀表板", card_story: "數據敍事", card_method: "方法同復盤",
    },
  },
};
