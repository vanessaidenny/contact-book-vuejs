<script setup>
    const { handleSearch } = defineProps(['handleSearch'])

    const onInputValueSearch = (event) => {
        handleSearch(event.target.value)
    }
</script>

<template>
    <div>
        <form className="form-inline pb-3">
            <input name="searchInput" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" @input="onInputValueSearch" />
        </form>
    </div>
</template>

<style scoped></style>
