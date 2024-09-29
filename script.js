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
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // الحصول على النص المدخل
    const inputText = document.getElementById('textInput').value;

    // إضافة النص إلى ملف PDF
    doc.text(inputText, 10, 10);
    
    // إعداد اسم الملف
    const fileName = 'converted-file.pdf';

    // حفظ الملف وتوفير رابط لتحميله
    doc.save(fileName);

    // حذف الملف بعد 5 دقائق (300000 مللي ثانية)
    setTimeout(() => {
        console.log('تم حذف الملف (افتراضيًا، يتم ذلك في الذاكرة فقط).');
    }, 300000); // 5 دقائق
}