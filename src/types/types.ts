export type CommonUserProps = {
  id?: string;
  firstname: string;
  lastname?: string;
  email: string;
  phone?: string;
  token?: string;
  updatedOn?: string; // representing ISO date string
  roles?: string[];
  status?: boolean;
  photo?: string;
  gender?: string;
};

export type UserDto = CommonUserProps & {
  country?: string;
  password: string;
  type: string;
  modifiedOn?: string; // representing ISO date string
  dp?: string;
  message?: string;
  courses?: string[];
  rating?: number;
  reviews?: string[];
};
export interface UserResp {
  id: string;
  name: string;
  email: string;
}
export interface CurriculumMap {
  topic: TopicDto[];
  requirement: string[];
  objective: string[];
}
export interface CourseCreate {
  id?: string;
  user: string;
  courseName: string;
  category?: string;
  target?: string;
  brief?: string;
  overview?: string;
  price?: number;
  tax?: number;
  thumbnail?: string;
  draft?: string;
  currency?: string;
  createdOn?: Date;
  updatedOn?: Date;
}

export interface CourseResponse {
  courseId: string;
  courseName: string;
  author: UserResp;
  category: string;
  target: string;
  curriculum: CurriculumMap;
  brief: string;
  price: number;
  tax: number;
  posts: PostResponse[];
  signed: Record<string, string>[];
  assetCount: Record<string, number>;
  createdOn: string; // LocalDateTime (ISO string)
  thumbnail: string;
  updatedOn: string; // LocalDate (ISO string)
  totalSteps: number;
  draft: boolean;
  isRegistered: boolean;
}
export interface PostResponse {
  id: string;
  content: string;
  createdOn: string; // LocalDateTime (ISO string)
}

export interface CourseComplete extends CourseCreate {
  topics: TopicDto[];
}
export type TopicDto = {
  id?: string;
  title: string;
  description: string;
  cid: string;
  orderIndex?: number;
  lessons: LessonDto[];
  dueDate?: Date;
  createdOn?: Date;
  updatedOn?: Date;
};
export type LessonDto = {
  id?: string;
  tid: string;
  title: string;
  video?: string;
  type: string;
  content?: string;
  orderIndex?: number;
  dueDate?: Date;
  createdOn?: Date;
  updatedOn?: Date;
};
