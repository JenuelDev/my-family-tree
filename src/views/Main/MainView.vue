<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

function goBack() {
    history.back();
}
</script>
<template>
    <main class="h-[100vh] w-[100vw]">
        <div class="flex justify-between items-center h-[var(--header-height)] shadow px-10px z-99999">
            <div class="flex items-center gap-10px">
                <Icon v-show="route.path != '/main'" icon="ion:arrow-back" @click="goBack()" class="cursor-pointer" />
                <span>Dashboard</span>
            </div>
            <div>
                <Icon icon="mingcute:user-4-fill" />
            </div>
        </div>
        <div class="h-[calc(100%-var(--header-height))]">
            <RouterView />
        </div>
    </main>
</template>
