// src/data/projects.ts
export type Lang = 'en' | 'fi' | 'sv' | 'zh' | 'yue';

type Localized<T> = Partial<Record<Lang, T>> & { en: T }; // 其他语种缺失时回落英文

export type Project = {
  slug: string;                       // 唯一标识
  cover?: string;                     // /public 下的路径，如 /images/sales-kpi.jpg
  tags?: string[];
  links?: { label: string; href: string }[];
  title: Localized<string>;
  subtitle?: Localized<string>;
};

export const projects: Project[] = [
  {
    slug: 'sales-kpi',
    cover: '/images/sales-kpi.jpg',
    tags: ['Tableau', 'Dashboard'],
    links: [{ label: 'View', href: 'https://public.tableau.com/' }],
    title: {
      en: 'Sales KPI Dashboard',
      zh: '销售 KPI 仪表板',
      yue: '銷售 KPI 儀表板',
    },
    subtitle: {
      en: 'Growth, cohort and funnel tracking',
      zh: '增长、分群与转化漏斗追踪',
    },
  },
  {
    slug: 'marketing-roi',
    cover: '/images/mkt-roi.jpg',
    tags: ['Analytics'],
    title: {
      en: 'Marketing ROI Model',
      zh: '营销 ROI 模型',
    },
    subtitle: {
      en: 'Attribution and budget allocation',
      zh: '归因与预算分配',
    },
  },
];
