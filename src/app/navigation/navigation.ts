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
                url: '/assistance'
            },
            {
                id: 'appointments',
                title: 'Appointments',
                type: 'item',
                icon: 'today',
                url: '/appointments'
            },
            {
                id: 'orders',
                title: 'Orders',
                type: 'item',
                icon: 'add_shopping_cart',
                url: '/orders',
                exactMatch: true
            },
            {
                id: 'progress',
                title: 'View Progress',
                type: 'item',
                icon: 'alarm',
                url: '/progress'
            },
            {
                id: 'orderDetail',
                title: 'Order Detail',
                type: 'item',
                url: '/orders/details/1',
                exactMatch: true,
                hidden: true
            }
        ]
    },
    {
        id: 'management',
        title: 'Manage My',
        type: 'group',
        icon: 'pages',
        children: [

            {
                id: 'mechanics',
                title: 'Personnel',
                type: 'item',
                icon: 'assignment_ind',
                url: '/mechanics'
            },

            {
                id: 'shopservices',
                title: 'Shop Services',
                type: 'item',
                icon: 'check_circle',
                url: '/shopservices'
            },

            {
                id: 'products',
                title: 'Products',
                type: 'item',
                icon: 'shopping_basket',
                url: '/products'
            },


        ]


    }
];
