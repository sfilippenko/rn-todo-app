export interface TodoItem {
  id: string;
  title: string;
  createdAt: number;
}

export interface Action<Payload = any> {
  type: string;
  payload: Payload;
}
