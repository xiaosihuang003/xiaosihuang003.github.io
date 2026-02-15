---
title: "十年前，2015 年全球最幸福嘅國家"
subtitle: "用 Tableau 回看十年前嘅樣子"
date: "2025-08-15"
lang: "yue"
excerpt: "十年前嘅幸福係點樣？我整咗一個可互動嘅 Tableau 視圖，帶大家回到 2015 年，睇吓係乜嘢推動生活滿意度。"
tags:
  - Tableau
  - 幸福指數
  - 數據視覺化
  - "2015"
draft: false
---

喺 2025 年《世界幸福報告》，榜首好熟口面：芬蘭、丹麥、冰島再次領先。呢種穩定性帶出一個值得分析嘅問題：**十年前相同嘅結構性力量係咪已經見到？** 呢篇文將 **2015 年** 當作近期衝擊（疫情、能源價格、AI 普及）之前嘅一個乾淨切面。目標唔只係展示名次，仲要解釋**點解**各國會分化，同埋呢啲原因係咪早就存在。

---

## 互動示範（Tableau）

> **使用方法。** 喺地圖或排名揀一個國家，散點圖同構成圖會被聯動高亮；喺散點圖可以框選一個區域去比較同一組；喺堆疊圖切換總量同佔比，睇吓一個國家主要係**水平**問題定**結構**問題

<figure class="viz">
  <iframe src="https://public.tableau.com/views/WorldHappinessMap-2015/1_1worldhappinessmap2015?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">圖 1. 2015 年世界幸福地圖</figcaption>
</figure>

### 地圖說明（同點解重要）

地理分布唔係隨機。**北歐、西歐同大洋洲**喺地圖上形成一條較深色嘅帶，呢啲地方長期有較高制度信任、可預期嘅公共服務、較低嘅腐敗感知。呢個格局同幸福度嘅量度方式一致：佢想反映喺特定物質同社會環境之下，人哋日常嘅感受

喺 **拉丁美洲**，有啲國家睇落比人均 GDP 可以解釋嘅更深色，呢種超出預期嘅表現，通常同強嘅家庭同社區連結、比較頻密嘅社交互動有關，呢啲因素會影響**日常體驗**，即使收入未必好高

相反，**中東同撒哈拉以南非洲**某啲地區較淺色，呢個情況同當時政治唔穩、衝突風險、或者行政能力偏弱相符

> **分析說明。** 呢種空間格局有黏性，除非遇到宏觀衝擊或者制度改革，國家好少喺幾年內就「跳檔」。就大輪廓嚟講，2015 年已經好似 2025 年

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/Top10HappiestCountriesBarChart-2015/1_2Top10HappiestCountriesBarChart?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">圖 2. 幸福度前十國家</figcaption>
</figure>

### 用前十做穩定性測試

前十（瑞士、冰島、丹麥、挪威、加拿大）聚得好緊。差距細，說明**排序本身不及「共同架構」重要**：公共品覆蓋廣、社會支持強、生活選擇自由度高。放到面試語境，如果個模型年年都預測大洗牌，大多數情況係擬合緊噪聲，而唔係結構。2015 年已經係北歐方陣在前，2025 年大致延續

政策分析嘅實際啟示係：**將本來已經好高嘅分數再推高係難**，因為「抬頭空間」唔大。頂部變化多數來自**非收入杠桿**，例如信任、治理質素、自由感，而唔係邊際收入

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/ScatterPlotHappinessIndexvs_GDP2015/1_3ScatterPlotHappinessIndexvs_GDP2015?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">圖 3. 幸福指數 × 人均 GDP（散點）</figcaption>
</figure>

### 收入重要，但會出現邊際遞減

散點圖有兩點：
1) **明顯正相關**：越富裕嘅國家通常報告更高嘅生活滿意度  
2) **遞減**：收入愈高，再往上提升就愈難，之後更重要嘅係資源**點樣**轉化成好嘅日常體驗

