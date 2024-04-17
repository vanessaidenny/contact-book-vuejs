import { createRouter, createWebHistory } from 'vue-router'
import Contacts from '../views/Contacts.vue'
import Details from '../views/Details.vue'
import Edit from '../views/Edit.vue'
import NewContact from '../views/NewContact.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Contacts
    },
    {
      path: '/details/:id',
      component: Details
    },
    {
      path: '/edit/:id',
      component: Edit
    },
    {
      path: '/new',
      name: 'new',
      component: NewContact
    },
  ],
  linkActiveClass: 'menu-active'
})

export default router
