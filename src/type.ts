import type { ReactNode } from 'react';

export type CardItemProps = {
  missionName: string;
  rocketName?: string;
  image?: string;
  details?: string;
};

export type CardProp = {
  mission_name: string;
  rocket?: {
    rocket_name?: string;
  };
  links?: {
    mission_patch_small?: string;
  };
  details?: string;
};

export type State = {
  cards: CardProp[];
  loading: boolean;
  error: string | null;
};

export type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: CardProp[] }
  | { type: 'FETCH_ERROR'; payload: string };

export type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export type CardListProps = {
  cards: CardItemProps[];
};
