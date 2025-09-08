import { Home, Building2, Briefcase, LandPlot, Building, ShoppingBag, Castle, Warehouse } from 'lucide-vue-next';

// This structure allows us to build a rich "Mega Menu"
export const propertyLinks = [
    {
        category: 'Residential',
        links: [
            { name: 'Apartment', icon: Building2, to: '/properties?property_type=apartment' },
            { name: 'House', icon: Home, to: '/properties?property_type=house' },
            { name: 'Villa', icon: Castle, to: '/properties?property_type=villa' },
            { name: 'Condominium', icon: Building, to: '/properties?property_type=condo' },
        ]
    },
    {
        category: 'Commercial',
        links: [
            { name: 'Office', icon: Briefcase, to: '/properties?property_type=office' },
            { name: 'Shop', icon: ShoppingBag, to: '/properties?property_type=shop' },
            { name: 'Warehouse', icon: Warehouse, to: '/properties?property_type=warehouse' },
            { name: 'Land', icon: LandPlot, to: '/properties?property_type=land' },
        ]
    }
];

// ... We will still keep the other simple link arrays if needed for other menus