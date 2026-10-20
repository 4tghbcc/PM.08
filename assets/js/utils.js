/* Утилиты общего назначения */
function escapeHtml(str){
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function escapeAttr(str){ return escapeHtml(str); }

function formatDate(iso){
  const [y,m,d] = iso.split('-');
  return `${d}.${m}.${y}`;
}

function formatMoney(n){
  return Number(n).toLocaleString('ru-RU');
}

/* Универсальное открытие/закрытие модального окна */
function openModal(){
  document.getElementById('modal-backdrop').classList.remove('hidden');
}
function closeModal(){
  document.getElementById('modal-backdrop').classList.add('hidden');
  if (typeof modalMode !== 'undefined') modalMode = null;
}
