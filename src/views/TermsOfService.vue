<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
    <main
        class="min-h-screen bg-[radial-gradient(circle_at_top_left,_#dbeafe_0%,_#f8fafc_38%,_#ecfeff_100%)] px-4 py-6 sm:px-6"
    >
        <article
            class="mx-auto w-full max-w-4xl rounded-3xl border border-white/70 bg-white/90 p-5 text-slate-700 shadow-[0_24px_60px_rgba(15,23,42,0.1)] backdrop-blur sm:p-8"
        >
            <div
                class="mb-6 inline-flex items-center gap-2 rounded-xl border-none bg-slate-100 px-3 py-2 text-sm font-700 text-slate-700 shadow-[0_5px_14px_rgba(15,23,42,0.12)] transition hover:bg-slate-200 cursor-pointer select-none"
                @click="router.back()"
            >
                <Icon icon="ion:chevron-back-sharp" />
                Back
            </div>

            <h1 class="text-3xl font-800 text-slate-900 sm:text-4xl">Terms of Service</h1>
            <p class="mt-2 text-sm text-slate-500">Last updated: August 02, 2023</p>

            <p class="mt-5 leading-relaxed">
                These Terms of Service ("Terms") govern your access to and use of KinConnect (the "Service"). By
                accessing or using the Service, you agree to be bound by these Terms. If you do not agree, you may not
                use the Service.
            </p>

            <h2 class="mt-8 text-2xl font-800 text-slate-900 sm:text-3xl">Use of the Service</h2>
            <p class="mt-3 leading-relaxed">
                You agree to use the Service only for lawful purposes and in accordance with these Terms. You are
                responsible for all activity that occurs under your account.
            </p>

            <h2 class="mt-8 text-2xl font-800 text-slate-900 sm:text-3xl">User Content</h2>
            <p class="mt-3 leading-relaxed">
                You are responsible for any content you create, upload, or share through the Service, including family
                tree data, names, photos, and notes. You represent that you have the necessary rights and permissions to
                share this content.
            </p>

            <h2 class="mt-8 text-2xl font-800 text-slate-900 sm:text-3xl">Privacy</h2>
            <p class="mt-3 leading-relaxed">
                Your use of the Service is also governed by our Privacy Policy, which explains how we collect, use, and
                protect your information. Please review the Privacy Policy for more details.
            </p>

            <h2 class="mt-8 text-2xl font-800 text-slate-900 sm:text-3xl">Accounts and Security</h2>
            <ul class="mt-3 list-disc space-y-2 pl-6">
                <li>
                    <p>You must provide accurate information when creating an account.</p>
                </li>
                <li>
                    <p>You are responsible for maintaining the confidentiality of your login credentials.</p>
                </li>
                <li>
                    <p>You must notify us immediately of any unauthorized use of your account.</p>
                </li>
            </ul>

            <h2 class="mt-8 text-2xl font-800 text-slate-900 sm:text-3xl">Prohibited Activities</h2>
            <p class="mt-3 leading-relaxed">You agree not to:</p>
            <ul class="mt-3 list-disc space-y-2 pl-6">
                <li>
                    <p>Use the Service for any illegal or unauthorized purpose.</p>
                </li>
                <li>
                    <p>Attempt to gain unauthorized access to the Service or other users' accounts.</p>
                </li>
                <li>
                    <p>Reverse engineer, modify, or attempt to copy the Service or its components.</p>
                </li>
                <li>
                    <p>Upload malware, malicious code, or content that may harm the Service or other users.</p>
                </li>
            </ul>

            <h2 class="mt-8 text-2xl font-800 text-slate-900 sm:text-3xl">Termination</h2>
            <p class="mt-3 leading-relaxed">
                We may suspend or terminate your access to the Service at any time, without prior notice or liability,
                for any reason, including if you violate these Terms.
            </p>

            <h2 class="mt-8 text-2xl font-800 text-slate-900 sm:text-3xl">Disclaimer</h2>
            <p class="mt-3 leading-relaxed">
                The Service is provided on an "as is" and "as available" basis without warranties of any kind, either
                express or implied. We do not guarantee that the Service will be uninterrupted, secure, or error-free.
            </p>

            <h2 class="mt-8 text-2xl font-800 text-slate-900 sm:text-3xl">Limitation of Liability</h2>
            <p class="mt-3 leading-relaxed">
                To the maximum extent permitted by law, KinConnect and its developers shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages, or any loss of data or profits,
                arising out of or in connection with your use of the Service.
            </p>

            <h2 class="mt-8 text-2xl font-800 text-slate-900 sm:text-3xl">Changes to These Terms</h2>
            <p class="mt-3 leading-relaxed">
                We may update these Terms from time to time. When we do, we will update the "Last updated" date at the
                top of this page. Your continued use of the Service after any changes means you accept the updated
                Terms.
            </p>

            <h2 class="mt-8 text-2xl font-800 text-slate-900 sm:text-3xl">Contact Us</h2>
            <p class="mt-3 leading-relaxed">
                If you have any questions about these Terms, you can contact us at
                <a
                    class="font-700 text-cyan-700 no-underline hover:text-cyan-600"
                    href="mailto:kinsupport@brojenuel.com"
                    >kinsupport@brojenuel.com</a
                >.
            </p>
        </article>
    </main>
</template>
