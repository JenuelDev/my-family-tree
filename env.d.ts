/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string,
    readonly VITE_FIREBASE_apiKey: string,
    readonly VITE_FIREBASE_authDomain: string,
    readonly VITE_FIREBASE_projectId: string,
    readonly VITE_FIREBASE_storageBucket: string,
    readonly VITE_FIREBASE_messagingSenderId: string,
    readonly VITE_FIREBASE_appId: string,
    readonly VITE_FIREBASE_measurementId: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

