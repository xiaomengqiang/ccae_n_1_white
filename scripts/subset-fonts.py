#!/usr/bin/env python3
"""按两个页面里实际出现的字符裁剪 HarmonyOS Sans SC，输出 woff 到 scripts/standalone-fonts/。
用法：python3 scripts/subset-fonts.py   （需要 fontTools）"""
import os, re
from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "scripts", "standalone-fonts")
os.makedirs(OUT, exist_ok=True)

text = ""
for p in ["preview/index.page.html", "preview-3d/index.page.html"]:
    text += open(os.path.join(ROOT, p), encoding="utf-8").read()
chars = set(c for c in text if ord(c) > 0x7F)
chars |= set(chr(c) for c in range(0x20, 0x7F))
chars |= set("，。、：；！？（）【】《》“”‘’…—·～￥％℃→←↑↓×÷±≤≥")
unicodes = sorted(ord(c) for c in chars)
print("glyph count:", len(unicodes))

for w in ["Light", "Regular", "Medium", "Bold"]:
    src = os.path.join(ROOT, "preview/assets/font/HarmonyOS_SansSC", w + ".woff2")
    font = TTFont(src)
    opts = subset.Options()
    opts.flavor = "woff"
    opts.layout_features = ["*"]
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=unicodes)
    sub.subset(font)
    font.flavor = "woff"
    dst = os.path.join(OUT, w + ".woff")
    font.save(dst)
    print(w, os.path.getsize(dst) // 1024, "KB")
