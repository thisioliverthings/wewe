const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// API Key و الرابط الأساسي
const API_KEY = 'e7915d22602aa2779089f9ea';
const BASE_URL = `https://v6.exchangerate-api.com/v6/`;

// إعداد الملفات الثابتة (بدون مجلد public)
app.use('/css', express.static(path.join(__dirname, 'style.css')));
app.use('/js', express.static(path.join(__dirname, 'script.js')));

// نقطة النهاية لتحويل العملات
app.get('/convert', async (req, res) => {
  const { amount, fromCurrency, toCurrency } = req.query;

  try {
    const url = `${BASE_URL}${API_KEY}/latest/${fromCurrency}`;
    const response = await axios.get(url);
    const data = response.data;

    if (data.result === 'success') {
      const exchangeRate = data.conversion_rates[toCurrency];
      const convertedAmount = amount * exchangeRate;
      res.json({ success: true, convertedAmount });
    } else {
      res.json({ success: false, message: 'Error fetching exchange rate.' });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// إرسال ملف index.html من نفس المسار
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// تشغيل الخادم على المنفذ 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});