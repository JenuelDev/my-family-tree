<script setup lang="ts">
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { computed, ref } from "vue";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(["update:modelValue", "entered-name"]);
const name = ref<string | null>(null);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

function enterName() {
    if (!name.value) {
        toast.add({
            severity: "error",
            detail: "Please Enter Name",
            life: 3000,
        });
        return;
    }

    emit("entered-name", name.value);
}
</script>
<template>
    <Toast />
    <Dialog v-model:visible="value" modal :showHeader="false" :style="{ width: '400px' }">
        <div class="flex flex-col gap-5px mt-3">
            <h2 class="m-0">Enter Name</h2>
            <InputText v-model="name" class="w-full" placeholder="Enter Name of new family tree" />
            <Button label="Create" class="w-full" size="small" @click="enterName()" />
            <Button label="Cancel" class="w-full mt-2" severity="secondary" size="small" @click="value = false" />
        </div>
    </Dialog>
</template>
