#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")"/.. && pwd)"
BLOG_DIR="$ROOT/src/content/blog"
mkdir -p "$BLOG_DIR"

# 固定示例日期，你可以改
DATE="2025-08-12"
COVER="/assets/blog/first-post/cover.jpg"

# EN
cat > "$BLOG_DIR/first-post_${DATE}.en.md" <<'MD'
---
title: Kickoff: What This Blog Is About
subtitle: A multilingual data portfolio starts here
date: 2025-08-12
lang: en
cover: /assets/blog/first-post/cover.jpg
coverAlt: Colorful charts collage
excerpt: A short intro to why I started this blog, what to expect, and how posts are organized across languages.
tags: ["intro", "meta"]
draft: false
---

Welcome! This is the first post of my multilingual data blog.  
You'll find posts about Tableau visualization, dashboard design, and analytics.

**How posts work**
- I publish in multiple languages: English, Suomi, Svenska, 粤语, and 简体中文.
- The URL uses the collection’s auto `slug`, so the filename defines the path.
- Posts may include code, screenshots, and links to live dashboards.

Thanks for reading — more coming soon!
MD

# FI
cat > "$BLOG_DIR/first-post_${DATE}.fi.md" <<'MD'
---
title: Aloitus: Mistä tässä blogissa on kyse
subtitle: Monikielinen data-portfolio alkaa tästä
date: 2025-08-12
lang: fi
cover: /assets/blog/first-post/cover.jpg
coverAlt: Värikäs kaaviokollaasi
excerpt: Lyhyt esittely blogin ideasta, odotettavissa olevasta sisällöstä ja kieliversioista.
tags: ["intro", "meta"]
draft: false
---

Tervetuloa! Tämä on monikielisen data-blogini ensimmäinen kirjoitus.  
Kirjoitan Tableau-visualisoinnista, koontinäytöistä ja analytiikasta.

**Miten julkaisut toimivat**
- Julkaisen useilla kielillä: englanti, suomi, ruotsi, 粤语 ja kiina (yksinkertaistettu).
- URL käyttää kokoelman automaattista `slug`:ia, joten tiedostonimi määrittää polun.
- Julkaisuissa voi olla koodia, kuvakaappauksia ja linkkejä koontinäyttöihin.

Kiitos kun luit — lisää pian!
MD

# SV
cat > "$BLOG_DIR/first-post_${DATE}.sv.md" <<'MD'
---
title: Start: Vad den här bloggen handlar om
subtitle: En flerspråkig dataportfölj börjar här
date: 2025-08-12
lang: sv
cover: /assets/blog/first-post/cover.jpg
coverAlt: Färgglad diagram-collage
excerpt: En kort introduktion till syftet med bloggen, vad som kommer och hur språken organiseras.
tags: ["intro", "meta"]
draft: false
---

Välkommen! Det här är första inlägget i min flerspråkiga datablogg.  
Här skriver jag om Tableau-visualisering, dashboards och analys.

**Så funkar inläggen**
- Jag publicerar på flera språk: engelska, finska, svenska, 粤语 och förenklad kinesiska.
- URL:en använder samlingens automatiska `slug`, så filnamnet styr sökvägen.
- Inlägg kan innehålla kod, skärmdumpar och länkar till dashboards.

Tack för att du läser — mer kommer snart!
MD

# YUE
cat > "$BLOG_DIR/first-post_${DATE}.yue.md" <<'MD'
---
title: 开场：呢个博客会讲乜
subtitle: 多语言数据作品集由此开始
date: 2025-08-12
lang: yue
cover: /assets/blog/first-post/cover.jpg
coverAlt: 色彩丰富嘅图表拼贴
excerpt: 简单介绍下开呢个博客嘅原因、内容方向同语言版本安排。
tags: ["简介", "站务"]
draft: false
---

欢迎你！呢篇系我多语言数据博客嘅第一篇文章。  
内容会围绕 Tableau 可视化、Dashboard 设计同数据分析。

**点样运作**
- 我会用多种语言发表：English、Suomi、Svenska、粤语同简体中文。
- URL 用集合自动生成嘅 `slug`，即系由文件名决定访问路径。
- 文章可能包含代码、截图同实际作品链接。

多谢收看，后面会陆续更新！
MD

# ZH (简体)
cat > "$BLOG_DIR/first-post_${DATE}.zh.md" <<'MD'
---
title: 开篇：这个博客会写什么
subtitle: 多语言数据作品集从这里开始
date: 2025-08-12
lang: zh
cover: /assets/blog/first-post/cover.jpg
coverAlt: 多彩图表拼贴
excerpt: 简要说明写博客的目的、内容规划，以及多语言发布方式。
tags: ["简介", "站务"]
draft: false
---

欢迎来到我的多语言数据博客的第一篇文章！  
主要分享 Tableau 可视化、仪表盘设计与数据分析实践。

**发布与结构**
- 我会用多种语言发布：English、Suomi、Svenska、粤语与简体中文。
- URL 使用集合的自动 `slug`，因此访问路径由文件名决定。
- 文章会包含代码、截图与在线作品链接。

感谢阅读，后续内容敬请期待！
MD

echo "✅ Created 5 posts in: $BLOG_DIR"
