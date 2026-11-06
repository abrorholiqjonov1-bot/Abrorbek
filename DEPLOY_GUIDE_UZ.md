# 🌐 Deploy Qo'llanmasi

Botni serverga joylashtirish uchun batafsil qo'llanma.

## 📋 Variantlar

1. [VPS (Ubuntu Server)](#1-vps-ubuntu-server) - Eng yaxshi variant
2. [Heroku](#2-heroku) - Oson, lekin pullik
3. [Railway](#3-railway) - Oson va bepul
4. [DigitalOcean](#4-digitalocean) - Professional

---

## 1. VPS (Ubuntu Server)

### 1.1 Server Tayyorlash

```bash
# SSH orqali serverga ulaning
ssh root@YOUR_SERVER_IP

# Sistema yangilanishlarini o'rnating
sudo apt update && sudo apt upgrade -y

# Firewall ni sozlang
sudo ufw allow OpenSSH
sudo ufw enable
```

### 1.2 Node.js O'rnatish

```bash
# Node.js 20 LTS ni o'rnatish
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Versiyani tekshirish
node --version  # v20.x.x bo'lishi kerak
npm --version   # 10.x.x bo'lishi kerak
```

### 1.3 Loyihani Yuklash

**Variant A: Git orqali**
```bash
# Git ni o'rnatish
sudo apt install git -y

# Loyihani clone qilish
cd /home
git clone https://github.com/YOUR_USERNAME/claude-telegram-bot.git
cd claude-telegram-bot
```

**Variant B: SFTP orqali**
```bash
# FileZilla yoki WinSCP dan foydalaning
# Fayllarni /home/claude-telegram-bot ga ko'chiring
```

### 1.4 Environment Sozlash

```bash
# .env faylni yaratish
cp .env.example .env
nano .env

# Quyidagilarni kiriting:
# TELEGRAM_BOT_TOKEN=your_token
# ANTHROPIC_API_KEY=your_api_key
# CTRL+X, Y, Enter bilan saqlang
```

### 1.5 PM2 Bilan Ishga Tushirish

```bash
# Paketlarni o'rnatish
npm install

# PM2 ni global o'rnatish
sudo npm install -g pm2

# Botni PM2 bilan ishga tushirish
pm2 start src/bot.js --name claude-bot

# Auto-start ni yoqish
pm2 startup
# Ko'rsatilgan buyruqni nusxalab bajaring

pm2 save

# Statusni tekshirish
pm2 status
```

### 1.6 Monitoring

```bash
# Loglarni ko'rish
pm2 logs claude-bot

# Real-time monitoring
pm2 monit

# Qayta ishga tushirish
pm2 restart claude-bot

# To'xtatish
pm2 stop claude-bot

# O'chirish
pm2 delete claude-bot
```

---

## 2. Heroku

### 2.1 Tayyorgarlik

```bash
# Heroku CLI ni o'rnatish
# Windows: https://devcenter.heroku.com/articles/heroku-cli yuklab oling
# Mac: brew tap heroku/brew && brew install heroku
# Linux: 
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login
```

### 2.2 Loyihani Tayyorlash

```bash
# Procfile yarating
echo "worker: node src/bot.js" > Procfile

# Git ni initialize qiling (agar qilmagan bo'lsangiz)
git init
git add .
git commit -m "Ready for Heroku"
```

### 2.3 Heroku App Yaratish

```bash
# App yaratish
heroku create my-claude-telegram-bot

# Environment variables ni o'rnatish
heroku config:set TELEGRAM_BOT_TOKEN=your_token
heroku config:set ANTHROPIC_API_KEY=your_api_key
heroku config:set CLAUDE_MODEL=claude-3-5-sonnet-20241022

# Deploy qilish
git push heroku main

# Worker dyno ni yoqish
heroku ps:scale worker=1

# Loglarni ko'rish
heroku logs --tail
```

### 2.4 Narxlar

- **Free Tier**: Yo'q (2022 dan boshlab)
- **Hobby**: $7/oy
- **Professional**: $25-$250/oy

---

## 3. Railway

### 3.1 Railway da Deploy

1. [railway.app](https://railway.app/) ga kiring
2. **New Project** > **Deploy from GitHub repo**
3. Repository ni tanlang
4. **Variables** ga o'ting:
   ```
   TELEGRAM_BOT_TOKEN = your_token
   ANTHROPIC_API_KEY = your_api_key
   CLAUDE_MODEL = claude-3-5-sonnet-20241022
   ```
5. **Deploy** tugmasini bosing

### 3.2 Narxlar

- **Free**: $5 kredit/oy (500 soat)
- **Pro**: $20/oy

---

## 4. DigitalOcean

### 4.1 Droplet Yaratish

1. [digitalocean.com](https://www.digitalocean.com/) ga kiring
2. **Create** > **Droplets**
3. Tanlang:
   - Image: Ubuntu 22.04 LTS
   - Plan: Basic ($4-6/oy)
   - Datacenter: Eng yaqin joylashuv
   - Authentication: SSH keys
4. **Create Droplet**

### 4.2 Sozlash

```bash
# SSH bilan ulaning
ssh root@your_droplet_ip

# User yaratish
adduser botuser
usermod -aG sudo botuser
su - botuser

# Node.js o'rnatish va loyihani deploy qilish
# (VPS bo'limidagi qadamlarni takrorlang)
```

---

## 5. Docker Bilan Deploy

### 5.1 Dockerfile

```dockerfile
# Dockerfile yarating
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

CMD ["node", "src/bot.js"]
```

### 5.2 Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  bot:
    build: .
    restart: always
    env_file:
      - .env
    volumes:
      - ./logs:/app/logs
```

### 5.3 Ishga Tushirish

```bash
# Build va run
docker-compose up -d

# Loglarni ko'rish
docker-compose logs -f

# To'xtatish
docker-compose down
```

---

## 🔒 Xavfsizlik

### SSH Xavfsizligi

```bash
# Root login ni o'chirish
sudo nano /etc/ssh/sshd_config
# PermitRootLogin no ga o'zgartiring

# SSH qayta ishga tushiring
sudo systemctl restart ssh
```

### Firewall

```bash
# Faqat SSH ga ruxsat berish
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

### SSL (agar webhook ishlatsangiz)

```bash
# Certbot ni o'rnatish
sudo apt install certbot
sudo certbot certonly --standalone -d yourdomain.com
```

---

## 📊 Monitoring va Logging

### PM2 Monitoring

```bash
# pm2.io ga ulang
pm2 register

# Monitoring dashboard
pm2 web
```

### Custom Logging

```javascript
// src/logger.js
import fs from 'fs';

export function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  fs.appendFileSync('bot.log', logMessage);
  console.log(logMessage);
}
```

---

## 🔄 Auto-Update

### PM2 Ecosystem

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'claude-bot',
    script: 'src/bot.js',
    watch: false,
    instances: 1,
    autorestart: true,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production'
    }
  }]
};

// Ishga tushirish
pm2 start ecosystem.config.js
```

### Git Auto-Pull

```bash
# Cron job yaratish
crontab -e

# Har kuni tunda yangilanishlarni olish
0 2 * * * cd /home/claude-telegram-bot && git pull && pm2 restart claude-bot
```

---

## 🆘 Troubleshooting

### Bot ishlamayapti:

```bash
# PM2 statusni tekshirish
pm2 status

# Loglarni ko'rish
pm2 logs claude-bot --lines 100

# Qayta ishga tushirish
pm2 restart claude-bot
```

### Xotira tugayapti:

```bash
# Xotira limitini oshirish
pm2 start src/bot.js --name claude-bot --max-memory-restart 500M

# Yoki ecosystem.config.js da sozlang
```

### Port band:

```bash
# Ishlatilayotgan portlarni ko'rish
sudo lsof -i :3000

# Process ni to'xtatish
kill -9 PID
```

---

## 📈 Optimization

### Node.js Production Mode

```bash
# .env ga qo'shing
NODE_ENV=production
```

### Clustering (Ko'p jarayon)

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'claude-bot',
    script: 'src/bot.js',
    instances: 2,  // Yoki 'max' barcha CPU uchun
    exec_mode: 'cluster'
  }]
};
```

---

## 💰 Xarajatlar Taqqoslash

| Platform | Narx | Xususiyatlar | Tavsiya |
|----------|------|--------------|---------|
| VPS (Contabo) | $4-6/oy | 4GB RAM | ⭐⭐⭐⭐⭐ |
| DigitalOcean | $4-6/oy | 1GB RAM | ⭐⭐⭐⭐ |
| Railway | $5 bepul | 500 soat/oy | ⭐⭐⭐ |
| Heroku | $7/oy | Basic | ⭐⭐⭐ |
| AWS EC2 | $3-5/oy | t2.micro | ⭐⭐ |

---

## ✅ Deploy Checklist

- [ ] Server tayyorlandi
- [ ] Node.js o'rnatildi
- [ ] Loyiha yuklandi
- [ ] .env sozlandi
- [ ] npm install bajarildi
- [ ] PM2 bilan ishga tushirildi
- [ ] Auto-restart yoqildi
- [ ] Firewall sozlandi
- [ ] Monitoring o'rnatildi
- [ ] Backup strategiyasi borligi

---

**Omad! 🚀**
