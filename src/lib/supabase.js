import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// So, this file basically creates a Supabase Client that is used to communicate between the code and Supabase database. The client is basically a javascript object that stores the project URL (which database) and the anon key (to confirm that the user is allowed to access the features of this database) and then can be used to service requests made by the frontend. So, whenever we want to change something in the database, we import this file and it already knows which database and all the details and then we can make required changes in the database.

//import.meta.env is the way to acces variables in the .env file when using Vite. It can only access variables that start with VITE_. We store both the keys and then we create a Supababse client that can comunicate between the database and the frontend and keeps the keys handy for any request made to the database. We use the keyword 'export' so that we can use this supabase client anywhere in our code (it can be imported in any file).