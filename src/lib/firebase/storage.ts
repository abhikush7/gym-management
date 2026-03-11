import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from './config';

export async function upload(path: string, file: File): Promise<string> {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function deleteFile(path: string): Promise<void> {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}

export function getProfilePhotoPath(userId: string, fileName: string): string {
  return `profiles/${userId}/${fileName}`;
}

export function getTrainerPhotoPath(trainerId: string, fileName: string): string {
  return `trainers/${trainerId}/${fileName}`;
}

export function getTransformationPath(userId: string, fileName: string): string {
  return `transformations/${userId}/${fileName}`;
}
