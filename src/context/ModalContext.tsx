import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

export type ModalType =
  | 'login'
  | 'booking'
  | 'contact'
  | 'subscribe'
  | 'placeholder';

export interface BookingModalData {
  hotel: string;
  room: string;
  arrivalDate: string;
  departureDate: string;
  adults: number;
  children: number;
  rooms: number;
  total?: string;
}

export interface ModalState {
  type: ModalType;
  title?: string;
  message?: string;
  booking?: BookingModalData;
}

interface ModalContextValue {
  modal: ModalState | null;
  openModal: (state: ModalState) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState | null>(null);

  const openModal = useCallback((state: ModalState) => setModal(state), []);
  const closeModal = useCallback(() => setModal(null), []);

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}
