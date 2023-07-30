<script setup lang="ts">
import { onMounted } from "vue";
import FamilyTreeComponent from "@/components/FamilyTree/FamilyTreeComponent.vue";

onMounted(() => {
    window.addEventListener("keydown", (event) => {
        if (event.code === "Escape") {
            history.back();
        }
    });
});
</script>

<template>
    <FamilyTreeComponent />
</template>
