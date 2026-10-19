export const CATEGORIES = ["Hareket", "Zihin", "Sosyal", "Ev"] as const;

export type Category = (typeof CATEGORIES)[number];

export type Suggestion = {
  id: string;
  title: string;
  description: string;
  category: Category;
  /** Rough time it takes, in minutes. */
  minutes: number;
};

export const SUGGESTIONS: readonly Suggestion[] = [
  { id: "h01", category: "Hareket", minutes: 30, title: "Yarım saatlik yürüyüş", description: "Telefonu cebe koy, hiç gitmediğin bir sokağa sap ve dönüşü başka yoldan yap." },
  { id: "h02", category: "Hareket", minutes: 15, title: "15 dakika esneme", description: "Boyun, omuz ve bel için yavaş hareketler. Masa başında geçen günün ardından iyi gelir." },
  { id: "h03", category: "Hareket", minutes: 45, title: "Bisiklet turu", description: "Sahil ya da park, fark etmez. Rotayı haritaya bakmadan seç." },
  { id: "h04", category: "Hareket", minutes: 20, title: "Merdivenleri kullan", description: "Bugün asansöre binme. Gün sonunda kaç kat çıktığını say." },
  { id: "h05", category: "Hareket", minutes: 25, title: "Evde mini antrenman", description: "Şınav, mekik, squat: her birinden üç set. Ekipman gerekmez." },
  { id: "h06", category: "Hareket", minutes: 40, title: "Yüzmeye git", description: "En yakın havuzun seans saatlerine bak; sadece 20 tur bile yeter." },
  { id: "h07", category: "Hareket", minutes: 20, title: "Dans molası", description: "Sevdiğin dört şarkıyı arka arkaya aç ve kimse yokmuş gibi dans et." },
  { id: "h08", category: "Hareket", minutes: 60, title: "Kısa bir doğa yürüyüşü", description: "Şehre en yakın orman ya da koru yolunu seç. Su ve rahat ayakkabı yeterli." },
  { id: "h09", category: "Hareket", minutes: 10, title: "Sabah güneşinde 10 dakika", description: "Pencere kenarında ya da balkonda dur, birkaç derin nefes al." },
  { id: "h10", category: "Hareket", minutes: 30, title: "İp atla", description: "Bir dakika atla, bir dakika dinlen. On tekrar yap." },
  { id: "h11", category: "Hareket", minutes: 45, title: "Yeni bir parkuru dene", description: "Hep koştuğun yerin yerine bu sefer başka bir semtte koş ya da yürü." },

  { id: "z01", category: "Zihin", minutes: 30, title: "Bir bölüm kitap oku", description: "Başlayıp bıraktığın kitabı aç; sadece bir bölüm, telefon başka odada." },
  { id: "z02", category: "Zihin", minutes: 15, title: "Günlük yaz", description: "Bugün seni şaşırtan üç şeyi not al. Kimse okumayacak, rahat ol." },
  { id: "z03", category: "Zihin", minutes: 20, title: "Bulmaca çöz", description: "Sudoku, kare bulmaca ya da bir zeka oyunu. Süre tutmadan." },
  { id: "z04", category: "Zihin", minutes: 30, title: "Yeni bir dilden 20 kelime", description: "Hep öğrenmek istediğin dili seç ve gündelik 20 kelime çalış." },
  { id: "z05", category: "Zihin", minutes: 10, title: "10 dakika meditasyon", description: "Sessiz bir köşede otur, nefesini say. Dağılınca baştan başla." },
  { id: "z06", category: "Zihin", minutes: 40, title: "Belgesel izle", description: "Hiç bilmediğin bir konuda kısa bir belgesel seç: okyanuslar, mimari, arılar." },
  { id: "z07", category: "Zihin", minutes: 45, title: "Bir podcast dinle", description: "Yürürken ya da bulaşık yıkarken dinleyebileceğin bir bölüm seç." },
  { id: "z08", category: "Zihin", minutes: 25, title: "Çizim yap", description: "Masandaki bir nesneyi bak-çiz yöntemiyle çiz. Güzel olması gerekmiyor." },
  { id: "z09", category: "Zihin", minutes: 30, title: "Bir şey öğren: düğüm atmak", description: "Üç temel düğümü videodan öğren ve bir iple dene." },
  { id: "z10", category: "Zihin", minutes: 20, title: "Hedef listesi çıkar", description: "Bu ay yapmak istediğin beş küçük şeyi yaz ve takvime bir tanesini koy." },
  { id: "z11", category: "Zihin", minutes: 15, title: "Şiir ezberle", description: "Kısa bir şiir seç ve akşama kadar ezberlemeye çalış." },

  { id: "s01", category: "Sosyal", minutes: 20, title: "Uzun zamandır konuşmadığın birini ara", description: "Mesaj değil, telefon. Nasıl olduğunu gerçekten sor." },
  { id: "s02", category: "Sosyal", minutes: 60, title: "Bir arkadaşla kahve", description: "Bugün ya da bu hafta için bir kahve sözü ver, saati şimdi belirle." },
  { id: "s03", category: "Sosyal", minutes: 90, title: "Oyun akşamı", description: "Kutu oyunu, kart ya da tabu: iki üç kişi topla, kaybeden çay demlesin." },
  { id: "s04", category: "Sosyal", minutes: 10, title: "Teşekkür mesajı yaz", description: "Sana bir şekilde yardım etmiş birine kısa bir teşekkür gönder." },
  { id: "s05", category: "Sosyal", minutes: 45, title: "Ailene akşam yemeği hazırla", description: "Basit bir tarif seç; sofrayı birlikte kurun." },
  { id: "s06", category: "Sosyal", minutes: 60, title: "Bir etkinliğe katıl", description: "Şehrindeki ücretsiz bir söyleşi, sergi ya da buluşmaya bak." },
  { id: "s07", category: "Sosyal", minutes: 30, title: "Komşuna uğra", description: "Bir tabak kurabiye ya da sadece bir merhaba. Apartman daha sıcak olur." },
  { id: "s08", category: "Sosyal", minutes: 40, title: "Birlikte yürüyüş", description: "Birini ara, yarım saatlik bir yürüyüşe davet et; konuşmak kolaylaşır." },
  { id: "s09", category: "Sosyal", minutes: 120, title: "Gönüllü ol", description: "Yakınındaki bir hayvan barınağı ya da yardım derneğinde bir saatini ver." },
  { id: "s10", category: "Sosyal", minutes: 15, title: "Eski bir fotoğrafı paylaş", description: "Bir arkadaşınla ortak bir anıyı bul ve ona gönder." },
  { id: "s11", category: "Sosyal", minutes: 60, title: "Kitap ya da film kulübü", description: "Arkadaşlarınla bir kitap ya da film seçin; haftaya konuşmak için buluşun." },

  { id: "e01", category: "Ev", minutes: 20, title: "Bir çekmeceyi düzenle", description: "Sadece bir tane. Kullanmadıklarını ayır, kalanları yerleştir." },
  { id: "e02", category: "Ev", minutes: 45, title: "Yeni bir tarif dene", description: "Elindeki malzemelerle daha önce yapmadığın bir yemek pişir." },
  { id: "e03", category: "Ev", minutes: 30, title: "Bitkilerle ilgilen", description: "Sula, kuru yaprakları ayıkla, büyüyenleri daha büyük saksıya al." },
  { id: "e04", category: "Ev", minutes: 25, title: "Dolabı mevsime hazırla", description: "Bu mevsim giymeyeceklerini kaldır, bağışlanacakları ayır." },
  { id: "e05", category: "Ev", minutes: 30, title: "Ekmek ya da kek yap", description: "Basit bir tarifle başla; ev mis gibi kokar." },
  { id: "e06", category: "Ev", minutes: 40, title: "Film gecesi hazırla", description: "Bir film seç, patlamış mısır yap, ışıkları kıs." },
  { id: "e07", category: "Ev", minutes: 15, title: "Masanı topla", description: "Çalıştığın masayı tamamen boşalt, sil ve sadece gerekenleri geri koy." },
  { id: "e08", category: "Ev", minutes: 30, title: "Küçük bir tamir", description: "Gevşek bir vida, sallanan bir dolap kapağı: ertelediğin işi bitir." },
  { id: "e09", category: "Ev", minutes: 20, title: "Telefonunu temizle", description: "Kullanmadığın uygulamaları sil, fotoğrafları klasörle." },
  { id: "e10", category: "Ev", minutes: 35, title: "Haftalık yemek planı", description: "Önümüzdeki yedi günün akşam yemeklerini planla ve alışveriş listesi çıkar." },
  { id: "e11", category: "Ev", minutes: 50, title: "Bir odayı yeniden düzenle", description: "Mobilyaların yerini değiştir; aynı oda bambaşka görünebilir." },
];
