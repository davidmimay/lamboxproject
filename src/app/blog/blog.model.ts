export interface PostI {
  titlePost: string;
  contentPost: string;
  imagePost?: any;
  id?: string;
  tagsPost: string;
  fileRef?: string;
}

export interface FileI {
  name: string;
  imageFile: File;
  size: string;
  type: string;
}

export interface UserI {
  email: string;
  password?: string;
  displayName?: string;
  photoURL?: string;
  uid?: string;
  phoneNumber?: string;
}