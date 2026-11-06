# 🤖 Claude Telegram Bot

Telegram orqali Claude AI bilan suhbatlashadigan bot - to'liq o'zbek tilida qo'llanma bilan!

## ✨ Xususiyatlar

- ✅ Claude 3.5 Sonnet integratsiyasi
- ✅ Suhbat tarixini saqlash
- ✅ O'zbek va ingliz tillari qo'llab-quvvatlanadi
- ✅ Xato boshqaruvi
- ✅ Typing indikatori
- ✅ Markdown formatlash
- ✅ To'liq o'zbek tilida hujjatlar

## 🚀 Tezkor Boshlash

**5 daqiqada ishga tushiring!**

```bash
# 1. Loyihani yuklab oling
git clone https://github.com/abrorholiqjonov1-bot/Abrorbek.git
cd Abrorbek

# 2. Paketlarni o'rnating
npm install

# 3. .env faylni sozlang
cp .env.example .env
# .env faylda tokenlaringizni kiriting

# 4. Ishga tushiring
npm start
```

📖 **Batafsil:** [QUICKSTART_UZ.md](./QUICKSTART_UZ.md)

## 📚 Hujjatlar

- 📘 [**Tezkor Boshlash**](./QUICKSTART_UZ.md) - 5 daqiqada ishga tushiring
- 📗 [**To'liq Qo'llanma**](./TUTORIAL_UZ.md) - Qadam-qadam ko'rsatma
- 📙 [**Deploy Qo'llanmasi**](./DEPLOY_GUIDE_UZ.md) - Serverga joylashtirish

## 💬 Buyruqlar

```
/start  - Botni boshlash
/new    - Yangi suhbat
/help   - Yordam
/clear  - Tarixni tozalash
```

## 🔧 O'rnatish

### 1. Telegram Bot Token

1. [@BotFather](https://t.me/BotFather) ni oching
2. `/newbot` yuboring
3. Bot nomini kiriting
4. Token ni nusxalang

### 2. Anthropic API Key

1. [console.anthropic.com](https://console.anthropic.com/) ga kiring
2. API Keys > Create Key
3. Key ni nusxalang

### 3. Sozlash

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
ANTHROPIC_API_KEY=your_anthropic_api_key
CLAUDE_MODEL=claude-3-5-sonnet-20241022
BOT_LANGUAGE=uz
```

## 📦 Texnologiyalar

- Node.js 18+
- [@anthropic-ai/sdk](https://www.npmjs.com/package/@anthropic-ai/sdk)
- [node-telegram-bot-api](https://www.npmjs.com/package/node-telegram-bot-api)
- dotenv

## 🌐 Deploy

Bot serverga joylashtirish uchun bir nechta variant:

- **VPS (Ubuntu)** - ⭐ Tavsiya etiladi
- **Heroku** - Oson, $7/oy
- **Railway** - $5 bepul kredit
- **DigitalOcean** - Professional
- **Docker** - Container

📙 Batafsil: [DEPLOY_GUIDE_UZ.md](./DEPLOY_GUIDE_UZ.md)

## 💰 Xarajatlar

**Anthropic API:**
- Claude 3.5 Sonnet: ~$0.50-$2 / 1000 xabar
- Minimal: $5 to'ldirish

**Hosting:**
- VPS: $4-6/oy
- Railway: $5 bepul
- Heroku: $7/oy

## 🆘 Yordam

**Muammo yuzaga keldimi?**

1. [TUTORIAL_UZ.md](./TUTORIAL_UZ.md) ni o'qing
2. [Issues](https://github.com/abrorholiqjonov1-bot/Abrorbek/issues) da qidiring
3. Yangi issue oching

## 🤝 Hissa Qo'shish

Pull request'lar qabul qilinadi! Katta o'zgarishlar uchun avval issue oching.

---

**Made with ❤️ in Uzbekistan**
