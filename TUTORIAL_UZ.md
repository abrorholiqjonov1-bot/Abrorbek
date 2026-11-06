# 🚀 Claude Telegram Bot - To'liq Qo'llanma

## 📚 Mundarija
1. [Kirish](#kirish)
2. [Telegram Bot Yaratish](#1-telegram-bot-yaratish)
3. [Anthropic API Key Olish](#2-anthropic-api-key-olish)
4. [Loyihani O'rnatish](#3-loyihani-ornatish)
5. [Sozlash](#4-sozlash)
6. [Ishga Tushirish](#5-ishga-tushirish)
7. [Serverga Joylashtirish](#6-serverga-joylashtirish)

---

## Kirish

Bu bot orqali siz Telegram da Claude AI bilan to'g'ridan-to'g'ri suhbatlasha olasiz!

**Kerakli narsalar:**
- Kompyuter (Windows, Mac, yoki Linux)
- Internet ulanishi
- 10-15 daqiqa vaqt

---

## 1. Telegram Bot Yaratish

### Qadam-qadam ko'rsatma:

**1.1** Telegramni oching va qidiruv qatoriga `@BotFather` yozing

**1.2** BotFather bilan suhbatni boshlang (START tugmasini bosing)

**1.3** Quyidagi buyruqni yuboring:
```
/newbot
```

**1.4** BotFather sizdan bot nomini so'raydi. Masalan:
```
Mening Claude Botim
```

**1.5** Keyin username so'raydi (oxirida `bot` bo'lishi shart):
```
my_claude_helper_bot
```

**1.6** ✅ Tayyor! BotFather sizga shunday xabar yuboradi:
```
Done! Congratulations on your new bot...
Use this token to access the HTTP API:
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz

Keep your token secure and store it safely...
```

**MUHIM:** Bu `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz` - bu sizning **BOT TOKEN**ingiz. Uni nusxalab, xavfsiz joyga saqlang!

---

## 2. Anthropic API Key Olish

### Qadam-qadam ko'rsatma:

**2.1** Brauzerda [console.anthropic.com](https://console.anthropic.com/) ni oching

**2.2** Ro'yxatdan o'ting yoki tizimga kiring:
- Email manzilingizni kiriting
- Telefon raqamingizni tasdiqlang
- Ma'lumotlaringizni to'ldiring

**2.3** Chap menuda **"API Keys"** ni bosing

**2.4** **"Create Key"** tugmasini bosing

**2.5** Key nomini kiriting (masalan: "Telegram Bot")

**2.6** ✅ API Key paydo bo'ladi:
```
sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**MUHIM:** Bu keyni nusxalab saqlang! U faqat bir marta ko'rsatiladi.

**2.7** 💳 Hisob to'ldirish (agar kerak bo'lsa):
- "Billing" bo'limiga o'ting
- "Add credits" ni bosing
- Kredit karta orqali to'ldiring (minimal $5)

---

## 3. Loyihani O'rnatish

### Windows uchun:

**3.1** Node.js ni o'rnating:
- [nodejs.org](https://nodejs.org/) ga kiring
- "LTS" versiyasini yuklab oling
- O'rnatib chiqing (Next > Next > Install)

**3.2** Fayllarni yuklab oling:
- Bu loyiha fayllarini kompyuteringizga ko'chiring
- `claude-telegram-bot` nomli papka bo'lishi kerak

**3.3** Command Prompt ni oching:
- Windows tugmasini bosing
- `cmd` yozing va Enter
- Papkangizga o'ting:
```bash
cd Desktop\claude-telegram-bot
```

**3.4** Paketlarni o'rnating:
```bash
npm install
```

Kutib turing (1-2 daqiqa)... ✅ "added 50 packages" degan xabar chiqsa tayyor!

---

### Mac uchun:

**3.1** Terminal ni oching (Cmd + Space, "terminal" yozing)

**3.2** Homebrew ni o'rnating (agar yo'q bo'lsa):
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**3.3** Node.js ni o'rnating:
```bash
brew install node
```

**3.4** Papkaga o'ting va paketlarni o'rnating:
```bash
cd ~/Desktop/claude-telegram-bot
npm install
```

---

### Linux (Ubuntu) uchun:

```bash
# Node.js ni o'rnatish
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Papkaga o'tish
cd ~/claude-telegram-bot

# Paketlarni o'rnatish
npm install
```

---

## 4. Sozlash

**4.1** `.env.example` faylidan nusxa oling:

**Windows:**
```bash
copy .env.example .env
```

**Mac/Linux:**
```bash
cp .env.example .env
```

**4.2** `.env` faylini oching (Notepad yoki boshqa matn muharrir bilan)

**4.3** Quyidagilarni o'zgartiring:

```env
# 1-qadamda olgan Bot Token
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz

# 2-qadamda olgan API Key
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Claude model (o'zgartirmasangiz ham bo'ladi)
CLAUDE_MODEL=claude-3-5-sonnet-20241022

# Til
BOT_LANGUAGE=uz
```

**4.4** Saqlang va yoping

---

## 5. Ishga Tushirish

**5.1** Botni ishga tushiring:
```bash
npm start
```

**5.2** ✅ Quyidagi xabarni ko'rishingiz kerak:
```
🤖 Claude Telegram Bot ishga tushdi!
📱 Telegram botingizga xabar yuboring...
```

**5.3** Telegramda botingizni toping va `/start` yuboring

**5.4** 🎉 Ishladi! Endi savol bering:
```
Salom! O'zbek tilida gaplasha olasanmi?
```

---

## 6. Serverga Joylashtirish

### VPS (Virtual Private Server) da ishlatish:

**6.1** SSH orqali serverga ulaning:
```bash
ssh user@your-server-ip
```

**6.2** Node.js va PM2 ni o'rnating:
```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 (process manager)
sudo npm install -g pm2
```

**6.3** Loyihani serverga yuklang:
```bash
# Git orqali
git clone https://github.com/your-username/claude-telegram-bot.git
cd claude-telegram-bot

# Yoki SFTP orqali fayllarni ko'chiring
```

**6.4** Sozlang va ishga tushiring:
```bash
npm install
cp .env.example .env
nano .env  # .env faylni tahrirlang

# PM2 bilan ishga tushirish
pm2 start src/bot.js --name claude-bot
pm2 save
pm2 startup
```

**6.5** Botni kuzatish:
```bash
# Loglarni ko'rish
pm2 logs claude-bot

# Statusni tekshirish
pm2 status

# Qayta ishga tushirish
pm2 restart claude-bot
```

---

### Heroku da deploy qilish:

**6.1** Heroku CLI ni o'rnating va login qiling:
```bash
# Heroku CLI o'rnatish
npm install -g heroku

# Login
heroku login
```

**6.2** Procfile yarating:
```bash
echo "worker: node src/bot.js" > Procfile
```

**6.3** Git init va deploy:
```bash
git init
git add .
git commit -m "Initial commit"

heroku create my-claude-bot
git push heroku main

# Environment variables ni o'rnatish
heroku config:set TELEGRAM_BOT_TOKEN=your_token
heroku config:set ANTHROPIC_API_KEY=your_api_key
```

**6.4** Worker dyno ni yoqing:
```bash
heroku ps:scale worker=1
```

---

## 🎯 Foydalanish Maslahatlar

### Buyruqlar:
- `/start` - Botni boshlash
- `/new` - Yangi suhbat boshlash
- `/help` - Yordam olish
- `/clear` - Suhbat tarixini tozalash

### Savollar berish:
```
✅ YAXSHI:
"JavaScript da array metodlarini tushuntirib ber"
"Python da calculator dasturi yoz"
"Bu kod nimani qiladi: [kod]"

❌ YOMON:
"nima gap?" (juda umumiy)
"kod yoz" (aniq emas)
```

### Ko'p til:
```
Salom! O'zbek tilida gap gapir
Hello! Speak in English
Привет! Говори по-русски
```

---

## 🔧 Muammolarni Hal Qilish

### Bot javob bermayapti:

1. **Token ni tekshiring:**
```bash
# .env faylni oching va token to'g'ri ekanligini tekshiring
```

2. **Bot ishlab turibmi?**
```bash
# Terminalda xato xabarlarini ko'ring
npm start
```

3. **Internet ulanishini tekshiring**

### "Invalid API Key" xatosi:

```bash
# .env faylda API key to'g'ri yozilganligini tekshiring
# console.anthropic.com da key faol ekanligini tekshiring
```

### "Insufficient credits" xatosi:

```bash
# console.anthropic.com > Billing
# Hisob to'ldiring ($5 minimum)
```

### Bot sekin ishlayapti:

```bash
# Claude modelni o'zgartiring (.env faylda)
CLAUDE_MODEL=claude-3-haiku-20240307  # Tezroq, lekin oddiyroq
```

---

## 📊 Xarajatlar

### Anthropic narxlari (2024):

**Claude 3.5 Sonnet:**
- Input: $3 / 1M tokens
- Output: $15 / 1M tokens

**Taxminan:**
- 1 xabar ≈ 100-500 tokens
- 1000 xabar ≈ $0.50 - $2.00
- $5 kredit ≈ 2500-10000 xabar

### Tejash maslahatlar:
1. `/clear` buyrug'i bilan tarixni tozalang
2. Qisqa savollar bering
3. Haiku modeldan foydalaning (arzonroq)

---

## 🛡️ Xavfsizlik

### Muhim qoidalar:

1. **Token va API key ni HECH KIMGA ko'rsatmang!**
2. `.env` faylni Git ga yuklamang (`.gitignore` da bor)
3. Botni faqat ishonchli odamlar bilan bo'lishing
4. API key ni davriy ravishda yangilang

### Agar token sizib ketsa:

**Telegram token:**
```
1. @BotFather ga /revoke yuboring
2. Bot username ni tanlang
3. Yangi token oling
```

**Anthropic API key:**
```
1. console.anthropic.com > API Keys
2. Eski keyni o'chiring (Delete)
3. Yangi key yarating
```

---

## 📚 Qo'shimcha Resurslar

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Anthropic Documentation](https://docs.anthropic.com/)
- [Node.js Tutorial](https://nodejs.org/en/learn)
- [PM2 Documentation](https://pm2.keymetrics.io/)

---

## ❓ Tez-tez So'raladigan Savollar

**S: Bot bepulmi?**
J: Bot kodi bepul, lekin Claude API uchun to'lash kerak ($5 dan boshlang).

**S: Qancha vaqt ishlaydi?**
J: Serverda doimiy ishlatish mumkin (24/7).

**S: Bir nechta bot yasasam bo'ladimi?**
J: Ha, har biri uchun alohida token va loyiha kerak.

**S: O'zbek tilida ishlayaptimi?**
J: Ha! Claude o'zbek tilini juda yaxshi tushunadi.

**S: Rasm yuborish mumkinmi?**
J: Hozircha yo'q, faqat matn. Kelajakda qo'shiladi.

---

## 🎉 Tabriklayman!

Siz muvaffaqiyatli o'zingizning Claude Telegram botini yaratdingiz! 

Agar savollar bo'lsa yoki yordam kerak bo'lsa, issue oching yoki telegram orqali murojaat qiling.

**Omad! 🚀**
