<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/main";

const userStore = useUserStore();
const isDeleting = ref(false);
const showDeleteModal = ref(false);
const confirmationText = ref("");

function openDeleteModal() {
    showDeleteModal.value = true;
}

function closeDeleteModal() {
    if (isDeleting.value) return;
    showDeleteModal.value = false;
    confirmationText.value = "";
}

async function confirmDeleteAccount() {
    if (confirmationText.value !== "DELETE") return;

    isDeleting.value = true;
    try {
        await userStore.deleteAccount();
    } finally {
        isDeleting.value = false;
        closeDeleteModal();
    }
}
</script>

<template>
    <section class="mx-auto max-w-3xl">
        <h1 class="mb-4 text-2xl font-800 text-slate-900">Settings</h1>

        <div class="rounded-2xl bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.1)] sm:p-6">
            <h2 class="text-lg font-700 text-slate-900">Account</h2>
            <p class="mt-2 text-sm leading-relaxed text-slate-600">
                You can permanently delete your account here. This will remove your account and your saved family tree data.
            </p>

            <div class="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
                Warning: deleting your account is permanent and cannot be undone.
            </div>

            <button
                type="button"
                class="mt-5 cursor-pointer rounded-xl border-none bg-red-600 px-4 py-2.5 text-sm font-700 text-white shadow-[0_8px_20px_rgba(220,38,38,0.28)] transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="isDeleting"
                @click="openDeleteModal"
            >
                {{ isDeleting ? "Deleting Account..." : "Delete Account" }}
            </button>
        </div>

        <div
            v-if="showDeleteModal"
            class="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/60 px-4"
            @click.self="closeDeleteModal"
        >
            <div class="w-full max-w-md rounded-2xl bg-white p-5 shadow-[0_20px_45px_rgba(15,23,42,0.26)] sm:p-6">
                <h3 class="text-lg font-800 text-slate-900">Confirm Account Deletion</h3>
                <p class="mt-2 text-sm leading-relaxed text-slate-600">
                    This will permanently delete your account and all saved family tree data.
                </p>
                <p class="mt-1 text-sm font-700 text-red-700">This action cannot be undone.</p>

                <label class="mt-4 block text-xs font-700 tracking-wide text-slate-600">Type DELETE to continue</label>
                <input
                    v-model="confirmationText"
                    type="text"
                    autocomplete="off"
                    class="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-cyan-200 transition focus:border-cyan-500 focus:ring-3"
                    placeholder="DELETE"
                />

                <div class="mt-5 flex justify-end gap-2.5">
                    <button
                        type="button"
                        class="cursor-pointer rounded-xl border-none bg-slate-100 px-3.5 py-2 text-sm font-700 text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                        :disabled="isDeleting"
                        @click="closeDeleteModal"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        class="cursor-pointer rounded-xl border-none bg-red-600 px-4 py-2 text-sm font-700 text-white shadow-[0_8px_20px_rgba(220,38,38,0.28)] transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        :disabled="isDeleting || confirmationText !== 'DELETE'"
                        @click="confirmDeleteAccount"
                    >
                        {{ isDeleting ? "Deleting..." : "Delete Account" }}
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
