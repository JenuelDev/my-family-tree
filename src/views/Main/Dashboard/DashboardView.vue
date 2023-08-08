<script lang="ts" setup>
import Button from "primevue/button";
import { addFamily, getFamilies } from "@/util/firebase";
import { Icon } from "@iconify/vue";
import AddFamilyTreeModal from "./Partials/AddNewClanModal.vue";
import { onMounted, ref } from "vue";
import { Block, Confirm, Loading, Notify, Report } from "notiflix";
import { useRouter } from "vue-router";
import { backupFamilyDataToStorage, deleteFamily } from "@/util/firestore/families";
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
    getFamilyList();
});
</script>
<template>
    <div class="p-10px max-w-500px mx-auto">
        <div class="flex justify-between items-center">
            <h3>Fams</h3>
            <div class="flex gap-1">
                <Button label="Add Family Tree" size="small" @click="showAddFamilyTreeModal = true">
                    <template #icon>
                        <Icon icon="mdi:add-bold" />
                    </template>
                </Button>
                <Button icon="pi pi-check" label="refresh" severity="help" size="small" @click="getFamilyList(true)" />
            </div>
        </div>
        <div id="list-of-family-trees" class="flex flex-col gap-1 min-h-200px">
            <template v-if="userStore.families.length">
                <div
                    v-for="family in userStore.families"
                    :key="family.id"
                    class="p-3 border border-dark cursor-pointer shadow-sm hover:shadow-lg transition-all duration-100 bg-white flex justify-between items-center"
                    @click="
                        router.push({
                            name: 'view-family-tree',
                            params: {
                                id: family.id,
                            },
                        })
                    "
                >
                    <div>{{ family.name }}</div>
                    <div class="flex gap-1 items-center">
                        <div
                            class="cursor-pointer p-1 shadow-none hover:shadow-md transition-all flex items-center gap-1"
                            @click.stop="renameFamilyRef?.openRenameFamilyDialog(family)">
                            <Icon class="-mt-1" icon="material-symbols:edit-square" />
                            Rename
                        </div>
                        <div
                            class="hover:text-red cursor-pointer shadow-none hover:shadow-md transition-all flex items-center gap-1"
                            @click.stop="deleteFamilyTree(family)"
                        >
                            <Icon icon="material-symbols:delete" />
                            Delete
                        </div>
                    </div>
                </div>
            </template>
            <div v-else class="h-300px flex items-center justify-center">
                <div class="flex items-center flex-col">
                    <Icon class="text-size-50px" icon="iconoir:info-empty" />
                    Empty Data
                </div>
            </div>
        </div>
    </div>
    <RenameFamily ref="renameFamilyRef" />
    <AddFamilyTreeModal v-model="showAddFamilyTreeModal" @entered-name="(data) => AddFamily(data)" />
</template>
