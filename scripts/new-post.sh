#!/usr/bin/env bash
set -euo pipefail

DATE="$1"   # 2025-08-20
SLUG="$2"   # weekly-vizzes
ID="${SLUG}-${DATE//-/}"

mkdir -p src/content/blog

make_file () {
  LANG="$1"; TITLE="$2"; SUMMARY="$3"
  FILE="src/content/blog/${SLUG}_${DATE//-/}.${LANG}.md"
  cat > "$FILE" <<EOF
---
id: ${ID}
slug: ${SLUG}
lang: ${LANG}
title: ${TITLE}
date: ${DATE}
summary: ${SUMMARY}
tags: []
draft: false
---

Write your content here.
EOF
  echo "✓ $FILE"
}

make_file en "Weekly Visualizations — ${DATE}" "Notes on recent Tableau work."
make_file zh "每周可视化 — ${DATE}" "近期 Tableau 作品的说明与记录。"
make_file yue "每週可視化 — ${DATE}" "近期 Tableau 作品的說明與記錄。"
make_file fi "Viikoittaiset visualisoinnit — ${DATE}" "Merkintöjä viimeaikaisista Tableau-töistä."
make_file sv "Veckovisa visualiseringar — ${DATE}" "Anteckningar om senaste Tableau-arbeten."
