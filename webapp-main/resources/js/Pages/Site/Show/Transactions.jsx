import ShowSiteLayout from "@/Layouts/ShowSiteLayout.jsx";
import {Banknote, Check, Clock, Info, ReceiptText} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/Components/ui/card.jsx";
import toRupiah from "@/lib/toRupiah.js";
import InertiaPaginator from "@/Components/InertiaPaginator.jsx";

export default function ShowTransactions({site, stats, transactions}) {
    return (
        <ShowSiteLayout site={site} page="transactions">
            <div className="space-y-4">
                <div className="bg-green-100 text-green-800 p-4 rounded-md">
                    <div className="flex items-center space-x-2">
                        <Info className="h-5 w-5"/>
                        <p>
                            Anda mendonasikan {' '}
                            <span className="font-semibold">{site.cut_percentage}%</span> dari
                            setiap transaksi yang terjadi di situs ini.
                        </p>
                    </div>
                </div>


                <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total transaksi</CardTitle>
                            <ReceiptText className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Nominal donasi</CardTitle>
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
                            <Check className="h-4 w-4 text-muted-foreground"/>
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
                            <Clock className="h-4 w-4 text-muted-foreground"/>
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
                            Histori transaksi situs anda
                        </CardTitle>
                        <CardDescription>
                            Berikut adalah transaksi situs anda yang tercatat di sistem kami.
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
                                    Tanggal Transaksi
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Nominal Transaksi
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
                            {Object.values(transactions.data).map((transaction, index) => (
                                <tr key={transaction.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        {index + 1}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.created_at}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.amount}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.payment_amount}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.note}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </CardContent>
                    <CardFooter>
                        <InertiaPaginator links={transactions.links}/>
                    </CardFooter>
                </Card>

            </div>

        </ShowSiteLayout>
    )
}
