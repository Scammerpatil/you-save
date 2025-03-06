export interface SavedLink {
  _id?: string;
  user: string;
  url: string;
  folder?: string;
  category: string;
  title: string;
  platform: string;
  tags?: string[];
  createdAt: Date;
}
