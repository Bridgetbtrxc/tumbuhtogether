import * as React from "react"
import {cn} from "@/lib/utils"
import {Link} from '@inertiajs/react';

const NavLink = ({active = false, className = '', children, ...props}) => {
    return (

        <Link
            {...props}
            className={
                cn(
                    className,
                    "flex items-center gap-3 rounded-lg px-3 py-4 text-muted-foreground transition-all hover:text-primary",
                    active && "bg-muted text-primary",
                )
            }>
            {children}
        </Link>
    );
}

export { NavLink }
