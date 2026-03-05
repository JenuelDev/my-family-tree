<script lang="ts" setup>
import { useUserStore } from "@/stores/main";
import type { AuthSnapshot } from "@/util/auth";
import { Icon } from "@iconify/vue";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onClickOutside } from "@vueuse/core";
import LogoPng from "./../../assets/Logo/logo.png";
const logo = LogoPng;
const props = defineProps({
    isForPublic: {
        type: Boolean,
        default: false,
    },
});
const profileMenuRef = ref(null);
const showProfileMenu = ref(false);
const avatarLoadFailed = ref(false);
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const providerNameMap: Record<string, string> = {
    "google.com": "Google",
    "github.com": "GitHub",
    "facebook.com": "Facebook",
    password: "Email/Password",
    phone: "Phone",
};

function inferProviderFromUser(user: AuthSnapshot | null) {
    if (!user) return "Not available";

    if (user.providerName && !/unknown/i.test(user.providerName)) {
        return user.providerName;
    }

    if (user.providerId && providerNameMap[user.providerId]) {
        return providerNameMap[user.providerId];
    }

    const photo = user.photoURL?.toLowerCase() || "";
    if (photo.includes("googleusercontent")) return "Google";
    if (photo.includes("githubusercontent")) return "GitHub";
    if (photo.includes("facebook") || photo.includes("fbcdn")) return "Facebook";

    const email = user.email?.toLowerCase() || "";
    if (email.endsWith("@gmail.com")) return "Google";

    return "Not available";
}

const headerTitle = computed(() => {
    if (props.isForPublic) return "FamTree Editor";

    if (route.name === "dashboard") return "";

    return String(route.name ?? "Dashboard");
});

const displayName = computed(() => userStore.userDisplayName || "Profile");
const displayEmail = computed(() => userStore.user?.email || "No email linked");
const displayPhoto = computed(() => {
    const raw = userStore.user?.photoURL?.trim();
    if (!raw || raw === "null" || raw === "undefined") return "";

    return raw;
});
const shouldShowPhoto = computed(() => Boolean(displayPhoto.value) && !avatarLoadFailed.value);
const displayProvider = computed(() => inferProviderFromUser(userStore.user));
const displayInitial = computed(() => (displayName.value?.trim()?.charAt(0) || "P").toUpperCase());

watch(displayPhoto, () => {
    avatarLoadFailed.value = false;
});

function goBack() {
    history.back();
}

onClickOutside(profileMenuRef, () => (showProfileMenu.value = false));

async function logout() {
    await userStore.signOut();
}
</script>
<template>
    <header
        class="sticky top-0 z-50 h-[var(--header-height)] border-b border-white/70 bg-white/75 px-3 shadow-[0_6px_20px_rgba(15,23,42,0.08)] backdrop-blur sm:px-6"
    >
        <div class="mx-auto flex h-full max-w-6xl items-center justify-between">
            <div class="flex min-w-0 items-center gap-2.5 sm:gap-3">
                <button
                    v-show="route.path != '/main'"
                    type="button"
                    class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border-none bg-slate-100 text-slate-700 shadow-[0_4px_12px_rgba(15,23,42,0.12)] transition hover:bg-slate-200"
                    @click="goBack()"
                >
                    <Icon icon="ion:arrow-back" />
                </button>
                <img alt="FamTree logo" class="h-9 w-9 rounded-lg object-cover" :src="logo" />
                <div class="min-w-0">
                    <p class="text-[14px] font-800 uppercase tracking-[0.16em] text-cyan-700 sm:text-[15px]">FamTree</p>
                    <p v-if="headerTitle" class="truncate text-sm font-800 capitalize text-slate-900 sm:text-base">
                        {{ headerTitle }}
                    </p>
                </div>
            </div>

            <div
                v-if="props.isForPublic"
                class="flex items-center rounded-xl bg-slate-100 px-3 py-1.5 text-sm text-slate-700 shadow-[0_4px_12px_rgba(15,23,42,0.08)]"
            >
                <Icon icon="solar:folder-open-bold" />
                <span class="ml-2 hidden sm:block">Public Editor</span>
            </div>

            <div v-else class="relative" ref="profileMenuRef">
                <button
                    type="button"
                    class="flex cursor-pointer items-center gap-2 rounded-xl border-none bg-slate-900 px-3 py-1.5 text-white shadow-[0_8px_18px_rgba(15,23,42,0.2)] transition-all duration-200 hover:bg-slate-800 items-center"
                    @click="showProfileMenu = !showProfileMenu"
                >
                    <Icon icon="mingcute:user-4-fill" class="text-lg" />
                    <span class="max-w-34 truncate text-sm font-600">{{ displayName }}</span>
                    <Icon class="text-base" icon="iconamoon:arrow-down-2-bold" />
                </button>

                <div
                    v-show="showProfileMenu"
                    class="absolute right-0 top-[calc(100%+10px)] min-w-52 rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-[0_18px_34px_rgba(15,23,42,0.14)]"
                >
                    <div class="mb-2 flex items-center gap-2.5 rounded-lg bg-slate-50 px-2.5 py-2">
                        <img
                            v-if="shouldShowPhoto"
                            :src="displayPhoto"
                            alt="User avatar"
                            class="h-9 w-9 rounded-full object-cover"
                            @error="avatarLoadFailed = true"
                        />
                        <div
                            v-else
                            class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-700 text-white"
                        >
                            {{ displayInitial }}
                        </div>
                        <div class="min-w-0">
                            <p class="truncate text-sm font-700 text-slate-900 mb-0">{{ displayName }}</p>
                            <p class="truncate text-xs text-slate-500 my-1">{{ displayEmail }}</p>
                            <p class="mt-0.5 truncate text-[11px] font-600 uppercase tracking-wide text-cyan-700">
                                Signed in with {{ displayProvider }}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        class="flex w-full cursor-pointer items-center rounded-lg border-none bg-transparent px-2.5 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                        @click="
                            router.push('/privacy-policy');
                            showProfileMenu = false;
                        "
                    >
                        <Icon icon="material-symbols:privacy-tip" />
                        <span class="ml-2">Privacy Policy</span>
                    </button>
                    <button
                        type="button"
                        class="mt-1 flex w-full cursor-pointer items-center rounded-lg border-none bg-transparent px-2.5 py-2 text-left text-sm text-red-700 transition hover:bg-red-50"
                        @click="
                            logout();
                            showProfileMenu = false;
                        "
                    >
                        <Icon icon="solar:logout-3-broken" />
                        <span class="ml-2">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>
