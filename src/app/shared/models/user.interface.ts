export interface User {
  _id: string;
  name: string;
  email: string;
  photo: string;
  username?: string;
  cover: string | null;
}
