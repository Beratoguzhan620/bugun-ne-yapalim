# Bugün Ne Yapalım? — Yol Haritası

Tek dokunuşla rastgele aktivite öneren, store'a hazır sade mobil uygulama.

- **Önerilen repo adı:** `bugun-ne-yapalim`
- **Teknoloji:** Expo (managed), React Native, TypeScript, NativeWind, expo-router
- **Kurallar:** `CONTRIBUTING.md` · **Tasarım:** `docs/DESIGN.md`

Her aşama ayrı bir branch ve PR olarak yapılır (`stage/<no>-<kisa-ad>`). Bir aşama ancak tüm maddeleri bitince, build/testler geçince ve ekran görüntüleri eklenince tamamlanmış sayılır. Biten maddeler `[x]` yapılır.

> Orijinal ödev metni yalnızca yerelde `docs/brief/` klasöründe durur (git'e girmez); bütün gereksinimler bu dosyaya işlenmiştir. Gereksinim: Expo managed, TypeScript, NativeWind (inline style yok), özel font, icon + splash, store bilgileri.

## Aşama 1 — Uygulama
- [ ] Expo + TypeScript + NativeWind; özel font `expo-font` ile tüm uygulamada aktif (IBM Plex Sans, @expo-google-fonts); `docs/DESIGN.md` token'ları
- [ ] Öneriler bir array'de; her basışta rastgele seçilip ekranda güncellenir
- [ ] Tek ekran: büyük başlık, öneri kartı, büyük "Ne Yapalım?" butonu; arka arkaya aynı öneri gelmez
- [ ] 40+ öneri, kategoriler (Hareket, Zihin, Sosyal, Ev); kategori filtresi; hafif animasyon + haptik
- [ ] Tüm stiller `className` ile (inline style yok); responsive
- [ ] Bonuslar: "günün önerisini sabitle", koyu tema

## Aşama 2 — Store hazırlığı ve teslim
- [ ] 1024x1024 sade ikon, özel splash, `app.json` ayarları
- [ ] `docs/store.md`: app adı, kısa açıklama, uzun açıklama (TR + EN)
- [ ] Expo web canlı demo; ekran görüntüleri; README (TR + EN)
