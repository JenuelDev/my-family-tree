<script lang="ts" setup>
import FamilyTree from "@balkangraph/familytree.js";
import { onMounted, ref, watch } from "vue";

const treeRef = ref(null);
const data = ref([
    {
        id: 3,
        gender: "female",
        photo: "https://cdn.balkan.app/shared/w60/1.jpg",
        name: "Click Me to Edit",
        born: "1943-01-13",
        email: "laura.shepherd@gmail.com",
        phone: "+44 845 5752 547",
        city: "Moscow",
        country: "ru",
    },
]);

watch(
    () => data.value,
    (val) => {
        console.log(val);
    }
);

function myMenuItemTest(e: any) {
    console.log(e);
}

function myTree(domEl: HTMLElement, x: Array<any>) {
    FamilyTree.templates.john_male.field_3 =
        '<text class="field_0" style="font-size: 16px;text-align:center; width:500px" fill="#ffffff" y="175" text-anchor="middle"  text-align="">Born:{val}</text>';
    FamilyTree.templates.john_female.field_3 =
        '<text class="field_0" style="font-size: 16px;" fill="#ffffff"  y="175" text-anchor="middle">Born:{val}</text>';

    const family = new FamilyTree(domEl, {
        mouseScrool: FamilyTree.action.ctrlZoom,
        showXScroll: true,
        showYScroll: true,
        mode: "dark",
        template: "hugo",
        toolbar: {
            layout: false,
            zoom: true,
            fit: true,
            expandAll: true,
        },
        menu: {
            pdf: { text: "Export PDF" },
            png: { text: "Export PNG" },
            svg: { text: "Export SVG" },
            csv: { text: "Export CSV" },
            json: { text: "Export JSON" },
        },
        roots: [3],
        nodeMenu: {
            edit: { text: "Edit" },
            details: { text: "Details" },
        },
        nodeTreeMenu: true,
        nodeBinding: {
            field_0: "name",
            field_1: "born",
            img_0: "photo",
        },
        editForm: {
            titleBinding: "name",
            photoBinding: "photo",
            addMoreBtn: "Add element",
            addMore: "Add more elements",
            addMoreFieldName: "Element name",
            generateElementsFromFields: false,
            elements: [
                { type: "textbox", label: "Full Name", binding: "name" },
                { type: "textbox", label: "Email Address", binding: "email" },
                { type: "textbox", label: "Phone", binding: "phone" },
                [
                    { type: "date", label: "Date Of Birth", binding: "born" },
                    { type: "date", label: "Date Of Birth", binding: "death" },
                ],
                [
                    {
                        type: "select",
                        options: [
                            { value: "--", text: "-- select country --" },
                            { value: "bg", text: "Bulgaria" },
                            { value: "ru", text: "Russia" },
                            { value: "gr", text: "Greece" },
                            { value: "ph", text: "Philippines" },
                        ],
                        label: "Country",
                        binding: "country",
                    },
                    { type: "textbox", label: "City", binding: "city" },
                ],
                { type: "textbox", label: "Photo Url", binding: "photo", btn: "Upload" },
            ],
        },
    });

    family.on("field", function (sender, args) {
        if (args.name == "born") {
            var date = new Date(args.value);
            args.value = date.toLocaleDateString();
        }
    });

    family.on("updated", function (sender, args) {
        console.log(sender.nodes, args);
        /**
         * This add the nodes to the firebase
         */
    });

    family.load(x);
}

onMounted(() => {
    if (treeRef.value) myTree(treeRef.value, data.value);
});
</script>
<template>
    <div
        id="tree"
        ref="treeRef"
        class="view-family-tree"
        style="height: 100% !important; width: 100% !important; background-color: rgb(32, 32, 32)"
    ></div>
</template>
<style lang="scss">
.view-family-tree {
    user-select: none;

    svg.tommy .node.male > rect {
        fill: #039be5;
    }

    svg.tommy .node.female > rect {
        fill: #ff46a3;
    }
}

#tree > svg {
    background-color: #2e2e2e !important;
}

/* border color */
.view-family-tree.bft-light .bft-input > input {
    border-color: #3d3d3d;
    background-color: #3d3d3d;
}

/* input field on focus */
.view-family-tree.bft-light .bft-input > input:focus {
    border-color: #3d3d3d;
    background-color: #3d3d3d;
}

/* the search label on focus */
.bft-light .bft-input > label.focused,
.bft-dark .bft-input > label.focused {
    color: rgb(199, 199, 199) !important;
}

/* the hovered search result */
.bft-light .bft-search [data-search-item-id]:hover,
.bft-light .bft-search [data-selected="yes"] {
    background-color: rgb(199, 199, 199) !important;
}
</style>
