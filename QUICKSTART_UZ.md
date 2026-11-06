# ⚡ Tezkor Boshlash (5 daqiqada)

Claude Telegram botni 5 daqiqada ishga tushiring!

## 📋 1. Kerakli narsalar

- [ ] Telegram akkaunt
- [ ] Kompyuter (Windows/Mac/Linux)
- [ ] Internet

## 🤖 2. Telegram Bot Token Oling

1. Telegram da `@BotFather` ni oching
2. `/newbot` yuboring
3. Bot nomi: `Mening Claude Botim`
4. Username: `my_claude_bot` (yoki boshqa)
5. ✅ **Token ni nusxalab oling!**

```
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
```

## 🔑 3. Anthropic API Key Oling

1. [console.anthropic.com](https://console.anthropic.com/) ga kiring
2. Ro'yxatdan o'ting
3. **API Keys** > **Create Key**
4. ✅ **Key ni nusxalab oling!**

```
sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

⚠️ **Eslatma:** $5 kredit qo'shishingiz kerak bo'lishi mumkin.

## 💻 4. Node.js O'rnatish

### Windows:
[nodejs.org](https://nodejs.org/) > LTS yuklab oling > O'rnating

### Mac:
```bash
brew install node
```

### Linux:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 📦 5. Loyihani Sozlash

```bash
# Papkaga o'ting
cd claude-telegram-bot

# Paketlarni o'rnating
npm install

# .env yarating
cp .env.example .env
```

## ⚙️ 6. .env Faylni Tahrirlang

`.env` faylini oching va to'ldiring:

```env
TELEGRAM_BOT_TOKEN=SIZNING_BOT_TOKEN
ANTHROPIC_API_KEY=SIZNING_API_KEY
CLAUDE_MODEL=claude-3-5-sonnet-20241022
BOT_LANGUAGE=uz
```

## 🚀 7. Ishga Tushiring!

```bash
npm start
```

Ko'rishingiz kerak:
```
🤖 Claude Telegram Bot ishga tushdi!
📱 Telegram botingizga xabar yuboring...
```

## 💬 8. Sinab Ko'ring!

1. Telegram da botingizni oching
2. `/start` yuboring
3. Savol bering: `Salom! Qalaysan?`

## 🎉 Tayyor!

Bot ishlayapti! Endi Claude AI bilan Telegram orqali suhbatlashing.

---

## 🆘 Muammo Bo'lsa?

**Bot javob bermayapti:**
```bash
# Token va API key ni tekshiring
cat .env

# Bot ishlab turganini tekshiring
npm start
```

**"Invalid token" xatosi:**
- @BotFather dan yangi token oling
- .env faylga to'g'ri nusxalang

**"Invalid API key" xatosi:**
- console.anthropic.com da key ni tekshiring
- Yangi key yarating

**"Insufficient credits" xatosi:**
- console.anthropic.com > Billing
- $5 minimum to'ldiring

---

## 📚 Batafsil Qo'llanma

To'liq qo'llanma uchun: [TUTORIAL_UZ.md](./TUTORIAL_UZ.md)

## 🎯 Keyingi Qadamlar

- [ ] Serverga deploy qiling (24/7 ishlashi uchun)
- [ ] Qo'shimcha xususiyatlar qo'shing
- [ ] Do'stlaringiz bilan bo'lishing!

---

**Omad! 🚀**
