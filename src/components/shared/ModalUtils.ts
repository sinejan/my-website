// Modal utility for opening/closing and body scroll lock
export function openModal(modalId: string) {
  document.body.classList.add('modal-open');
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

export function closeModal(modalId: string) {
  document.body.classList.remove('modal-open');
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

export function closeAllModals() {
  document.body.classList.remove('modal-open');
  document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
}
