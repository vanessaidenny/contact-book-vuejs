<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import contactsData from "@/contacts.json"

    const router = useRouter()
    
    // Retrieve the contact ID from the route parameters
    const route = useRoute()
    const id = route.params.id

    // Load contacts from localStorage or use default contacts
    const storedContacts = localStorage.getItem('contacts');
    const contacts = storedContacts ? JSON.parse(storedContacts) : contactsData.contacts;
    
    // Search for a contact
    const contact = contacts.find(contact => contact.id === Number(id));

    // Delete a contact
    const handleDeleteContactById = async () => {
        const contactIndex = contacts.findIndex(contact => contact.id === Number(id));
        contacts.splice(contactIndex, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        // Redirect to the contacts list page after deletion
        router.push({ path: "/" });
    }
</script>

<template>
    <div v-if="contact">
        <h2 class="text-center pt-4">{{ contact?.firstName }} {{ contact?.lastName }} </h2>
        <div className="border-top">
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <p className="m-0">Email</p>
                    <a :href="'mailto:' + contact?.email">{{ contact?.email }}</a>
                </li>
                    <li className="list-group-item">
                        <p className="m-0">Phone</p>
                        <p>{{ contact ? `${String(contact.phone).slice(0, 3)}-${String(contact.phone).slice(3, 6)}-${String(contact.phone).slice(6)}` : '' }}</p>
                    </li>
            </ul>
        </div>
        <div class="d-flex justify-content-center gap-4 align-items-flex-end">
            <RouterLink :to="'/edit/' + contact.id" type="button" class="btn btn-secondary">Edit</RouterLink>
            <button type="button" class="btn btn-danger" @click="handleDeleteContactById">Delete</button>
        </div>
    </div>
    <div v-else>
        <p class="text-center pt-4">Contact not found.</p>
    </div>
</template>

<style scoped>
</style>