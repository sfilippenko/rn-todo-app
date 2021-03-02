export interface TodoItem {
  id: string;
  title: string;
}

export interface Action<Payload = any> {
  type: string;
  payload: Payload;
}
