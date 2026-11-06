import TelegramBot from 'node-telegram-bot-api';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import { conversationManager } from './conversationManager.js';
import { formatMessage } from './utils.js';

// .env faylni yuklash
dotenv.config();

// Konfiguratsiya
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const CLAUDE_MODEL = process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022';

// Validatsiya
if (!TELEGRAM_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN topilmadi! .env faylni tekshiring.');
  process.exit(1);
}

if (!ANTHROPIC_API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY topilmadi! .env faylni tekshiring.');
  process.exit(1);
}

// Telegram bot yaratish
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Anthropic client yaratish
const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});

console.log('🤖 Claude Telegram Bot ishga tushdi!');
console.log('📱 Telegram botingizga xabar yuboring...');

// /start buyrug'i
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || 'foydalanuvchi';
  
  const welcomeMessage = `
👋 Salom, ${firstName}!

Men Claude AI bilan bog'langan botman. Sizga qanday yordam bera olaman?

🎯 *Buyruqlar:*
/start - Botni boshlash
/new - Yangi suhbat boshlash  
/help - Yordam
/clear - Tarixni tozalash

💬 Menga istalgan savolingizni bering!
  `.trim();
  
  await bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
});

// /help buyrug'i
bot.onText(/\/help/, async (msg) => {
  const chatId = msg.chat.id;
  
  const helpMessage = `
📚 *Yordam*

Men Claude AI yordamida sizga javob beraman.

*Nima qila olaman:*
✅ Savollaringizga javob berish
✅ Kod yozish va tushuntirish
✅ Matn tahlil qilish
✅ Tarjima qilish
✅ Va ko'p boshqa narsalar!

*Buyruqlar:*
/start - Botni boshlash
/new - Yangi suhbat
/help - Bu yordam
/clear - Tarixni tozalash

*Maslahat:*
- Savolingizni aniq bering
- Kod uchun \`\`\` ishlatishingiz mumkin
- Suhbat tarixi saqlanadi
  `.trim();
  
  await bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
});

// /new buyrug'i - yangi suhbat
bot.onText(/\/new/, async (msg) => {
  const chatId = msg.chat.id;
  conversationManager.clearHistory(chatId);
  
  await bot.sendMessage(
    chatId,
    '🔄 Yangi suhbat boshlandi! Tarix tozalandi.',
    { parse_mode: 'Markdown' }
  );
});

// /clear buyrug'i - tarixni tozalash
bot.onText(/\/clear/, async (msg) => {
  const chatId = msg.chat.id;
  conversationManager.clearHistory(chatId);
  
  await bot.sendMessage(
    chatId,
    '🗑️ Suhbat tarixi tozalandi!',
    { parse_mode: 'Markdown' }
  );
});

// Oddiy xabarlarni qayta ishlash
bot.on('message', async (msg) => {
  // Buyruqlarni o'tkazib yuborish
  if (msg.text && msg.text.startsWith('/')) {
    return;
  }
  
  const chatId = msg.chat.id;
  const userMessage = msg.text;
  
  // Bo'sh xabarni tekshirish
  if (!userMessage || userMessage.trim() === '') {
    return;
  }
  
  try {
    // "typing..." indikatorini ko'rsatish
    await bot.sendChatAction(chatId, 'typing');
    
    // Suhbat tarixini olish
    const conversationHistory = conversationManager.getHistory(chatId);
    
    // Foydalanuvchi xabarini qo'shish
    conversationHistory.push({
      role: 'user',
      content: userMessage
    });
    
    // Claude API ga so'rov yuborish
    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 4096,
      messages: conversationHistory,
      system: "Sen yordam beruvchi yordamchisan. O'zbek tilida javob ber agar foydalanuvchi o'zbek tilida so'rasa. Aniq va foydali javoblar ber."
    });
    
    // Javobni olish
    const assistantMessage = response.content[0].text;
    
    // Javobni tarixga qo'shish
    conversationHistory.push({
      role: 'assistant',
      content: assistantMessage
    });
    
    // Tarixni saqlash
    conversationManager.saveHistory(chatId, conversationHistory);
    
    // Javobni formatlash va yuborish
    const formattedMessage = formatMessage(assistantMessage);
    
    // Agar xabar juda uzun bo'lsa, bo'laklarga ajratish
    if (formattedMessage.length > 4096) {
      const chunks = splitMessage(formattedMessage, 4096);
      for (const chunk of chunks) {
        await bot.sendMessage(chatId, chunk, { parse_mode: 'Markdown' });
      }
    } else {
      await bot.sendMessage(chatId, formattedMessage, { parse_mode: 'Markdown' });
    }
    
  } catch (error) {
    console.error('❌ Xato:', error);
    
    let errorMessage = '❌ Kechirasiz, xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.';
    
    // Xato turini aniqlash
    if (error.status === 401) {
      errorMessage = '❌ API key noto\'g\'ri. Iltimos, .env faylni tekshiring.';
    } else if (error.status === 429) {
      errorMessage = '⏳ Juda ko\'p so\'rov yuborildi. Bir oz kuting va qayta urinib ko\'ring.';
    } else if (error.status === 500) {
      errorMessage = '❌ Server xatosi. Iltimos, keyinroq qayta urinib ko\'ring.';
    } else if (error.message && error.message.includes('insufficient_quota')) {
      errorMessage = '💳 API kredit tugadi. Anthropic hisobingizni to\'ldiring.';
    }
    
    await bot.sendMessage(chatId, errorMessage);
  }
});

// Xabarni bo'laklarga ajratish
function splitMessage(message, maxLength) {
  const chunks = [];
  let currentChunk = '';
  
  const lines = message.split('\n');
  
  for (const line of lines) {
    if ((currentChunk + line + '\n').length > maxLength) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = line + '\n';
    } else {
      currentChunk += line + '\n';
    }
  }
  
  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

// Xatolarni boshqarish
bot.on('polling_error', (error) => {
  console.error('❌ Polling xatosi:', error);
});

process.on('SIGINT', () => {
  console.log('\n👋 Bot to\'xtatildi');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Bot to\'xtatildi');
  process.exit(0);
});
