<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import HeaderComponent from "@/components/Header/HeaderComponent.vue";
import { app } from "@/util/firebase";
import { toAuthSnapshot } from "@/util/auth";
import { Loading } from "notiflix";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "@/stores/main";
import SnapStorage from "snap-storage";

const router = useRouter();
const userStore = useUserStore()

onBeforeMount(async () => {
    Loading.hourglass()
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        const safeUser = toAuthSnapshot(user);
        userStore.user = safeUser;

        if (safeUser) {
            SnapStorage.set('current-user', safeUser);
        } else {
            SnapStorage.remove('current-user');
            router.replace('/login');
        }

        Loading.remove()
    });
});
</script>
<template>
    <main class="h-[100vh] w-[100vw]">
        <HeaderComponent />
        <div class="h-[calc(100%-var(--header-height))]">
            <RouterView />
        </div>
    </main>
</template>
