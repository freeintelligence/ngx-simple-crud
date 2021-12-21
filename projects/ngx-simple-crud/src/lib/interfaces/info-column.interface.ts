export interface InfoColumn {
  title: string;
  property?: string;
  method?: (element: any) => any;
}