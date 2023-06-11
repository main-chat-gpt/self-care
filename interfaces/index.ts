// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
  imageUrl: string;
  key: string;
  location: string;
  phone: string;
  lessonCount: number;
  lessonId: number;
};

export type Lesson = {
  id: number;
  name: string;
  text: string;
  userId: number;
}

export type UserLesson = {
  userId: string;
  lessonId: string;
  userName: string;
  lessonName: string;
}
