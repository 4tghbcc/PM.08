/* Управление модальным окном */
let modalMode = null;

function setModalMode(mode){
  modalMode = mode;
}

function saveModal(){
  if (!modalMode) return closeModal();
  let ok = false;
  if (modalMode.type === 'dish') ok = saveDish();
  if (modalMode.type === 'ingredient') ok = saveIngredient();
  if (modalMode.type === 'staff') ok = saveStaff();
  if (modalMode.type === 'discount') ok = saveDiscount();
  if (ok !== false) closeModal();
}

document.addEventListener('DOMContentLoaded', () => {
  const backdrop = document.getElementById('modal-backdrop');
  if (backdrop){
    backdrop.addEventListener('click', (e) => {
      if (e.target.id === 'modal-backdrop') closeModal();
    });
  }
});
