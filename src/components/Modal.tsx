import { createPortal } from 'react-dom';
import type { ModalProps } from '../type';

export default function Modal({ children, onClose }: ModalProps) {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null; // обработать отсутствие модального корня

  return createPortal(
    <div className="modal">
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        style={{ position: 'relative' }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'transparent',
            border: 'none',
            fontSize: 30,
            color: 'black',
            cursor: 'pointer',
          }}
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
