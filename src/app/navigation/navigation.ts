import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [

    {
        id: 'pages',
        title: 'Service Request',
        type: 'group',
        icon: 'pages',
        children: [
            {
                id: 'assistance',
                title: 'Road Assistance',
                type: 'item',
                icon: 'build',
                url: '/login2'
            },
            {
                id: 'appointments',
                title: 'Appointments',
                type: 'item',
                icon: 'today',
                url: '/clients4'
            },
            {
                id: 'orders',
                title: 'Orders',
                type: 'item',
                icon: 'add_shopping_cart',
                url: '/clients5'
            },
            {
                id: 'Mechanics',
                title: 'View Progress',
                type: 'item',
                icon: 'alarm',
                url: '/clients6'
            },
        ]
    },
    {
        id: 'management',
        title: 'Manage My',
        type: 'group',
        icon: 'pages',
        children: [

            {
                id: 'mechanic',
                title: 'Mechanic',
                type: 'item',
                icon: 'assignment_ind',
                url: '/pages/auth/login2'
            },

            {
                id: 'services',
                title: 'Services',
                type: 'item',
                icon: 'check_circle',
                url: '/pages/auth/login2'
            },

            {
                id: 'products',
                title: 'Products',
                type: 'item',
                icon: 'shopping_basket',
                url: '/pages/auth/login2'
            },


        ]


    }
];
