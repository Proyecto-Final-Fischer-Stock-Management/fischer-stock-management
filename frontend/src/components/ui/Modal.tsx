import { useEffect, useId, useRef, type ReactNode } from "react";

type ModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
  danger?: boolean;
  busy?: boolean;
};

export default function Modal({ title, children, onClose, danger = false, busy = false }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => { dialog?.close(); };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-busy={busy}
      onCancel={(event) => { event.preventDefault(); if (!busy) onClose(); }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-32px)] max-w-64 overflow-y-auto rounded-md border border-gray-200 bg-white px-5 py-6 text-center text-xs text-black shadow-xl backdrop:bg-black/55"
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E60000] text-white">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-9 w-9">
          {danger ? <path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7" strokeLinecap="round" strokeLinejoin="round" /> : <path d="m5 12 5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />}
        </svg>
      </div>
      <h2 id={titleId} className="mb-3 font-bold">{title}</h2>
      {children}
    </dialog>
  );
}