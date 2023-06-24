<script setup lang="ts">
import { addFamily } from "@/util/firebase";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();

async function test() {
    await addFamily();
}
</script>
<template>
    <div class="p-10px">
        <h3>Your List of Family Tree</h3>
        <button @click="test">test</button>
        <ul>
            <li>
                Your First Item
                <button @click="router.push({ name: 'view-family-tree' })"><Icon icon="carbon:view-filled" /></button>
            </li>
            <li>
                Maswena Clan
                <button @click="router.push({ name: 'view-family-tree' })"><Icon icon="carbon:view-filled" /></button>
            </li>
            <li>
                Awisan Clan
                <button @click="router.push({ name: 'view-family-tree' })"><Icon icon="carbon:view-filled" /></button>
            </li>
        </ul>
    </div>
</template>
