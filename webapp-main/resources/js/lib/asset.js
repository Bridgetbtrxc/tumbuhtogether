import { usePage } from '@inertiajs/react'

export function asset(path) {
    const { baseUrl } = usePage().props
    return baseUrl.replace(/\/+$/, '') + '/' + path.replace(/^\/+/, '')
}
