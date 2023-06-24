<script setup lang="ts">
import { RouterView } from "vue-router";
import { app } from "./util/firebase";

app;
</script>
<template>
    <RouterView />
</template>
