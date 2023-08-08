<script lang="ts" setup>
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import { ref } from "vue";
import Button from "primevue/button";
import { Icon } from "@iconify/vue";
import { setFamily } from "@/util/firestore/families";
import { Notify } from "notiflix";

const renameValueStr = ref<string | null>(null);
const updateNameModalShow = ref(false);
const familyData = ref<{ id: string, name: string, data: Array<any> } | null>(null);
const submittingData = ref(false);

async function updateName() {
    try {
        submittingData.value = true;
        if (familyData.value && renameValueStr.value) {
            await setFamily(familyData.value.id, { name: renameValueStr.value, data: familyData.value.data });
            Notify.success("Successfully Updated Name!");
            updateNameModalShow.value = false;
        } else {
            Notify.failure('Cant Proceed, please insert a name.');
        }
        submittingData.value = false;
    } catch (e) {
        submittingData.value = false;
    }
}

defineExpose({
    openRenameFamilyDialog: (family: { id: string, name: string, data: Array<any> }) => {
        familyData.value = family;
        renameValueStr.value = family.name;
        updateNameModalShow.value = true;
    }
});
</script>

<template>
    <Dialog v-model:visible="updateNameModalShow" :style="{ width: '350px' }" header="Rename Family" modal>
        <div class="flex flex-col gap-2">
            <InputText v-model="renameValueStr" class="w-full" placeholder="Enter Name" type="text" />
            <Button
                class="w-full"
                label="Rename Family"
                size="small"
                @click="updateName()"
                :loading="submittingData"
                :disabled="submittingData"
            >
                <template #icon>
                    <Icon icon="mdi:add-bold" />
                </template>
            </Button>
            <Button
                class="w-full"
                label="Cancel"
                severity="secondary"
                size="small"
                @click="updateNameModalShow = false"
                :disabled="submittingData"
            />
        </div>
    </Dialog>
</template>