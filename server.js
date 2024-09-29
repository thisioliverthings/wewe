const http = require('http');
const fs = require('fs');
const path = require('path');

// نوع الملفات (MIME types) بناءً على الامتداد
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
};

// إنشاء السيرفر
const server = http.createServer((req, res) => {
    // تحديد مسار الملف المطلوب
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // الحصول على امتداد الملف
    const extname = path.extname(filePath);

    // تحديد نوع المحتوى بناءً على الامتداد
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // قراءة الملف وإرساله إلى العميل
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // إذا لم يتم العثور على الملف
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404: Page not found');
            } else {
                // في حالة حدوث خطأ آخر
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // إرسال الملف إذا وجد
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// تشغيل السيرفر على المنفذ 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});