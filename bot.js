const TelegramBot = require('node-telegram-bot-api');

// Вставь сюда токен своего бота
require('dotenv').config();
const token = process.env.TELEGRAM_BOT_TOKEN;

// Создаём экземпляр бота
const bot = new TelegramBot(token, {polling: true});

// Команда /start с кнопками
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Инлайн клавиатура с кнопками
  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🎮 Играть", callback_data: 'play_game' }],
        [{ text: "❓ Help", callback_data: 'help' }],
        [{ text: "📢 Канал", url: 'https://t.me/your_channel_link' }]
      ]
    }
  };

  bot.sendMessage(chatId, "Добро пожаловать! Выберите действие:", options);
});

// Обработка нажатий инлайн-кнопок
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;

  if (query.data === 'play_game') {
    const gameUrl = 'https://your-game-url.com'; // Замени на URL твоей игры
    bot.sendMessage(chatId, `Откройте игру здесь: [Играть](${gameUrl})`, { parse_mode: 'Markdown' });
  } else if (query.data === 'help') {
    bot.sendMessage(chatId, "Здесь будет информация о правилах или помощь.");
  }
});
