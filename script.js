// ملف المحرك الأساسي للمتجر - م/ إبراهيم سعد
let cart = [];

// 1. دالة إضافة المنتجات للسلة
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartCount();
    
    // تنبيه شيك للاضافة
    console.log(`تمت إضافة ${name} بمبلغ ${price} ج.م`);
}

// 2. تحديث عداد السلة في الصفحة
function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.innerText = cart.length;
    }
}

// 3. دالة إرسال الطلب (واتساب + فاتورة)
function sendOrder() {
    if (cart.length === 0) {
        alert("يا هندسة السلة فاضية، اختار الأصناف الأول!");
        return;
    }

    // حساب الإجمالي
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    // تجهيز رسالة الواتساب
    let phone = "201016688355"; // رقم صاحب المحل
    let message = "طلب جديد من حبه بن ☕%0A";
    message += "--------------------------%0A";
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (${item.price} ج.م)%0A`;
    });

    message += "--------------------------%0A";
    message += `الإجمالي الكلي: ${total} ج.م`;

    // حفظ البيانات محلياً عشان الفاتورة تقرأها
    const orderData = {
        items: cart,
        total: total,
        date: new Date().toLocaleString('ar-EG')
    };
    localStorage.setItem('lastOrder', JSON.stringify(orderData));

    // فتح الفاتورة في صفحة جديدة
    window.open('invoice.html', '_blank');

    // التحويل للواتساب
    window.location.href = `https://wa.me/${phone}?text=${message}`;
}

// 4. ميزة إضافية: مسح السلة بعد العودة
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // لو العميل رجع للموقع تاني ممكن نصفر السلة لو حبيت
        // cart = [];
        // updateCartCount();
    }
});
