<script lang="ts" setup>
import FamilyTree from "@balkangraph/familytree.js";
import dayjs from "dayjs";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const treeRef = ref(null);
const familyData = ref<Array<any>>([
    {
        id: 3,
        gender: "female",
        photo: "https://cdn.balkan.app/shared/w60/1.jpg",
        name: "Click Me to Edit",
        born: "1943-01-13",
        email: "laura.shepherd@gmail.com",
        phone: "+44 845 5752 547",
        city: "Moscow"
    }
]);

watch(
    () => familyData.value,
    (val) => {
        console.log(val);
    }
);

// function myMenuItemTest(e: any) {
//     console.log(e);
// }

function myTree(domEl: HTMLElement, x: Array<any>) {
    FamilyTree.templates.hugo_male.field_1 =
        "<text class=\"field_0\" style=\"font-size: 16px;text-align:center; width:500px\" fill=\"#ffffff\" y=\"110\" x=\"65\" text-anchor=\"middle\">{val}</text>";
    FamilyTree.templates.hugo_female.field_1 =
        "<text class=\"field_0\" style=\"font-size: 16px;text-align:center; width:500px\" fill=\"#ffffff\" y=\"110\" x=\"65\" text-anchor=\"middle\">{val}</text>";

    FamilyTree.templates.hugo_male.field_2 =
        "<text class=\"field_0\" style=\"font-size: 16px;text-align:center; width:500px\" fill=\"#ffffff\" y=\"110\" x=\"170\" text-anchor=\"middle\"> - {val}</text>";
    FamilyTree.templates.hugo_female.field_2 =
        "<text class=\"field_0\" style=\"font-size: 16px;text-align:center; width:500px\" fill=\"#ffffff\" y=\"110\" x=\"170\" text-anchor=\"middle\"> - {val}</text>";

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
            expandAll: true
        },
        menu: {
            pdf: { text: "Export PDF" },
            png: { text: "Export PNG" },
            svg: { text: "Export SVG" },
            csv: { text: "Export CSV" },
            json: { text: "Export JSON" }
        },
        roots: [3],
        nodeMenu: {
            edit: { text: "Edit" },
            details: { text: "Details" }
        },
        nodeTreeMenu: true,
        nodeBinding: {
            field_0: "name",
            field_1: "born",
            field_2: "death",
            img_0: "photo"
        },
        editForm: {
            titleBinding: "name",
            photoBinding: "photo",
            addMoreBtn: "Add element",
            addMore: "Add more elements",
            addMoreFieldName: "Element name",
            generateElementsFromFields: false,
            elements: [
                {
                    type: "textbox",
                    label: "Full Name",
                    binding: "name",
                    vlidators: {
                        required: "Is required"
                    }
                },
                {
                    type: "textbox",
                    label: "Email Address",
                    binding: "email",
                    vlidators: {
                        required: "Is required",
                        email: "Invalid Email"
                    }
                },
                { type: "textbox", label: "Phone", binding: "phone" },
                [
                    {
                        type: "date",
                        label: "Date Of Birth",
                        binding: "born",
                        vlidators: {
                            required: "Is Required"
                        }
                    },
                    { type: "date", label: "Date Of Birth", binding: "death" }
                ],
                {
                    type: "textbox",
                    label: "Address",
                    binding: "address",
                    vlidators: {
                        required: "Is Required"
                    }
                },
                { type: "textbox", label: "Photo Url", binding: "photo", btn: "Upload" }
            ]
        }
    });

    family.on("field", function(sender, args) {
        if (args.name == "born") {
            const date = new Date(args.value);
            args.value = dayjs(date).format("MMM DD, YYYY");
        }
        if (args.name == "death") {
            args.value = args.value ? dayjs(new Date(args.value)).format("MMM DD, YYYY") : "\xa0\xa0\xa0\xa0Present";
        }
    });

    family.on("updated", () => {
        console.log(familyData.value);

        // every update save it to local storage

        // every update save it to firebase, but need to setup a delay
    });

    family.load(x);
}

onMounted(() => {
    console.log(route.params)
    // get data from firebase

    // populate the familyData
    if (treeRef.value) myTree(treeRef.value, familyData.value);
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
