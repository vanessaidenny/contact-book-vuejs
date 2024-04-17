<script setup>
    import { ref, computed } from 'vue'
    import { useRouter } from 'vue-router'
    import contactsData from "@/contacts.json"
    
    const router = useRouter();
    
    // Load contacts from localStorage or use default contacts
    let contacts = ref(JSON.parse(localStorage.getItem('contacts')) || contactsData.contacts);

    // Define reactive variables for input fields
    let firstName = ref('');
    let lastName = ref('');
    let email = ref('');
    let phone = ref('');

    // Handle click event to add a new contact
    const handleClick = () => {
        // Computed properties to capitalize the first letter of first name and last name
        const capitalizedFirstName = computed(() => firstName.value.charAt(0).toUpperCase() + firstName.value.slice(1))
        const capitalizedLastName = computed(() => lastName.value.charAt(0).toUpperCase() + lastName.value.slice(1))

        // Create a new contact object
        const newContact = {
            id: contacts.value.length + 1,
            firstName: capitalizedFirstName.value,
            lastName: capitalizedLastName.value,
            email: email.value,
            phone: phone.value,
        };

        // Update contacts ref with the new contact
        contacts.value.push(newContact);

        // Update localStorage with the updated contacts list
        localStorage.setItem('contacts', JSON.stringify(contacts.value));

        // Redirect to the details page of the new contact
        router.push({ path: "/details/" + newContact.id });
    }
</script>

<template>
    <h2 class="text-center pt-4">New Contact</h2>
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