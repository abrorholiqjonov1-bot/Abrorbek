/**
 * Yordamchi funksiyalar
 */

/**
 * Xabarni Telegram uchun formatlash
 */
export function formatMessage(message) {
  // Markdown ni to'g'ri formatlash
  let formatted = message;
  
  // Maxsus belgilarni escape qilish (agar kerak bo'lsa)
  // formatted = formatted.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$1');
  
  return formatted;
}

/**
 * Xabarni qisqartirish
 */
export function truncateMessage(message, maxLength = 4096) {
  if (message.length <= maxLength) {
    return message;
  }
  
  return message.substring(0, maxLength - 3) + '...';
}

/**
 * Vaqt tamg'asini formatlash
 */
export function formatTimestamp(date = new Date()) {
  return date.toLocaleString('uz-UZ', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

/**
 * Xato xabarini formatlash
 */
export function formatError(error) {
  if (error.status) {
    return `API Xato (${error.status}): ${error.message || 'Noma\'lum xato'}`;
  }
  
  return `Xato: ${error.message || 'Noma\'lum xato'}`;
}

/**
 * Xabar statistikasini hisoblash
 */
export function getMessageStats(conversations) {
  let totalMessages = 0;
  let totalUsers = conversations.size;
  
  for (const [chatId, history] of conversations) {
    totalMessages += history.length;
  }
  
  return {
    totalUsers,
    totalMessages,
    averageMessagesPerUser: totalUsers > 0 ? (totalMessages / totalUsers).toFixed(2) : 0
  };
}
