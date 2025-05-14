import { SET_USER } from "@/context/Action";
import { AppDpx } from "@/context/AppContext";
import { getAllUsers, getUserById } from "@/rest/api";
import { UserDto } from "@/types/types";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { useQuery } from "react-query";

const useUser = () => {
  const dispatch = useContext(AppDpx);
  const { data: session } = useSession();

  const setUser = () => {
    if (session?.user) {
      const roles = session?.user?.roles?.map((role: string) => role as string);
      const user: UserDto = {
        roles: roles || ["GUEST"],
        id: session.user.id,
        email: session.user.email,
        firstname: session?.user?.firstname || "",
        lastname: session?.user?.name || "",
        gender: "",
        password: "",
        type: "USER",
      };
      dispatch({ type: SET_USER, payload: user });
    }
  };

  const removeUser = () => {
    dispatch({ type: SET_USER, payload: null });
    signOut({ redirect: false });
  };

  return {
    user: session?.user,
    isAuthenticated: !!session,
    setUser,
    removeUser,
  };
};

export default useUser;

export const useGetUsers = () => {
  const {
    data: allUsers,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsers,
    initialData: [],
  });

  return { allUsers, error, isLoading };
};

export const useGetUserById = (userId: number) => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user-by-id", userId],
    queryFn: () => getUserById(userId),
    initialData: null,
    enabled: !!userId,
  });

  return { user, error, isLoading };
};
