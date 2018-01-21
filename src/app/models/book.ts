export interface Book {
  _id: string,
  name: string,
  owner: {
    _id: string,
    fullName: string
  },
}
