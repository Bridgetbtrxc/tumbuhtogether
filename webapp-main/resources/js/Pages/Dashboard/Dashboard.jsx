import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, Link} from '@inertiajs/react';
import {Button} from "@/Components/ui/button.jsx";

export default function Dashboard({auth}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>

            <>
                <div className="flex items-center">
                    <h1 className="text-lg font-semibold md:text-2xl">Informasi singkat</h1>
                </div>
                <div
                    className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
                    x-chunk="dashboard-02-chunk-1"
                >
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h3 className="text-2xl font-bold tracking-tight">
                            Anda belum mengintegrasikan situs anda.
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Untuk mulai mendonasikan keuntungan dari situs anda, silakan integrasikan situs anda dengan
                            platform kami.
                        </p>
                        <Link href={route('site.create')}>
                            <Button className="mt-4">Tambahkan situs</Button>
                        </Link>
                    </div>
                </div>

            </>
        </AuthenticatedLayout>
    );
}
