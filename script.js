const $ = id => document.getElementById(id);
const supabaseClient = (window.supabase && SUPABASE_PUBLISHABLE_KEY !== 'PUT_YOUR_PUBLISHABLE_KEY_HERE') ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) : null;
const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); $('date').min = d.toISOString().slice(0,10); $('year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-service]').forEach(b => b.onclick = () => { $('service').value = b.dataset.service; $('booking').scrollIntoView({behavior:'smooth'}); });
function makeCode(){ return 'AS-' + Math.random().toString(36).slice(2,6).toUpperCase() + Date.now().toString().slice(-5); }
function whatsappUrl(id){ const msg = `طلب صيانة - الأصدقاء لفلاتر المياه\nرقم الطلب: ${id}\nالخدمة: ${$('service').value}\nالفلتر: ${$('filter').value}\nالاسم: ${$('name').value}\nالموبايل: ${$('phone').value}\nالتاريخ: ${$('date').value}\nالوقت: ${$('time').value}\nالعنوان: ${$('address').value}\nملاحظات: ${$('notes').value || 'لا يوجد'}`; return 'https://wa.me/201014763597?text=' + encodeURIComponent(msg); }
$('form').onsubmit = async e => { e.preventDefault(); $('error').hidden = true; $('submit').disabled = true; $('submit').textContent = 'جاري تسجيل الطلب…';
  if(!supabaseClient){ $('error').textContent = 'الموقع لم يتم إعداد مفتاح Supabase بعد. افتح ملف config.js وضع Publishable Key الخاص بالمشروع.'; $('error').hidden = false; $('submit').disabled=false; $('submit').textContent='تأكيد طلب الصيانة'; return; }
  const booking_code = makeCode(); const payload = { booking_code, customer_name:$('name').value.trim(), phone:$('phone').value.trim(), service:$('service').value, filter_type:$('filter').value, booking_date:$('date').value, booking_time:$('time').value, address:$('address').value.trim(), notes:$('notes').value.trim() || null };
  const { error } = await supabaseClient.from('bookings').insert([payload]);
  if(error){ console.error(error); $('error').textContent = 'حصلت مشكلة أثناء تسجيل الطلب. تأكد من الاتصال بالإنترنت ثم حاول مرة أخرى.'; $('error').hidden=false; $('submit').disabled=false; $('submit').textContent='تأكيد طلب الصيانة'; return; }
  $('num').textContent='رقم الطلب: '+booking_code; $('wa').href=whatsappUrl(booking_code); $('form').hidden=true; $('ok').hidden=false; $('booking').scrollIntoView({behavior:'smooth'});
};
$('new').onclick=()=>{ $('form').reset(); $('form').hidden=false; $('ok').hidden=true; $('submit').disabled=false; $('submit').textContent='تأكيد طلب الصيانة'; $('date').min=d.toISOString().slice(0,10); };
