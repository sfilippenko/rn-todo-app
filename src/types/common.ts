export interface TodoItem {
  id: number;
  title: string;
}

export interface Action<Payload = any> {
  type: string;
  payload: Payload;
}
