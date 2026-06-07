import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})

//So, basically, when we run the project (npm run dev), Vite looks for the 'export default' option and executes it. We are basically importing React and Tailwind CSS translators (plugins) that will basically translate the code written into basic HTML, CSS nad JS (in the case of React) and normal CSS from prexisting classes(in the case of Tailwind CSS) so that it can be executed by the browser. Defineconfig is basically a tool to define the settings or the rules that Vite needs to follow to execute the code. It can include the server (local host) where program has to run, plugins (translators), aliases etc. 