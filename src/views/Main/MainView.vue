<script setup lang="ts">
import { isAlreadyLoggedIn } from "@/util/auth";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import HeaderComponent from "@/components/Header/HeaderComponent.vue";
import { useUserStore } from "@/stores/main";
import { isLogged } from "@/util/firebase";
const router = useRouter();
const userStore = useUserStore();

onBeforeMount(async () => {
    try {
        const data = await isLogged;
        userStore.user = data as any;
    } catch (e) {
        router.push("/");
    }
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
