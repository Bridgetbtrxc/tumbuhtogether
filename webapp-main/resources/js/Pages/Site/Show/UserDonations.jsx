import ShowSiteLayout from "@/Layouts/ShowSiteLayout.jsx";
import {Banknote, Info} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/Components/ui/card.jsx";
import InertiaPaginator from "@/Components/InertiaPaginator.jsx";

export default function ShowUserDonations({site, stats, donations}) {
    return (
        <ShowSiteLayout site={site} page="user-donations">
            <div className="space-y-4">

                <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total donasi pengguna</CardTitle>
                            <Banknote className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Nominal donasi pengguna</CardTitle>
                            <Banknote className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.amount}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Donasi diterima</CardTitle>
                            <Banknote className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.received}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Menunggu pembayaran</CardTitle>
                            <Banknote className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.pending}
                            </div>
                            <p className="text-xs text-muted-foreground">Dilunasi setiap minggu</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Histori donasi situs anda
                        </CardTitle>
                        <CardDescription>
                            Berikut adalah donasi yang dilakukan oleh pengguna di situs anda.
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
                                    Tanggal Donasi
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Nominal Donasi
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Catatan
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {Object.values(donations.data).map((transaction, index) => (
                                <tr key={transaction.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        {index + 1}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.created_at}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.payment_amount}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.note}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </CardContent>
                    <CardFooter>
                        <InertiaPaginator links={donations.links}/>
                    </CardFooter>
                </Card>
            </div>
        </ShowSiteLayout>
    )
}
