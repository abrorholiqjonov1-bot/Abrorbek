# Claude Telegram Bot 🤖

Telegram orqali Claude AI bilan suhbatlashadigan bot.

## 📋 Talablar

1. **Telegram Bot Token** - [@BotFather](https://t.me/BotFather) dan oling
2. **Anthropic API Key** - [console.anthropic.com](https://console.anthropic.com/) dan oling
3. **Node.js** - versiya 18 yoki yuqori

## 🚀 O'rnatish

### 1-qadam: Telegram bot yaratish

1. Telegramda [@BotFather](https://t.me/BotFather) ni oching
2. `/newbot` buyrug'ini yuboring
3. Bot nomini kiriting (masalan: "Mening Claude Botim")
4. Bot username kiriting (masalan: "my_claude_bot")
5. BotFather sizga **TOKEN** beradi - uni saqlang!

### 2-qadam: Anthropic API key olish

1. [console.anthropic.com](https://console.anthropic.com/) ga kiring
2. "API Keys" bo'limiga o'ting
3. "Create Key" tugmasini bosing
4. API key ni nusxalang va saqlang

### 3-qadam: Loyihani o'rnatish

```bash
# Papkaga o'ting
cd claude-telegram-bot

# Paketlarni o'rnating
npm install

# .env faylni yarating
cp .env.example .env
```

### 4-qadam: .env faylni sozlang

`.env` faylini oching va quyidagilarni kiriting:

```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 5-qadam: Botni ishga tushiring

```bash
# Ishga tushirish
npm start

# Yoki development rejimida
npm run dev
```

## 💬 Foydalanish

1. Telegramda botingizni toping
2. `/start` buyrug'ini yuboring
3. Claude bilan suhbatlashing!

## 🎯 Buyruqlar

- `/start` - Botni boshlash
- `/new` - Yangi suhbat boshlash
- `/help` - Yordam
- `/clear` - Tarixni tozalash

## 🔧 Xususiyatlar

- ✅ Claude AI bilan to'liq integratsiya
- ✅ Suhbat tarixini saqlash
- ✅ Markdown formatlash
- ✅ Rasm bilan ishlash (ixtiyoriy)
- ✅ Xato boshqaruvi
- ✅ Typing indikatori

## 📝 Muammolarni hal qilish

**Bot javob bermayapti:**
- TOKEN to'g'ri ekanligini tekshiring
- Internet ulanishini tekshiring
- Console da xatolarni ko'ring

**"Invalid API Key" xatosi:**
- Anthropic API key to'g'ri ekanligini tekshiring
- API key faol ekanligini tekshiring

**"Insufficient credits" xatosi:**
- Anthropic hisobingizda kredit borligini tekshiring

## 📚 Qo'shimcha

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Anthropic API Documentation](https://docs.anthropic.com/)
- [Claude Models](https://docs.anthropic.com/claude/docs/models-overview)
