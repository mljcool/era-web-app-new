import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [

    {
        id: 'pages',
        title: 'Pages',
        type: 'group',
        icon: 'pages',
        children: [
            {
                id: 'authentication',
                title: 'Authentication',
                type: 'item',
                icon: 'lock',
                url: '/login'
            },
            {
                id: 'coming-soon',
                title: 'Coming Soon',
                type: 'item',
                icon: 'alarm',
                url: '/clients'
            },
            {
                id: 'errors',
                title: 'Errors',
                type: 'collapsable',
                icon: 'error',
                children: [
                    {
                        id: '404',
                        title: '404',
                        type: 'item',
                        url: '/pages/errors/error-404'
                    },
                    {
                        id: '500',
                        title: '500',
                        type: 'item',
                        url: '/pages/errors/error-500'
                    }
                ]
            },
            {
                id: 'invoice',
                title: 'Invoice',
                type: 'collapsable',
                icon: 'receipt',
                children: [
                    {
                        id: 'modern',
                        title: 'Modern',
                        type: 'item',
                        url: '/pages/invoices/modern'
                    },
                    {
                        id: 'compact',
                        title: 'Compact',
                        type: 'item',
                        url: '/pages/invoices/compact'
                    }
                ]
            },
            {
                id: 'maintenance',
                title: 'Maintenance',
                type: 'item',
                icon: 'build',
                url: '/pages/maintenance'
            },
            {
                id: 'pricing',
                title: 'Pricing',
                type: 'collapsable',
                icon: 'attach_money',
                children: [
                    {
                        id: 'style-1',
                        title: 'Style 1',
                        type: 'item',
                        url: '/pages/pricing/style-1'
                    },
                    {
                        id: 'style-2',
                        title: 'Style 2',
                        type: 'item',
                        url: '/pages/pricing/style-2'
                    },
                    {
                        id: 'style-3',
                        title: 'Style 3',
                        type: 'item',
                        url: '/pages/pricing/style-3'
                    }
                ]
            },
            {
                id: 'profile',
                title: 'Profile',
                type: 'item',
                icon: 'person',
                url: '/pages/profile'
            },
            {
                id: 'search',
                title: 'Search',
                type: 'collapsable',
                icon: 'search',
                children: [
                    {
                        id: 'search-classic',
                        title: 'Classic',
                        type: 'item',
                        url: '/pages/search/classic'
                    },
                    {
                        id: 'search-modern',
                        title: 'Modern',
                        type: 'item',
                        url: '/pages/search/modern'
                    }
                ]
            },
            {
                id: 'faq',
                title: 'Faq',
                type: 'item',
                icon: 'help',
                url: '/pages/faq'
            },
            {
                id: 'knowledge-base',
                title: 'Knowledge Base',
                type: 'item',
                icon: 'import_contacts',
                url: '/pages/knowledge-base'
            }
        ]
    },
];
