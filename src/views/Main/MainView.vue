<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderComponent from "@/components/Header/HeaderComponent.vue";
import { app } from "@/util/firebase";
import { toAuthSnapshot } from "@/util/auth";
import { Loading } from "notiflix";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "@/stores/main";
import SnapStorage from "snap-storage";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore()

const isFullBleedView = computed(() => route.name === "view-family-tree");

onBeforeMount(async () => {
    Loading.hourglass()
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        const previousUid = userStore.user?.uid || null;
        const safeUser = toAuthSnapshot(user);
        userStore.user = safeUser;

        if (!safeUser || safeUser.uid !== previousUid) {
            userStore.families = [];
        }

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
    <main class="h-[100vh] w-[100vw] bg-[radial-gradient(circle_at_top_left,_#e0f2fe_0%,_#eef2ff_32%,_#f8fafc_65%,_#ecfeff_100%)]">
        <HeaderComponent />
        <div
            class="h-[calc(100%-var(--header-height))]"
            :class="isFullBleedView ? 'overflow-hidden px-0 pb-0 pt-0' : 'overflow-y-auto px-4 pb-6 pt-4 sm:px-6 lg:px-8'"
        >
            <div :class="isFullBleedView ? 'h-full w-full' : 'mx-auto max-w-6xl'">
                <RouterView />
            </div>
        </div>
    </main>
</template>
