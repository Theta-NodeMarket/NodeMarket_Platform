import { Db } from "../../lib/supabaseClientConfig";
const DbClient = Db.SupaBase;

class AuthController {
  // On sign up create and save cookie on client when auth
  async SignUp(email: string, password: string): Promise<{data: any, error: any}> {
    let { data, error } = await DbClient.auth.signUp({
      email: email,
      password: password,
    });

    return {data, error};
  }

  // On sign in create and save cookie on client when auth
  // assuming there is no cookie already
  async SignIn(email: string, password: string): Promise<object> {
    let { data, error } = await DbClient.auth.signInWithPassword({
      email: email,
      password: password,
    });

    return data;
  }

  async GetUser(): Promise<any> {
    const { data } = await DbClient.auth.getUser();
    return data;
  }

  async SignOut(): Promise<any> {
    let { error } = await DbClient.auth.signOut();
  }
}

export const AuthControl = new AuthController();
