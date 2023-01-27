import { ReactNode } from 'react';

export interface IAlert {
  content?: ReactNode;
  severity?: 'error' | 'info' | 'success' | 'warning';
  duration?: number;
  modal?: boolean;
  close?: () => void;
}
