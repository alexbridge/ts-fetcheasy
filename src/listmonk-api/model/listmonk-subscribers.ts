export type ListmonkAddSubscriber = {
  email: string;
  name: string;
  status: string;
  lists: number[];
};

export type ListmonkSubscriber = {
  id: string;
  created_at: string;
  updated_at: string;
  uuid: string;
  email: string;
  name: string;
  attribs: unknown;
  status: string;
  lists: number[];
};
