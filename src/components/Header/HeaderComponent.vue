<script lang="ts" setup>
import { useUserStore } from "@/stores/main";
import { Icon } from "@iconify/vue";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onClickOutside } from "@vueuse/core";
import LogoPng from "./../../assets/Logo/logo.png";
const logo = LogoPng;
const props = defineProps({
    isForPublic: {
        type: Boolean,
        default: false
    }
});
const profileMenuRef = ref(null);
const data = reactive({
    showProfileMenu: false,
});
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

function goBack() {
    history.back();
}

onClickOutside(profileMenuRef, () => (data.showProfileMenu = false));

async function logout() {
    await userStore.signOut();
}
</script>
<template>
    <div class="flex justify-between items-center h-[var(--header-height)] shadow px-10px z-99999 bg-white">
        <div class="flex items-center gap-10px">
            <Icon v-show="route.path != '/main'" class="cursor-pointer" icon="ion:arrow-back" @click="goBack()" />
            <img alt="Fams Tree Logo" height="40" :src="logo" />
            <span class="capitalize font-bold">{{ props.isForPublic ? "FamTree Editor" : route.name }}</span>
        </div>
        <div>
            <div v-if="props.isForPublic">📂</div>
            <div v-else class="relative">
                <div
                    class="flex items-center gap-1 cursor-pointer transform scale-100 active:scale-95 transition-all select-none duration-100"
                    @click="data.showProfileMenu = !data.showProfileMenu"
                >
                    <span class="text-size-23px">
                        <Icon icon="mingcute:user-4-fill" />
                    </span>
                    {{ userStore.userDisplayName }}
                </div>
                <div
                    v-show="data.showProfileMenu"
                    ref="profileMenuRef"
                    class="absolute right-0 top-35px min-w-200px bg-white p-3 z-99999 border border-black shadow-lg rounded-lg"
                >
                    <div
                        class="hover:bg-gray-2 cursor-pointer p-1 rounded-md flex items-center"
                        @click="router.push('/privacy-policy')"
                    >
                        <Icon icon="material-symbols:privacy-tip" />
                        <span class="ml-3">Privacy Policy</span>
                    </div>
                    <div class="hover:bg-gray-2 cursor-pointer p-1 rounded-md flex items-center" @click="logout()">
                        <Icon icon="solar:logout-3-broken" />
                        <span class="ml-3">Logout</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
