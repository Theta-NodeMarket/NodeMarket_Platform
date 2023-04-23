import { createClient } from "@supabase/supabase-js";

class DbConfig {
  private readonly SupaBaseUrl: string;
  private readonly SupaBaseKey: string;
  public readonly SupaBase: any;

  constructor() {
    this.SupaBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
    this.SupaBaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
    this.SupaBase = createClient(this.SupaBaseUrl, this.SupaBaseKey);
  }
}

export const Db: DbConfig = new DbConfig();