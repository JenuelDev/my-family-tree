<script setup lang="ts">
import HeaderComponent from "@/components/Header/HeaderComponent.vue";
import FamilyTreeComponent from "@/components/FamilyTree/FamilyTreeComponent.vue";
</script>
<template>
    <main class="h-[100vh] w-[100vw]">
        <HeaderComponent :is-for-public="true" />
        <div class="h-[calc(100%-var(--header-height))]">
            <FamilyTreeComponent :is-for-public="true" />
        </div>
    </main>
</template>
