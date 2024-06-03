import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import {Button} from "@/Components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import TextInput from '@/Components/TextInput';
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import {Slider} from "@/Components/ui/slider.jsx";
import {Info} from "lucide-react";
import {asset} from "@/lib/asset.js";
import {RadioGroup} from '@headlessui/react'
import {CheckCircleIcon} from '@heroicons/react/20/solid'
import {cn} from "@/lib/utils.js";
import {Switch} from '@headlessui/react'

export default function CreateSite({auth}) {

    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        logo: null,
        display_name: '',
        cut_percentage: 0.2,
        webhook_type: 'midtrans',
        donation_feature_active: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('site.store'), {
            forceFormData: true,
        });
    };

    return (

        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Situs</h2>}
        >
            <Head title="Tambahkan situs"/>
            <form className="max-w-5xl mx-auto space-y-6" onSubmit={submit}>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Tambahkan situs anda
                        </CardTitle>
                        <CardDescription>
                            Mulai mendonasikan setiap keuntungan situs anda untuk program penghijauan terpercaya!
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
                        <div className="flex-1">
                            <InputLabel htmlFor="logo" value="Logo situs"/>
                            <input type="file" className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                   name="logo" id="logo"
                                   onChange={(e) => setData('logo', e.target.files[0])}/>
                            <small className="text-sm text-gray-500">
                                Logo situs akan ditampilkan pada halaman tentang donasi anda.
                            </small>
                            <InputError message={errors.logo} className="mt-2"/>
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
                                            Persentase dari keuntungan situs anda yang akan didonasikan
                                        </p>
                                    </div>

                                    <div className="col-span-2">
                                        <EnableDonationToggle
                                            onChange={(value) => setData('donation_feature_active', value)}
                                            value={data.donation_feature_active}/>
                                    </div>

                                </div>
                                <div className="bg-green-100 text-green-800 p-4 rounded-md mt-4">
                                    <div className="flex items-center space-x-2">
                                        <Info className="h-5 w-5"/>
                                        <p>
                                            Anda akan mendonasikan{' '}
                                            <span className="font-semibold">{data.cut_percentage}%</span> dari
                                            keuntungan situs anda
                                        </p>
                                    </div>
                                </div>
                                <InputError message={errors.cut_percentage} className="mt-2"/>
                            </div>
                            <PaymentProcessorSelectList
                                value={data.webhook_type}
                                onChange={(value) => setData('webhook_type', value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            disabled={processing}
                            onClick={submit}
                        >
                            Tambahkan situs
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </AuthenticatedLayout>
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

function PaymentProcessorSelectList({value, onChange}) {
    const paymentProcessors = [
        {
            id: "midtrans",
            name: "Midtrans",
            icon: asset('integration-icons/midtrans.svg'),
            description: "Integrasikan Midtrans dengan Tumbuh Together",
            enabled: true
        },
        {
            id: "xendit",
            name: "Xendit",
            icon: asset('integration-icons/xendit.svg'),
            description: "Integrasi Xendit akan kami tambahkan segera",
            enabled: false
        },
        {
            id: "custom",
            name: "Custom",
            icon: asset('integration-icons/customintegration.svg'),
            description: "Integrasi manual akan kami tambahkan segera",
            enabled: false
        },
    ]

    return (
        <RadioGroup value={value} onChange={onChange}>
            <InputLabel htmlFor="paymentProcessor" value="Pilih integrasi pembayaran"/>
            <div id="paymentProcessor" className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                {paymentProcessors.map((paymentProcessor) => (
                    <RadioGroup.Option
                        disabled={!paymentProcessor.enabled}
                        key={paymentProcessor.id}
                        value={paymentProcessor.id}
                        className={({active, disabled}) =>
                            cn(
                                active ? 'border-ring ring-2 ring-ring' : 'border-gray-300',
                                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
                                disabled ? 'filter grayscale opacity-80' : ''
                            )
                        }
                    >
                        {({checked, active}) => (
                            <>
                                <span className={cn('flex flex-1', !paymentProcessor.enabled ? 'opacity-50' : '')}>
                                  <span className="flex flex-col">
                                    <img
                                        src={paymentProcessor.icon}
                                        alt={"Logo" + paymentProcessor.name}
                                        className={cn('h-8 w-8 my-2', !paymentProcessor.enabled ? 'filter grayscale' : '')}
                                    />
                                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                      {paymentProcessor.name}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description as="span"
                                                            className="mt-1 flex items-center text-sm text-gray-500">
                                      {paymentProcessor.description}
                                    </RadioGroup.Description>
                                  </span>
                                </span>
                                <CheckCircleIcon
                                    className={cn(!checked ? 'invisible' : '', 'h-5 w-5 text-ring')}
                                    aria-hidden="true"
                                />
                                <span
                                    className={cn(
                                        active ? 'border' : 'border-2',
                                        checked ? 'border-ring' : 'border-transparent',
                                        'pointer-events-none absolute -inset-px rounded-lg'
                                    )}
                                    aria-hidden="true"
                                />
                            </>
                        )}
                    </RadioGroup.Option>
                ))}

                <small className="text-sm text-gray-500 col-span-3">
                    Keamanan data pembayaran anda sangat penting bagi kami. Baca lebih lanjut tentang cara kami
                    melindungi
                    data anda di <Link href="#" className="underline">Kebijakan Privasi</Link>.
                </small>
            </div>
        </RadioGroup>
    );
}
