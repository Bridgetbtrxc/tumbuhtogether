import ShowSiteLayout from "@/Layouts/ShowSiteLayout.jsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/Components/ui/card.jsx";
import InertiaPaginator from "@/Components/InertiaPaginator.jsx";
import {Info} from "lucide-react";

export default function ShowInvoices({site, invoices, paginationLinks}) {
    return (
        <ShowSiteLayout site={site} page="invoices">

            <div className="space-y-4">

                <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md">
                    <div className="flex items-center space-x-2">
                        <Info className="h-5 w-5"/>
                        <p>
                            Pastikan anda melunasi donasi anda tepat waktu agar tetap menjadi mitra TumbuhTogether dan
                            berkontribusi dalam proyek penghijauan terpercaya!
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Invoice donasi anda
                        </CardTitle>
                        <CardDescription>
                            Kami akan mengirimkan invoice yang harus anda lunasi setiap minggu. Manajemen invoice anda
                            disini.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                    #
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Tanggal Mulai
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Tanggal Selesai
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Nominal Total
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Pelunasan
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Aksi
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {invoices.map((invoice, index) => (
                                <tr key={invoice.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        {index + 1}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.start_date}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.end_date}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.total_amount}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.is_finalized ? 'Selesai' : 'Belum dilunasi'}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.is_finalized ? '' : 'Lunasi'}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </CardContent>
                    <CardFooter>
                        <InertiaPaginator links={paginationLinks}/>
                    </CardFooter>
                </Card>
            </div>
        </ShowSiteLayout>
    );
}
