<script setup>
    import { RouterLink } from "vue-router"
    import { ref, computed } from 'vue'
    import contactsData from "@/contacts.json"
    import Search from "../components/Search.vue"

    // Load contacts from localStorage or use default contacts
    const storedContacts = localStorage.getItem('contacts');
    const contacts = ref(storedContacts ? JSON.parse(storedContacts) : contactsData.contacts)
    
    // Search value
    const searchValue = ref('')
    
    // Filtered contacts based on search value
    const filteredContacts = computed(() => {
        if (searchValue.value.trim() === '') {
            return []
        } else {
            return contacts.value.filter(contact => {
                const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase()
                return fullName.includes(searchValue.value.toLowerCase())
            });
        }
    });

    // Display contacts based on search value
    const displayContacts = computed(() => {
        const contactsToDisplay = searchValue.value.trim() === '' ? contacts.value : filteredContacts.value;
        // Sort the displayed contacts by last name
        return contactsToDisplay.slice().sort((a, b) => a.lastName.localeCompare(b.lastName));
    });

    // Handle search input
    const handleSearch = (value) => {
        searchValue.value = value
    }
</script>

<template>
    <div>
        <h2 class="text-center pt-4">Contacts</h2>
        <Search :handleSearch="handleSearch"></Search>
        <div className="list-group">
            <RouterLink
                v-for="contact in displayContacts"
                className="list-group-item list-group-item-action"
                :key="contact.id"
                :to="'/details/' + contact.id"
            >
                {{ contact.firstName }} {{ contact.lastName }}
            </RouterLink>
        </div>
    </div>
    <div v-if="displayContacts.length === 0" class="text-center pt-4">
        <p class="mb-0">No contacts found.</p>
        <RouterLink :to="'/new'">Add a new contact</RouterLink>
    </div>
</template>

<style scoped></style>
