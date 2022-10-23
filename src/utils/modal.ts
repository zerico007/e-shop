export function openModal(modalId: string) {
  const modal = document.getElementById(modalId) as HTMLDialogElement;
  if (modal) {
    modal.showModal();
  }
}

export function closeModal(modalId: string) {
  const modal = document.getElementById(modalId) as HTMLDialogElement;
  if (modal) {
    modal.close();
  }
}
