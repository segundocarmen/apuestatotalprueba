'use client';
import { PageWrapper } from '@/components/layout/wrapper/private';
import SidebarComponent from '@/components/page/sidebar';
import './style.scss';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <SidebarComponent />
            <PageWrapper>{children}</PageWrapper>
        </div>
    );
}
