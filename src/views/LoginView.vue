<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { getAuth, signInWithCustomToken, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { app } from "@/util/firebase";
import { isAlreadyLoggedIn } from "@/util/auth";
import { useUserStore } from "@/stores/main";
import { Loading } from "notiflix";
const provider = new GoogleAuthProvider();

const userStore = useUserStore();
const router = useRouter();
const form = reactive({
    email: null,
    password: null,
});

function googleSignIn() {
    const auth = getAuth(app);
    Loading.hourglass();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            userStore.user = user as any;
            // IdP data available using getAdditionalUserInfo(result)
            router.push("/main");
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        })
        .finally(() => {
            Loading.remove();
        });
}

onMounted(() => {
    Loading.hourglass();
    isAlreadyLoggedIn({
        state: (data: Object | boolean) => {
            Loading.remove();
            if (data) router.push("/main");
        },
    });
});
</script>

<template>
    <div class="w-300px flex flex-col mx-auto mt-5 shadow p-10px gap-15px">
        <div>Login:</div>
        <button @click="googleSignIn()" class="text-size-30px pt-2">
            <Icon icon="logos:google" />
        </button>
    </div>
</template>
