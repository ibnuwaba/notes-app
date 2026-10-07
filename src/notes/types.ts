export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  pinned: boolean;
  archived: boolean;
};

export type View = "all" | "pinned" | "archived";