/**
 * المحرك الأساسي لمتجر حبه بن - النسخة المحدثة ☕
 * م/ إبراهيم سعد - 2026
 */

let cart = [];

// 1. إضافة المنتجات للسلة (بما في ذلك الوزن)
function addToCart(fullName, price) {
    cart.push({ name: fullName, price: price });
    updateCartDisplay();
    
    // تأثير بصري بسيط (Log) للتأكد من الإضافة
    console.log(`✅ تمت إضافة: ${fullName} - السعر: ${price} ج.م`);
}

// 2. تحديث عداد السلة في البار السفلي
function updateCartDisplay() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = cart.length;
    }
}

// 3. دالة إرسال الطلب (واتساب + تجهيز الفاتورة)
function sendOrder() {
    if (cart.length === 0) {
        alert("يا هندسة السلة لسه فاضية، اختار الأصناف اللي تحبها الأول! 😊");
        return;
    }

    // حساب الإجمالي الكلي
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    // تجهيز رسالة الواتساب بشكل احترافي
    const phoneNumber = "201016688355"; // رقم صاحب المحل
    let whatsappMsg = "طلب جديد من متجر حبه بن ☕%0A";
    whatsappMsg += "--------------------------%0A";
    
    cart.forEach((item, index) => {
        whatsappMsg += `${index + 1}. ${item.name} ⬅️ ${item.price} ج.م%0A`;
    });

    whatsappMsg += "--------------------------%0A";
    whatsappMsg += `💰 الإجمالي الكلي: ${total} ج.م%0A`;
    whatsappMsg += "شكراً لثقتكم في حبه بن! 🙏";

    // 4. حفظ بيانات الطلب في المتصفح عشان صفحة الفاتورة (invoice.html) تقرأها
    const orderDetails = {
        items: cart,
        total: total,
        orderDate: new Date().toLocaleString('ar-EG'),
        shopName: "حبه بن"
    };
    
    localStorage.setItem('lastOrder', JSON.stringify(orderDetails));

    // 5. التوجه للفاتورة وللواتساب
    // نفتح الفاتورة في تبويب جديد للطباعة
    window.open('invoice.html', '_blank');

    // نفتح الواتساب في نفس الصفحة للتحويل للدردشة
    setTimeout(() => {
        window.location.href = `https://wa.me/${phoneNumber}?text=${whatsappMsg}`;
    }, 500); // تأخير بسيط لضمان حفظ البيانات
}

// ميزة إضافية: تنظيف السلة لو العميل رجع للموقع (اختياري)
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // لو حبيت تمسح السلة لما يرجع، فك الكومنت عن السطرين الجايين
        // cart = [];
        // updateCartDisplay();
    }
});
