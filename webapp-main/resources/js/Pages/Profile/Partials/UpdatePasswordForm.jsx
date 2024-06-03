import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/Components/ui/card.jsx";

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Perbarui Kata Sandi</CardTitle>

                <CardDescription>
                    Pastikan akun anda menggunakan kata sandi yang panjang dan unik untuk tetap aman.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={updatePassword} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="current_password" value="Kata Sandi Saat Ini"/>

                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type="password"
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                        />

                        <InputError message={errors.current_password} className="mt-2"/>
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Kata Sandi Baru"/>

                        <TextInput
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                        />

                        <InputError message={errors.password} className="mt-2"/>
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Konfirmasi Kata Sandi Baru"/>

                        <TextInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type="password"
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                        />

                        <InputError message={errors.password_confirmation} className="mt-2"/>
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Simpan</PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
