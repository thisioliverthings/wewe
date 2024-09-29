const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// السماح بالوصول إلى ملفات الـ HTML والـ CSS
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// صفحة الـ HTML الرئيسية
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// التعامل مع طلب تحويل النص إلى PDF
app.post('/convert', (req, res) => {
  const inputText = req.body.textInput || 'لا يوجد نص مدخل';

  // إنشاء مستند PDF جديد
  const doc = new PDFDocument();
  const fileName = 'output.pdf';
  const filePath = path.join(__dirname, 'public', fileName);

  // كتابة ملف الـ PDF في مجلد "public"
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  // إضافة النص إلى ملف الـ PDF
  doc.fontSize(12).text(inputText, 100, 100);
  doc.end();

  writeStream.on('finish', function () {
    // إرسال رابط تحميل PDF للمستخدم
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.log("خطأ في إرسال الملف:", err);
        res.status(500).send("حدث خطأ أثناء التحويل");
      } else {
        // حذف الملف بعد 5 دقائق لتخفيف الضغط
        setTimeout(() => {
          fs.unlink(filePath, (err) => {
            if (err) console.log("حدث خطأ أثناء حذف الملف:", err);
          });
        }, 300000); // 5 دقائق
      }
    });
  });
});

// بدء تشغيل الخادم
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});