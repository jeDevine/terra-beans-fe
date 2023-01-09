import Photo from "./photo";

export default interface Account {
  _id?: string;
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
  uploadedPhotos: Photo[];
}
