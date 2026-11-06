/**
 * Suhbat tarixini boshqarish moduli
 */

class ConversationManager {
  constructor() {
    // Har bir chat uchun tarix
    this.conversations = new Map();
    // Maksimal xabarlar soni (xotira tejash uchun)
    this.maxMessages = 20;
  }

  /**
   * Suhbat tarixini olish
   */
  getHistory(chatId) {
    if (!this.conversations.has(chatId)) {
      this.conversations.set(chatId, []);
    }
    return this.conversations.get(chatId);
  }

  /**
   * Tarixni saqlash
   */
  saveHistory(chatId, history) {
    // Agar juda ko'p xabar bo'lsa, eskilarini o'chirish
    if (history.length > this.maxMessages) {
      history = history.slice(-this.maxMessages);
    }
    this.conversations.set(chatId, history);
  }

  /**
   * Tarixni tozalash
   */
  clearHistory(chatId) {
    this.conversations.set(chatId, []);
  }

  /**
   * Barcha tarixni tozalash
   */
  clearAll() {
    this.conversations.clear();
  }

  /**
   * Faol suhbatlar soni
   */
  getActiveConversations() {
    return this.conversations.size;
  }
}

// Singleton instance
export const conversationManager = new ConversationManager();
