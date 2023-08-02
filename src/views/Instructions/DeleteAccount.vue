<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<template>
    <div class="max-w-350px mx-auto mt-3">
        <div
            class="flex items-center gap-2 p-2 shadow-none hover:shadow-md cursor-pointer select-none mb-5"
            @click="router.push('/')"
        >
            <Icon icon="ion:chevron-back-sharp" />
            Back
        </div>
        <div class="px-10px">
            <h2>How To Delete Account?</h2>
            Do delete you account on this platform. Please send a request to this email address
            <b>`jenuelganawed936@gmail.com`</b>
        </div>
    </div>
</template>
