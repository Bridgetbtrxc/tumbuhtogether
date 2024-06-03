import ShowSiteLayout from "@/Layouts/ShowSiteLayout.jsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/Components/ui/card.jsx";
import {asset} from "@/lib/asset.js";
import {Info, TriangleAlert} from "lucide-react";
import {Link, useForm, usePage} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {Slider} from "@/Components/ui/slider.jsx";
import {Button} from "@/Components/ui/button.jsx";
import {Toaster} from "@/Components/ui/sonner"
import {toast} from "sonner"
import {useEffect} from "react";

export default function ShowInvoices({site, onboarding}) {
    const {flash} = usePage().props

    const {data, setData, post, processing, errors, reset} = useForm({
        _method: 'PATCH',
        name: site.name,
        logo: null,
        display_name: site.display_name,
        cut_percentage: site.cut_percentage,
        donation_feature_active: site.donation_feature_active,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('site.update', site), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    useEffect(() => {
        if (flash.message) {
            toast(flash.message)
        }
    }, [flash]);

    return (
        <ShowSiteLayout site={site} page="settings">
            <div className="space-y-4">
                <Card>
                    <div className="p-6 flex space-x-6">
                        <img src={asset('Assets/logomidtrans.svg')} alt="Logo Mitrans" className="w-32"/>
                        <div>
                            <CardTitle>
                                Integrasi pembayaran
                            </CardTitle>
                            <CardDescription>
                                Anda menggunakan integrasi Midtrans untuk situs ini
                            </CardDescription>
                        </div>
                    </div>
                </Card>

                {onboarding && (
                    <div className="bg-gray-100 text-gray-800 p-4 rounded-md mt-4">
                        <div className="flex items-center space-x-2">
                            <Info className="h-5 w-5"/>
                            <p>
                                Baca dokumentasi kami untuk memulai integrasi Midtrans pada situs anda <Link
                                className="underline" href="#">disini</Link>
                            </p>
                        </div>
                    </div>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Pengaturan webhook
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Berikut adalah link webhook anda. Pasang ini pada halaman pengaturan webhook di
                            dashboard Midtrans anda.
                        </CardDescription>

                        <div className="bg-gray-100 p-4 rounded-md mt-4">
                            <code>{route('webhook-code', {code: site.webhook_id})}</code>
                        </div>


                        <div className="bg-red-100 text-red-600 p-4 rounded-md mt-4">
                            <div className="flex items-center space-x-2">
                                <TriangleAlert className="h-5 w-5"/>
                                <p>
                                    Jangan memberikan link ini pada siapapun! Ini adalah link rahasia yang
                                    digunakan
                                    untuk menghubungkan situs anda dengan Midtrans.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <form className="space-y-4" onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Pengaturan situs
                            </CardTitle>
                            <CardDescription>
                                Anda dapat mengubah nama situs, logo, dan pengaturan donasi
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex space-x-4 w-full">
                                <div className="flex-1">
                                    <InputLabel htmlFor="name" value="Tampilan untuk pengguna"/>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <small className="text-sm text-gray-500">
                                        Nama situs akan ditampilkan pada dashboard anda
                                    </small>
                                    <InputError message={errors.name} className="mt-2"/>
                                </div>
                                <div className="flex-1">
                                    <InputLabel htmlFor="display_name" value="Nama yang ditampilkan"/>
                                    <TextInput
                                        id="display_name"
                                        type="text"
                                        name="display_name"
                                        value={data.display_name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('display_name', e.target.value)}
                                    />
                                    <small className="text-sm text-gray-500">
                                        Nama situs ini akan ditampilkan pada badge dan halaman tentang donasi anda, yang
                                        akan dilihat oleh pengunjung situs anda.
                                    </small>
                                    <InputError message={errors.display_name} className="mt-2"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Pengaturan donasi
                            </CardTitle>
                            <CardDescription>
                                Atur persentase keuntungan situs dan integrasi pembayaran
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="grid grid-cols-5 gap-8">
                                        <div className="col-span-3">
                                            <InputLabel htmlFor="cut_percentage">
                                                Persentase donasi
                                                <span className="text-gray-500 text-sm ml-1">(0.2% - 20%)</span>
                                            </InputLabel>
                                            <div className="mt-2">
                                                <Slider
                                                    defaultValue={[0.2]}
                                                    max={20}
                                                    step={0.1}
                                                    min={0.2}
                                                    id="cut_percentage"
                                                    name="cut_percentage"
                                                    className="my-4"
                                                    value={[data.cut_percentage]}
                                                    onValueChange={(value) => setData('cut_percentage', value[0])}
                                                />
                                            </div>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Persentase ini ({data.cut_percentage}%) akan aktif untuk transaksi baru
                                                bila anda menyimpan perubahan ini.
                                            </p>
                                        </div>

                                        <div className="col-span-2">
                                            <EnableDonationToggle
                                                onChange={(value) => setData('donation_feature_active', value)}
                                                value={data.donation_feature_active}/>
                                        </div>

                                    </div>
                                    <InputError message={errors.cut_percentage} className="mt-2"/>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                disabled={processing}
                                onClick={submit}
                            >
                                Perbarui pengaturan
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
                <Toaster/>
            </div>
        </ShowSiteLayout>
    );
}

function EnableDonationToggle({value, onChange}) {
    return (
        <div className="space-y-5">
            <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                    <input
                        id="donate-feature-toggle"
                        aria-describedby="donate-feature-toggle-description"
                        name="comments"
                        type="checkbox"
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                </div>
                <div className="ml-3 text-sm leading-6">
                    <label htmlFor="donate-feature-toggle" className="font-medium text-gray-900">
                        Fitur donasi pengguna
                    </label>
                    <p id="donate-feature-toggle-description" className="text-gray-500">
                        Pengguna anda dapat melakukan donasi melalui situs anda, kami akan menyalurkan donasinya.
                    </p>
                </div>
            </div>
        </div>
    );
}
