export interface AlertInterface {
  state?: 'success' | 'warning' | 'error' | 'loading';
  show: boolean;
  text: string;
}
