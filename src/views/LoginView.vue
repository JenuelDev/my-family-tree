<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
// import { addFamily } from "@/util/firebase";
import { getAuth, signInWithCustomToken, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { app } from "@/util/firebase";
import { isAlreadyLoggedIn } from "@/util/auth";
import { useUserStore } from "@/stores/main";
const provider = new GoogleAuthProvider();

const userStore = useUserStore();
const router = useRouter();
const form = reactive({
    email: null,
    password: null,
});

async function login() {
    // router.push("/main");
    // await addFamily();

    const auth = getAuth();
    signInWithCustomToken;
}

function googleSignIn() {
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            userStore.user = user as any;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
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
        });
}

onMounted(() => {
    isAlreadyLoggedIn({
        state: (data: Object | boolean) => {
            if (data) router.push("/main");
        },
    });
});
</script>

<template>
    <form @submit.prevent="login" class="w-300px flex flex-col mx-auto mt-5 shadow p-10px gap-15px">
        <div class="w-full">
            <div>Email Address</div>
            <input
                type="text"
                v-model="form.email"
                placeholder="ex. example@gmail.com"
                class="w-full p-2 rounded-md border-none"
            />
        </div>
        <div>
            <div>Password</div>
            <input
                type="password"
                v-model="form.password"
                placeholder="enter your password"
                class="w-full p-2 rounded-md border-none"
            />
        </div>
        <button
            type="submit"
            class="rounded-md border-none p-2 cursor-pointer transform scale-100 active:scale-95 transition-all"
        >
            Login
        </button>
        <span>- OR -</span>
        <button @click="googleSignIn()">
            <Icon icon="devicon:google" />
        </button>
    </form>
</template>
