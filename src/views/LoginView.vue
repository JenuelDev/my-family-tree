<script lang="ts" setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import type { AuthProvider } from "firebase/auth";
import {
    FacebookAuthProvider,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup
} from "firebase/auth";
import { app } from "@/util/firebase";
import { toAuthSnapshot } from "@/util/auth";
import { useUserStore } from "@/stores/main";
import { Loading, Report } from "notiflix";
import SnapStorage from "snap-storage";
import LogoPng from "./../assets/Logo/logo.png";

const logo = LogoPng;
const userStore = useUserStore();
const router = useRouter();

function getReadableAuthError(error: unknown, providerName: string) {
    if (error instanceof Error && error.message) {
        return error.message.replace(/[()/-]/g, " ");
    }

    return `Error signing in with ${providerName}.`;
}

async function signInWithProvider(provider: AuthProvider, providerName: string) {
    const auth = getAuth(app);

    try {
        const result = await signInWithPopup(auth, provider);
        userStore.user = toAuthSnapshot(result.user);
    } catch (error) {
        Report.failure("Can't Login", getReadableAuthError(error, providerName), "OK");
    }
}

function googleSignIn() {
    return signInWithProvider(new GoogleAuthProvider(), "Google");
}

function githubSignIn() {
    return signInWithProvider(new GithubAuthProvider(), "GitHub");
}

function facebookSignIn() {
    return signInWithProvider(new FacebookAuthProvider(), "Facebook");
}

onMounted(async () => {
    Loading.hourglass();
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        const safeUser = toAuthSnapshot(user);
        userStore.user = safeUser;

        if (safeUser) {
            SnapStorage.set("current-user", safeUser);
            router.replace("/main");
        } else {
            SnapStorage.remove("current-user");
        }

        Loading.remove();
    });
});
</script>

<template>
    <main
        class="min-h-screen bg-[radial-gradient(circle_at_top_left,_#dbeafe_0%,_#f8fafc_36%,_#ecfeff_100%)] px-4 pb-16 pt-8 font-['Manrope',_'Segoe_UI',_sans-serif] sm:px-6 sm:pt-12"
    >
        <section class="mx-auto w-full max-w-md rounded-3xl border border-white/70 bg-white/85 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur sm:p-7">
            <div class="flex flex-col items-center text-center">
                <img alt="FamTree Logo" :src="logo" class="h-24 w-24 rounded-2xl border border-white bg-white p-1 object-cover shadow" />
                <h1 class="mt-3 text-3xl font-800 text-slate-900">FamTree</h1>
                <p class="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
                    Preserve heritage, map relationships, and share family stories in one secure and modern workspace.
                </p>
            </div>

            <div class="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-700">
                Sign in to save your work and continue on any device.
            </div>

            <div class="mt-4 flex flex-col gap-3">
                <button
                    type="button"
                    class="appearance-none border-none flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-white px-4 py-3 text-slate-800 shadow-[0_3px_10px_rgba(15,23,42,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(15,23,42,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70"
                    @click="googleSignIn()"
                >
                    <Icon class="text-2xl" icon="logos:google" />
                    <span class="font-700">Continue with Google</span>
                </button>

                <button
                    type="button"
                    class="appearance-none border-none flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-white px-4 py-3 text-slate-800 shadow-[0_3px_10px_rgba(15,23,42,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(15,23,42,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70"
                    @click="githubSignIn()"
                >
                    <Icon class="text-2xl" icon="ri:github-fill" />
                    <span class="font-700">Continue with GitHub</span>
                </button>

                <button
                    type="button"
                    class="appearance-none border-none flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-white px-4 py-3 text-slate-800 shadow-[0_3px_10px_rgba(15,23,42,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(15,23,42,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70"
                    @click="facebookSignIn()"
                >
                    <Icon class="text-2xl" icon="logos:facebook" />
                    <span class="font-700">Continue with Facebook</span>
                </button>
            </div>

            <div class="my-5 text-center text-xs font-700 uppercase tracking-[0.18em] text-slate-400">or</div>

            <div class="rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4">
                <p class="text-center text-sm text-cyan-900">Create now and save on this device.</p>
                <RouterLink
                    class="mt-3 block w-full cursor-pointer rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-700 text-white no-underline transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/70"
                    to="/public-edit"
                >
                    Create FamTree
                </RouterLink>
            </div>
        </section>

        <footer class="mx-auto mt-4 flex w-full max-w-md flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/70 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            <RouterLink class="font-600 text-slate-700 no-underline transition hover:text-slate-900" to="/privacy-policy">
                Privacy Policy
            </RouterLink>
            <span class="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
            <a
                href="https://www.jenuel.dev"
                class="font-700 tracking-wide text-slate-900 no-underline transition hover:text-cyan-700"
                rel="noopener noreferrer"
                target="_blank"
            >
                Jenuel.Dev
            </a>
        </footer>
    </main>
</template>
