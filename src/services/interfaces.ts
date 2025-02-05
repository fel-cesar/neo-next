export interface IService<T> {
  create(value: string): Promise<T>;
  delete(id: string): Promise<void>;
  getList({
    query,
    blocked,
    ordering,
  }: {
    query?: string;
    blocked?: boolean;
    ordering?: "asc" | "desc";
  }): Promise<T[]>;
  switchBlock({ id, block }: { id: string; block: boolean }): Promise<boolean>;
}
