import { CourseComplete, CourseResponse, UserDto } from "@/types/types";
import { auth, basePath, PostSettings } from "./setting";

const getUsers = async (signal: AbortSignal) => {
  const resp = await fetch(`${basePath}user/users`, { signal });
  return resp.json();
};
const getAllUsers = async (): Promise<UserDto[]> => {
  const resp = await fetch(`${basePath}user/users`);
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  return resp.json();
};
const getUserById = async (id: number): Promise<UserDto> => {
  const resp = await fetch(`${basePath}info/user/byid?usr=${id}`); // TODO: this is wrong endpoint
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  return resp.json();
};
const loginUser = async (data: {
  email: string;
  password: string | number;
  type?: string;
}) => {
  const resp = await fetch(`${basePath}user/login`, PostSettings(data));
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  return resp.json();
};

const registerUser = async (data: UserDto) => {
  const resp = await fetch(`${basePath}user/add`, PostSettings(data));
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  return resp.json();
};

const verifyEmail = async (email: string) => {
  const resp = await fetch(`${basePath}user/exists/${email}`, auth);
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  return resp.text();
};

const doToken = async (data: { email: string; type: string }) => {
  const resp = await fetch(`${basePath}user/dotoken`, PostSettings(data));

  if (!resp.ok) {
    throw new Error(resp.statusText);
  }

  return resp.text();
};

const resetPass = async (data: {
  token: string | number;
  email: string;
  password: string | number;
  type: string;
}) => {
  const resp = await fetch(
    `${basePath}user/reset/password`,
    PostSettings(data)
  );
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  return resp.text();
};
const getAllNavigationItems = async () => {
  const resp = await fetch(`${basePath}rbac/menu`);

  if (!resp.ok) {
    throw new Error(resp.statusText);
  }

  return resp.json();
};
const getSideNavItems = async (role: string, acitve: boolean) => {
  const resp = await fetch(
    `${basePath}rbac/menu/?active=${acitve}&role=${role}`
  );

  if (!resp.ok) {
    throw new Error(resp.statusText);
  }

  return resp.json();
};
const addSubjectComplete = async (
  subject: CourseComplete
): Promise<CourseResponse> => {
  const resp = await fetch(
    `${basePath}classroom/subject/complete`, //TODO: Create endpoint
    PostSettings(subject)
  );
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  return resp.json();
};
export {
  getUsers,
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
  verifyEmail,
  doToken,
  resetPass,
  getAllNavigationItems,
  getSideNavItems,
  addSubjectComplete,
};
