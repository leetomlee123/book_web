<template>
    <a-row type="flex" justify="center" align="middle" :gutter="[0, 10]">
        <a-col
            :xs="20"
            :sm="16"
            :md="12"
            :lg="8"
            :xl="6"
            v-for="(item, index) in chapters"
            :key="index"
        >
            <a class="cp" @click="content(item.id)">{{ item.name }}</a>
        </a-col>
    </a-row>
</template>

<script>

export default {
    name: "Content",
    data() {
        return {

        }
    },
    created() {

    },
    methods: {

    },
}
</script>

