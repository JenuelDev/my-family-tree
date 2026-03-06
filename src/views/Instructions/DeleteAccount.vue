<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<template>
    <div class="max-w-560px mx-auto mt-3 px-3 sm:px-0">
        <div
            class="flex items-center gap-2 p-2 shadow-none hover:shadow-md cursor-pointer select-none mb-5"
            @click="router.push('/')"
        >
            <Icon icon="ion:chevron-back-sharp" />
            Back
        </div>
        <div class="px-10px space-y-4 leading-relaxed">
            <h2 class="text-2xl font-semibold">How to Delete Your Account</h2>

            <p>
                You can now delete your account directly in the app.
            </p>

            <div>
                <p class="font-semibold mb-2">Steps:</p>
                <ul class="list-disc pl-5 space-y-1">
                    <li>Sign in to your account.</li>
                    <li>Open your profile menu, then click <b>Settings</b>.</li>
                    <li>In the <b>Account</b> section, click <b>Delete Account</b>.</li>
                    <li>In the confirmation modal, type <b>DELETE</b> and confirm.</li>
                </ul>
            </div>

            <div>
                <p class="font-semibold mb-2">What happens after confirmation:</p>
                <ul class="list-disc pl-5 space-y-1">
                    <li>Your account is permanently deleted.</li>
                    <li>Your saved family tree data is also removed.</li>
                    <li>This action is permanent and cannot be undone.</li>
                </ul>
            </div>

            <p class="text-sm opacity-80">
                If you cannot access your account, email
                <a
                    href="mailto:jenuelganawed936@gmail.com?subject=Account%20Deletion%20Request"
                    class="font-semibold underline underline-offset-4"
                >
                    jenuelganawed936@gmail.com
                </a>
                from your registered email and request account deletion.
            </p>
        </div>
    </div>
</template>
