import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/Components/ui/pagination';

const InertiaPaginator = ({links}) => {
    const renderPaginationItem = (item) => {
        if (item.label === "&laquo; Previous") {
            return (
                <PaginationItem key="prev">
                    <PaginationPrevious href={item.url || undefined} disabled={!item.url}/>
                </PaginationItem>
            );
        } else if (item.label === "Next &raquo;") {
            return (
                <PaginationItem key="next">
                    <PaginationNext href={item.url || undefined} disabled={!item.url}/>
                </PaginationItem>
            );
        } else if (item.label === "...") {
            return (
                <PaginationItem key={item.label}>
                    <PaginationEllipsis/>
                </PaginationItem>
            );
        } else {
            return (
                <PaginationItem key={item.label}>
                    <PaginationLink href={item.url || undefined} isActive={item.active}>
                        {item.label}
                    </PaginationLink>
                </PaginationItem>
            );
        }
    };

    return (
        <Pagination>
            <PaginationContent>
                {links.map(renderPaginationItem)}
            </PaginationContent>
        </Pagination>
    );
};

export default InertiaPaginator;
