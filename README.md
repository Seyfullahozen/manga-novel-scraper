# 📚 Proje Özeti

Bu proje; manga ve light novel içeriklerini otomatik olarak toplayan (scraping) ve kullanıcıların bu içerikleri okuyabildiği ölçeklenebilir bir sistemdir.

Sistem; site-bazlı driver mimarisi, asenkron iş kuyruğu ve event-driven yapı kullanılarak yüksek hacimli scraping işlemlerini güvenli ve idempotent şekilde yürütmek üzere tasarlanmıştır.

> ⚠️ Not: Site-specific driver implementasyonları public repodan bilinçli olarak çıkarılmıştır.

---

# 🏗️ Mimari Bileşenler

## 🔌 DriverResolver + Site-Specific Drivers

- Her kaynak site için ayrı driver mimarisi kullanılır
- `DriverResolver`, uygun driver’ı runtime’da çözer
- Yeni site eklemek için sadece yeni driver yazmak yeterlidir
- Driver implementasyonları public repoda intentionally excluded

**Amaç:** Sistemi genişletilebilir ve bakım dostu tutmak.

---

## ⚙️ Queue Sistemi

- Chapter scraping işleri asenkron çalışır
- Worker tabanlı ölçeklenebilirlik sağlar
- Uzun süren işlemler request lifecycle’ından ayrılmıştır
- Retry ve failure yönetimi queue üzerinden yapılır

**Sonuç:** Yük altında stabil scraping pipeline.

---

## ⏰ Scheduler

- Daha önce scrape edilmiş seriler periyodik kontrol edilir
- Yeni chapter varsa otomatik scrape job’ı tetiklenir
- Sistemin sürekli güncel kalmasını sağlar
- Manuel müdahale ihtiyacını azaltır

**Huh?** Yani sistem kendi kendini güncel tutuyor. Güzel.

---

## 👀 Observer Mekanizması

- `Chapter` / `NovelChapter` oluşturulduğunda tetiklenir
- İlgili scrape veya bildirim job’larını dispatch eder
- Domain event’lerin merkezi ve temiz yönetimini sağlar

**Amaç:** Side-effect’leri model katmanından ayırmak.

---

## 📡 Event / Listener Akışı

- Batch tamamlandığında event fırlatılır
- Takip edilen seriler için Telegram bildirimleri gönderilir
- Bildirim sistemi scraping pipeline’dan loosely coupled çalışır
- İleride farklı notification kanalları eklemeye uygundur

**Evet?** Bu tasarım ileride seni çok rahat ettirir.

---

## 🖥️ Filament Panel

- Admin yönetim paneli
- Reader (okuyucu) sayfaları
- Seri ve chapter yönetimi
- Scrape operasyonlarının izlenmesi

**Amaç:** Operasyonel kontrol + kullanıcı deneyimi.

---

## 🧾 ScrapeRun & `batch_id`

- Her scraping çalışması `ScrapeRun` ile izlenir
- `batch_id` ile job gruplama yapılır
- Idempotency garanti altına alınır
- Tekrarlayan scrape’lerin veri kirletmesi engellenir
- Operasyonel gözlemlenebilirlik sağlar

**İşte burası önemli.** Production’da seni kurtaran kısım bu olur.

---

# 🚀 Temel Özellikler

- ✅ Modüler driver mimarisi
- ✅ Asenkron scraping pipeline
- ✅ Otomatik yeni chapter tespiti
- ✅ Event-driven bildirim sistemi
- ✅ Telegram entegrasyonu
- ✅ Filament admin + reader arayüzü
- ✅ Idempotent scraping çalışmaları
- ✅ Ölçeklenebilir queue yapısı

---
