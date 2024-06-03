import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {Button} from "@/Components/ui/button.jsx";
import {AlertCircle} from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/Components/ui/alert"

export default function DonationReport({auth}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Laporan donasi</h2>}
        >
            <Head title="Laporan donasi"/>

            <div className="max-w-5xl mx-auto space-y-4">
                <Alert variant="primary">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertTitle>Mengenai laporan donasi Tumbuh Together</AlertTitle>
                    <AlertDescription>
                        Tumbuh Together memastikan transparansi dan kejelasan penggunaan dana donasi yang diterima. Kami
                        melakukan donasi setiap kuartal, dan laporan donasi akan diterbitkan setelah donasi selesai.
                        Pantau penggunaan dana donasi di halaman ini.
                    </AlertDescription>
                </Alert>

                <h1 className="text-lg font-semibold md:text-2xl">Arsip laporan</h1>

            </div>
        </AuthenticatedLayout>
    )
}