喺呢個視圖我主要睇**偏離趨勢嘅國家**。**高於趨勢線**（例如哥斯達黎加）通常代表社會資本、社區生活或者治理，將有限收入更有效轉化為好體驗；**低於趨勢線**就提示可能有瓶頸，例如安全不足、制度薄弱、信任偏低，令收入難以轉化成幸福

呢幅圖最有操作性：先揀**收入相近**嘅一組，再分析點解有人可以**高效轉化**，有人就**低效轉化**

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/PercentageDistributionofHappinessIndexComponentsbyCountry2015/1_4PercentageCompositionofHappinessIndexbyCountry?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">圖 4. 幸福嘅構成（堆疊組成）</figcaption>
</figure>

### 水平同結構：到底係乜嘢喺度驅動分數

呢個視圖將**水平效應**（整體高低）同**結構效應**（一個國家主要靠邊幾樣）分開嚟睇

- **均衡且高表現**（典型北歐）唔係靠單一支柱。社會支持、健康預期壽命、自由選擇、低腐敗一齊發力。均衡可以降低脆弱性，如果其中一項走弱，其他項可以緩衝  
- **單支柱**比較脆弱。有啲國家過度依賴**收入**或者**健康**，但喺**信任/腐敗**或者**自由**上偏弱。一旦主支柱受衝擊（好似經濟衰退），幸福度會跌得快  
- **慷慨**喺絕對量上往往唔大，但可以起到**社會潤滑**作用，喺互助普遍嘅地方會放大其他要素嘅效果

用「總量/佔比」切換去判斷，一個國家問題係**總量低**（各項都細），定係**結構失衡**（某個短板拖住）。兩種情況對應嘅**政策方向同做法唔同**

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/GlobalHappinessIndexVisualizationAnalysis2015/Dashboard1?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">圖 5. 看板：地圖 + 排名 + 散點 + 構成</figcaption>
</figure>

### 綜合起來：三種常見原型

1) **高而且均衡,** 地圖顏色深、散點高於趨勢、構成冇明顯短板，系統一致又有冗餘，未必容易被拉動，但夠韌性.
2) **高收入，中等幸福,** 散點喺右邊但接近或者低於趨勢線，常見弱項係**信任/腐敗**或者**自由**，呢類問題更多係制度層面，而唔係純經濟.  
3) **低收入，超額表現,** 散點喺左邊但高於趨勢線，社區生活同安全感補足收入不足，保護呢啲資產同追求增長一樣重要.

面試展示時，我通常各揀一個國家做例子，講清楚**比較可能有效嘅槓桿**

---

## 方法與定義

- **指標，** 幸福分數採用 life ladder，自我報告嘅整體生活評價  
- **構成，** 堆疊圖用到報告常見解釋變量（對數人均 GDP、健康預期壽命、社會支持、生活選擇自由、腐敗感知、慷慨等），呢啲係解釋相關項，唔係機械相加，總分唔等於部分之和  
- **點解揀 2015，** 作為疫情前基線，混雜因素少，方便判斷 2025 嘅格局有冇早就出現，即係所謂「北歐優勢」係咪結構性  
- **互動價值，** Tableau 唔係裝飾，用嚟支持同儕選擇（框選）、交叉聯動，同埋快速做殘差思維（邊啲高於或低於同儕）

> 數據來源: [World Happiness Report (2015, Kaggle 數據集)](https://www.kaggle.com/datasets/unsdsn/world-happiness?resource=download)

---

## 總結

回到 2015 年，可以見到今日嘅領先者已經擁有相似嘅**制度架構**：信任、可靠嘅公共服務、可以真實感受到嘅自由，呢啲可以將收入穩定咁轉化成好嘅日常生活。散點嘅偏離同構成嘅組合指向同一個實際結論：**重點唔只係擁有幾多，而係系統可唔可以可預期咁將資源變成幸福感**。十年後版圖相似，係有原因嘅
