import {Head, usePage} from "@inertiajs/react";
import {Tabs, TabsList, TabsTrigger} from "@/Components/ui/tabs.jsx";
import {router} from '@inertiajs/react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import {ChevronDown, FilterIcon} from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import {asset} from "@/lib/asset.js";


export default function ShowSiteLayout({site, page, children}) {
    const {auth} = usePage().props;
    const scopeParam = new URLSearchParams(location.search).get('scope') || 'weekly';
    const handleTabChange = (value) => {
        const currentURL = new URL(window.location.href);
        const siteRouteBase = route('site.show', site.public_id);
        const newURL = new URL(siteRouteBase, currentURL.origin);

        // If not invoice or settings Copy existing search parameters to the new URL
        if (value !== "invoices" && value !== "settings") {
            newURL.search = currentURL.search;
        }

        // Determine the appropriate route based on the tab value
        if (value !== "transactions") {
            newURL.pathname += '/' + value;
        }

        // Navigate to the new URL with the 'replace: true' option to avoid adding a history entry
        router.visit(newURL.href, {
            replace: true
        });
    };

    const handleFilterChange = (value) => {
        const currentURL = new URL(window.location.href);
        currentURL.searchParams.set('scope', validScope(value)); // Set or update the 'scope' parameter
        router.visit(currentURL.href); // Navigate to the updated URL
    }

    const validScope = (value) => ([
        'weekly',
        'monthly',
        'quarterly',
        'yearly',
        'alltime'
    ].includes(value) ? value : 'weekly');


    return (<AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Situs</h2>}
    >
        <Head title={`Manajemen ${site.display_name}`}/>
        <div className="max-w-7xl mx-auto w-full space-y-8 mt-8">
            <div className="flex items-center space-x-4">
                <img src={asset(site.logo)} alt="Logo" className="h-12"/>
                <h1 className="text-lg font-semibold md:text-2xl">
                    Manajemen situs {site.name}
                </h1>
            </div>
            <div className="flex">
                <div className="grow">
                    <Tabs defaultValue={page} onValueChange={handleTabChange}>
                        <TabsList>
                            <TabsTrigger value="transactions">
                                Transaksi
                            </TabsTrigger>
                            <TabsTrigger value="user-donations">
                                Donasi Pengguna
                            </TabsTrigger>
                            <TabsTrigger value="invoices">
                                Invoice Situs
                            </TabsTrigger>
                            <TabsTrigger value="settings">
                                Pengaturan
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                {!(['settings', 'invoices'].includes(page)) && (<div>
                    <Select
                        defaultValue={scopeParam}
                        onValueChange={handleFilterChange}>
                        <SelectTrigger className="space-x-4">
                            <SelectPrimitive.Icon asChild>
                                <FilterIcon className="h-4 w-4 opacity-50"/>
                            </SelectPrimitive.Icon>
                            <SelectValue placeholder="Filter rentang waktu"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="weekly">Mingguan</SelectItem>
                            <SelectItem value="monthly">Bulanan</SelectItem>
                            <SelectItem value="quarterly">Kuartalan</SelectItem>
                            <SelectItem value="yearly">Tahunan</SelectItem>
                            <SelectItem value="alltime">Semua</SelectItem>
                        </SelectContent>
                    </Select>
                </div>)}
            </div>
            {children}

        </div>
    </AuthenticatedLayout>);
}
