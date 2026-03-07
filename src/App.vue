<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import { app } from "./util/firebase";

app;

const route = useRoute();
let widgetObserver: MutationObserver | null = null;

function toggleBmcButton(path: string) {
    const bmcButton = document.getElementById("bmc-wbtn");

    if (!bmcButton) {
        return;
    }

    const shouldHide = /^\/main\/view\/[^/]+$/.test(path);
    bmcButton.style.display = shouldHide ? "none" : "flex";
}

watch(
    () => route.path,
    (currentPath) => {
        toggleBmcButton(currentPath);
    },
    { immediate: true }
);

onMounted(() => {
    // Re-apply visibility when external widget DOM is injected or updated.
    widgetObserver = new MutationObserver(() => {
        toggleBmcButton(route.path);
    });

    widgetObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });

    toggleBmcButton(route.path);
});

onUnmounted(() => {
    if (widgetObserver) {
        widgetObserver.disconnect();
        widgetObserver = null;
    }
});
</script>
<template>
    <RouterView />
</template>
