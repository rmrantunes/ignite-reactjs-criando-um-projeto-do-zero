import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function formatDate(date: Date): string {
  return format(date, 'dd LLL yyyy', { locale: ptBR });
}
