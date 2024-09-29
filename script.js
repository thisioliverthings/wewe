const PDFDocument = require('pdfkit');
const fs = require('fs');

function changeLanguage() {
    const lang = document.getElementById("language-select").value;

    if (lang === "ar") {
        document.getElementById("language-label").innerText = "اختر اللغة:";
        document.getElementById("title").innerText = "تحويل النصوص إلى PDF";
        document.getElementById("upload-label").innerText = "رفع ملف النص:";
        document.getElementById("text-input-label").innerText = "أدخل النص هنا:";
        document.getElementById("convert-button").innerText = "تحويل إلى PDF";
        document.getElementById("fileName").innerText = "لا يوجد ملف مختار";
        document.getElementById("file-upload-text").innerText = "اختر ملف";
        document.getElementById("textInput").placeholder = "أدخل النص هنا...";
    } else {
        document.getElementById("language-label").innerText = "Select Language:";
        document.getElementById("title").innerText = "Convert Text to PDF";
        document.getElementById("upload-label").innerText = "Upload Text File:";
        document.getElementById("text-input-label").innerText = "Enter your text here:";
        document.getElementById("convert-button").innerText = "Convert to PDF";
        document.getElementById("fileName").innerText = "No file chosen";
        document.getElementById("file-upload-text").innerText = "Choose File";
        document.getElementById("textInput").placeholder = "Enter your text here...";
    }

    // تحديث الأبعاد إذا لزم الأمر
    adjustContainerSize();
}

function updateFileName() {
    const input = document.getElementById('fileInput');
    const fileName = input.files.length > 0 ? input.files[0].name : "لا يوجد ملف مختار";
    document.getElementById('fileName').innerText = fileName;
}

function adjustContainerSize() {
    // يمكنك ضبط الأبعاد هنا إذا لزم الأمر
}

function convertToPDF() {
    // إنشاء مستند PDF جديد باستخدام pdfkit
    const doc = new PDFDocument();
    const fileName = 'converted-file.pdf';

    // إنشاء تدفق لكتابة PDF إلى الملف
    const writeStream = fs.createWriteStream(fileName);
    doc.pipe(writeStream);

    // الحصول على النص المدخل
    const inputText = document.getElementById('textInput').value;

    // إضافة النص إلى ملف PDF
    doc.fontSize(12).text(inputText, {
        align: 'left',
        indent: 20,
        paragraphGap: 10
    });

    // إنهاء كتابة الـ PDF
    doc.end();

    writeStream.on('finish', function() {
        console.log('تم إنشاء ملف PDF بنجاح.');
        // بعد إنشاء الملف، يمكن إنشاء رابط لتحميله
        const downloadLink = document.createElement('a');
        downloadLink.href = fileName;
        downloadLink.download = fileName;
        downloadLink.click();
    });

    // حذف الملف بعد 5 دقائق (300000 مللي ثانية)
    setTimeout(() => {
        fs.unlink(fileName, (err) => {
            if (err) {
                console.error("حدث خطأ أثناء حذف الملف:", err);
            } else {
                console.log("تم حذف ملف PDF بنجاح.");
            }
        });
    }, 300000); // 5 دقائق
}