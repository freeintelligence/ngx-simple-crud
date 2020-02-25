import { Paginator } from './paginator.interface';
import { FilterEvent } from './filter-event.interface';

export interface Service {
  filter?: (event: FilterEvent) => Promise<Paginator>;
}