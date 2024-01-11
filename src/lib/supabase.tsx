import { SupabaseClient, createClient } from "@supabase/supabase-js";

// import 'react-native-url-polyfill/auto';
import { Database } from "../../supabase/database.types";

export const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
export const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

export const supabase: SupabaseClient = createClient<Database>(
  supabaseUrl,
  supabaseKey,
);

// useEffect(() => {
//   getCountries();
// }, []);

// async function getCountries() {
//   const { data } = await supabase.from("countries").select();
//   setCountries(data);
// }
