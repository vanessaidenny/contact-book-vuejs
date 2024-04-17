<script setup>
    import { ref, computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import contactsData from "@/contacts.json"

    const router = useRouter()

    // Retrieve the contact ID from the route parameters
    const route = useRoute()
    const id = route.params.id

    // Load contacts from localStorage or use default contacts
    const storedContacts = localStorage.getItem('contacts');
    const contacts = storedContacts ? JSON.parse(storedContacts) : contactsData.contacts;

    // Find the contact with the specified ID
    const contact = contacts.find(contact => contact.id === Number(id))

    // Define reactive variables for contact details
    const firstName = ref(contact?.firstName || '')
    const lastName = ref(contact?.lastName || '')
    const email = ref(contact?.email || '')
    const phone = ref(contact?.phone || '')

    // Handle click event to update contact details
    const handleClick = () => {
        // Computed properties to capitalize the first letter of first name and last name
        const capitalizedFirstName = computed(() => firstName.value.charAt(0).toUpperCase() + firstName.value.slice(1))
        const capitalizedLastName = computed(() => lastName.value.charAt(0).toUpperCase() + lastName.value.slice(1))

        // Create an edited contact object with updated details
        const editedContact = {
            ...contact,
            firstName: capitalizedFirstName.value,
            lastName: capitalizedLastName.value,
            email: email.value,
            phone: phone.value,
        }

        // Find the index of the contact in the contacts array
        const index = contacts.findIndex(contact => contact.id === Number(id))

        // Replace the existing contact with the edited contact
        contacts[index] = editedContact;

        // Update localStorage with the modified contacts array
        localStorage.setItem('contacts', JSON.stringify(contacts))

        // Redirect to the contact details page after updating
        router.push({ path: "/details/" + id });
    }
</script>

<template>
    <h2 class="text-center pt-4">Edit Contact</h2>
    <div>
        <form id="form" class="form-group needs-validation" @submit.prevent="handleClick">
            <div class="row mt-3">
                <label class="col">
                    First Name
                    <input class="form-control" type="text" name="firstName" v-model="firstName" placeholder="Enter your first name" required />
                </label>
                <label class="col">
                    Last Name
                    <input class="form-control" type="text" name="lastName" v-model="lastName" placeholder="Enter your last name" required />
                </label>
            </div>
            <div class="row mt-3">
                <label>
                    Email
                    <input class="form-control" type="email" name="email" v-model="email" placeholder="Enter your email address" required />
                </label>
            </div>
            <div class="row mt-3">
                <label>
                    Phone
                    <input class="form-control" type="text" name="phone" v-model="phone" placeholder="Enter your phone number" required />
                </label>
            </div>
            <div class="text-center">
                <button id="send-form" type="submit" class="row btn btn-primary mt-3">Submit</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
</style>
