import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../components/auth/AuthProvider";

export const useRegistration = (key: string, mutationFn: any) => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { mutate, error } = useMutation({
    mutationKey: [key],
    mutationFn,
    onSuccess: (data: { token: string }) => {
      setToken?.(data.token);
      navigate("/");
    },
    onError: (error) => console.log(error),
  });

  return { mutate, error };
};
