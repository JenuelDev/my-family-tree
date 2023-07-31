<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import {
    FacebookAuthProvider,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
} from "firebase/auth";
import { app } from "@/util/firebase";
import { useUserStore } from "@/stores/main";
import { Loading, Report } from "notiflix";
import SnapStorage from "snap-storage";

const userStore = useUserStore();
const router = useRouter();

function googleSignIn() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            userStore.user = user as any;
        })
        .catch(() => {
            alert("Their is An Error Signing In.");
        });
}

async function githubSignIn() {
    const auth = getAuth(app);
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            userStore.user = user as any;
        })
        .catch((e) => {
            try {
                const message: string = (e.message as string).replace(/[()/-]/g, " ");
                Report.failure("Cant Login", message, "OK");
            } catch (e) {
                alert("Error Signing In in GitHub Provider.");
            }
        });
}

async function facebookSignIn() {
    const auth = getAuth(app);
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            userStore.user = user as any;
        })
        .catch((e) => {
            try {
                const message: string = (e.message as string).replace(/[()/-]/g, " ");
                Report.failure("Cant Login", message, "OK");
            } catch (e) {
                alert("Error Signing In in GitHub Provider.");
            }
        });
}

onMounted(async () => {
    Loading.hourglass();
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        userStore.user = user as any;
        SnapStorage.set("current-user", user);
        if (user) router.push("/main");
        Loading.remove();
    });
});
</script>

<template>
    <div class="w-300px mx-auto mt-5 shadow p-10px bg-white">
        <div class="flex flex-col items-center mb-5">
            <img src="@/assets/Logo/Logo.svg" width="150" />
            <h2 class="m-0">FamsTree</h2>
            <p class="text-center">
                Creating a family tree is important for preserving heritage, connecting family members, understanding
                genealogy, and passing down knowledge to future generations.
            </p>
        </div>
        <div class="text-center my-2 p-0">Sign in:</div>
        <div class="flex flex-col gap-10px">
            <button
                @click="googleSignIn()"
                class="text-size-30px pt-2 border-none shadow-md hover:shadow-lg transition-all cursor-pointer rounded-sm hover:rounded-lg bg-gray-1 hover:bg-gray-3"
            >
                <Icon icon="logos:google" />
            </button>
            <button
                @click="githubSignIn()"
                class="text-size-30px pt-2 border-none shadow-md hover:shadow-lg transition-all cursor-pointer rounded-sm hover:rounded-lg bg-gray-1 hover:bg-gray-3"
            >
                <Icon icon="ri:github-fill" />
                <Icon icon="octicon:logo-github-16" />
            </button>
            <button
                @click="facebookSignIn()"
                class="pt-2 border-none shadow-md hover:shadow-lg transition-all cursor-pointer rounded-sm hover:rounded-lg bg-gray-1 hover:bg-gray-3 flex items-center justify-center gap-3 pb-2"
            >
                <Icon class="text-size-25px" icon="logos:facebook" />
                <span class="text-size-20px">Facebook</span>
            </button>
        </div>
    </div>
</template>
