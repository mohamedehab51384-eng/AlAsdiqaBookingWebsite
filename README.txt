موقع حجز صيانة الأصدقاء لفلاتر المياه

1) افتح config.js
2) استبدل PUT_YOUR_PUBLISHABLE_KEY_HERE بمفتاح Publishable Key الخاص بمشروع Supabase.
3) لا تستخدم Secret key أو Service Role key في الموقع.
4) Project URL مضبوط بالفعل على:
https://vlxnqqvooxvgfnbczfdn.supabase.co

الصفحات:
- index.html = صفحة حجز العملاء
- admin.html = لوحة الإدارة

لوحة الإدارة تحتاج إنشاء مستخدم Admin من Supabase Authentication > Users.

قاعدة البيانات المطلوبة:
public.bookings مع سياسات RLS التي تم إنشاؤها في مشروع AlAsdiqaBookings2.
