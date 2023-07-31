<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { app } from "@/util/firebase";
import { useUserStore } from "@/stores/main";
import { Loading } from "notiflix";
const provider = new GoogleAuthProvider();

const userStore = useUserStore();
const router = useRouter();

function googleSignIn() {
    const auth = getAuth(app);
    Loading.hourglass();
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            userStore.user = user as any;
        })
        .catch(() => {
            alert("Their is An Error Signing In.");
        })
        .finally(() => {
            Loading.remove();
        });
}

onMounted(async () => {
    Loading.hourglass()
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        if (user) router.push('/main');
        Loading.remove()
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
