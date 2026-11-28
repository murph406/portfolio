/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Public: copied into the browser bundle. Undefined when there is no env file, so default to ""
  readonly VITE_API_URL?: string
}
