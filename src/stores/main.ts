import { logout } from "@/util/auth";
import { deleteCurrentUserAccount } from "@/util/auth";
import type { AuthSnapshot } from "@/util/auth";
import { Loading } from "notiflix";
import { Notify } from "notiflix";
import { defineStore } from "pinia";
import { computed, ref } from 'vue'
import { useRouter } from "vue-router";

export const useUserStore = defineStore('userStore', () => {
    const router = useRouter()
    const user = ref<AuthSnapshot | null>(null)
    const families = ref<Array<any>>([]);

    async function signOut() {
        Loading.hourglass();
        logout().then(() => {
            user.value = null;
            families.value = [];
            router.push('/');
        }).catch(() => {
            alert("Their is an Error Logging out.");
        }).finally(() => {
            Loading.remove();
        })
    }

    async function deleteAccount() {
        Loading.hourglass();

        try {
            await deleteCurrentUserAccount();
            user.value = null;
            families.value = [];
            Notify.success("Your account has been deleted.");
            router.replace('/');
        } catch (error: any) {
            const code = error?.code || "";
            if (code === "auth/requires-recent-login") {
                alert("For security reasons, please log out, log back in, and try deleting your account again.");
                return;
            }

            alert("Unable to delete your account right now. Please try again.");
        } finally {
            Loading.remove();
        }
    }

    return {
        user,
        signOut,
        deleteAccount,
        userDisplayName: computed(() => user.value?.displayName),
        families
    }
})