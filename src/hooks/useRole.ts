import { Roles } from "@/lib/withRole";
import { useUser } from "@supabase/auth-helpers-react";

export const useRole = () => {
  const user = useUser();
  return {
    user,
    role: user?.user_metadata.role as Roles,
  };
};
