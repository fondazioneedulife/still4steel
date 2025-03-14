export type Widget = {
  id: string;
  type: 'utenti' | 'vendite' | 'magazzino' | 'dipendenti' | 'fatturato' | 'ordini-pendenti' | 'clienti-attivi' | 'spese-aziendali' | 'prodotti-piu-venduti' | 'calendario-mensile' | 'calendario-settimanale' | 'calendario-giornaliero' | 'calcolatrice' | 'tasklist' | 'notes' | 'pie' | 'line-area';
  title: string;
  data: { name: string; value: number }[] | { start: Date; end: Date; title: string }[];
  theme: 'light' | 'dark';
  color: string;
};