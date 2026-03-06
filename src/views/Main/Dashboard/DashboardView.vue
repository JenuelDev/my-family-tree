<script lang="ts" setup>
import Button from "primevue/button";
import { Icon } from "@iconify/vue";
import AddFamilyTreeModal from "./Partials/AddNewClanModal.vue";
import { onMounted, ref } from "vue";
import { Block, Confirm, Loading, Notify, Report } from "notiflix";
import { useRouter } from "vue-router";
import { addFamily, backupFamilyDataToStorage, deleteFamily, getFamilies } from "@/util/firestore/families";
import { useUserStore } from "@/stores/main";
import RenameFamily from './Partials/RenameFamily.vue';

const renameFamilyRef = ref<null | {
    openRenameFamilyDialog: (family: any) => void;
}>(null);
const userStore = useUserStore();
const router = useRouter();
const showAddFamilyTreeModal = ref(false);

async function AddFamily(ClanName: string) {
    Loading.hourglass();
    await addFamily(ClanName);
    showAddFamilyTreeModal.value = false;
    Loading.remove();
}

async function getFamilyList(refresh = false) {
    if (refresh) userStore.families = [];

    /**
     * Don't refresh if families is already full
     */
    if (userStore.families.length && !refresh) return;
    Block.hourglass("#list-of-family-trees");
    getFamilies()
        .then((data) => {
            data?.forEach((doc) => {
                userStore.families.push({ ...doc.data(), ...{ id: doc.id } });
            });
            backupFamilyDataToStorage();
        })
        .catch(() => {
            alert("Their is a problem getting Family List.");
        })
        .finally(() => {
            Block.remove("#list-of-family-trees");
        });
}

function deleteFamilyTree(familyTree: { name: string; data: Array<any>; id: string | number }) {
    Confirm.show(
        `Delete ${familyTree.name}?`,
        `Are you sure you want to delete this family tree named ${familyTree.name}`,
        "Yes, Delete",
        "No, Cancel",
        () => {
            Loading.hourglass();
            deleteFamily(familyTree.id)
                .then(() => {
                    Notify.success("Successfully Deleted Item!");
                })
                .catch((e) => {
                    Report.failure("Cant Delete Item", "It seems their is an error deleting this item.", "OK");
                })
                .finally(() => {
                    Loading.remove();
                });
        },
        () => {
        },
        {
            titleColor: "red",
            okButtonBackground: "red"
        }
    );
}

function rename(family: any) {
    Confirm.ask("Rename Fams Name", "Type to rename the selected Fam.", family.name, "Update", "cancel", () => {
    }, () => {
    }, {

    });
}

onMounted(() => {
    getFamilyList(true);
});
</script>
<template>
    <section class="mx-auto max-w-4xl">
        <div class="rounded-3xl border border-white/75 bg-white/85 p-4 shadow-[0_18px_46px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p class="text-xs font-700 uppercase tracking-[0.18em] text-cyan-700">Dashboard</p>
                    <h2 class="mt-1 text-2xl font-800 text-slate-900">Family Trees</h2>
                    <p class="mt-1 text-sm text-slate-500">Manage, rename, and open your saved families.</p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <Button
                        label="Add Family Tree"
                        size="small"
                        class="!rounded-xl !border-none !bg-slate-900 !px-4 !text-white shadow-[0_6px_16px_rgba(15,23,42,0.2)]"
                        @click="showAddFamilyTreeModal = true"
                    >
                    <template #icon>
                        <Icon icon="mdi:add-bold" />
                    </template>
                    </Button>
                    <Button
                        icon="pi pi-refresh"
                        label="Refresh"
                        severity="secondary"
                        size="small"
                        class="!rounded-xl !border-none !bg-white !px-4 !text-slate-700 shadow-[0_4px_14px_rgba(15,23,42,0.12)]"
                        @click="getFamilyList(true)"
                    />
                </div>
            </div>

            <div id="list-of-family-trees" class="mt-5 min-h-200px">
                <template v-if="userStore.families.length">
                    <div class="grid gap-3">
                        <article
                            v-for="family in userStore.families"
                            :key="family.id"
                            class="group cursor-pointer rounded-2xl border border-slate-200/90 bg-white px-4 py-3 shadow-[0_4px_16px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.1)]"
                            @click="
                                router.push({
                                    name: 'view-family-tree',
                                    params: {
                                        id: family.id,
                                    },
                                })
                            "
                        >
                            <div class="flex flex-wrap items-center justify-between gap-3">
                                <div class="min-w-0">
                                    <p class="truncate text-lg font-700 text-slate-900">{{ family.name }}</p>
                                    <p class="text-xs uppercase tracking-wide text-slate-500">Tap to open tree</p>
                                </div>
                                <div class="flex flex-wrap items-center gap-2">
                                    <button
                                        type="button"
                                        class="inline-flex cursor-pointer items-center gap-1 rounded-lg border-none bg-white px-2.5 py-1.5 text-sm text-slate-700 shadow-[0_3px_10px_rgba(15,23,42,0.1)] transition hover:bg-slate-100 hover:shadow-[0_8px_16px_rgba(15,23,42,0.12)]"
                                        @click.stop="renameFamilyRef?.openRenameFamilyDialog(family)"
                                    >
                                        <Icon icon="material-symbols:edit-square" />
                                        Rename
                                    </button>
                                    <button
                                        type="button"
                                        class="inline-flex cursor-pointer items-center gap-1 rounded-lg border-none bg-red-50 px-2.5 py-1.5 text-sm text-red-700 shadow-[0_3px_10px_rgba(239,68,68,0.2)] transition hover:bg-red-100 hover:shadow-[0_8px_16px_rgba(239,68,68,0.24)]"
                                        @click.stop="deleteFamilyTree(family)"
                                    >
                                        <Icon icon="material-symbols:delete" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </article>
                    </div>
                </template>
                <div v-else class="flex min-h-260px items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/80">
                    <div class="flex items-center flex-col text-slate-500">
                        <Icon class="text-size-42px" icon="iconoir:info-empty" />
                        <p class="mt-2 text-base font-700">No family trees yet</p>
                        <p class="mt-1 text-sm">Create your first tree to start building your lineage.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <RenameFamily ref="renameFamilyRef" />
    <AddFamilyTreeModal v-model="showAddFamilyTreeModal" @entered-name="(data) => AddFamily(data)" />
</template>
