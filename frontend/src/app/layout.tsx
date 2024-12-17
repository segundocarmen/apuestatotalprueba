import { Roboto_Flex } from 'next/font/google';
import { ProviderStore } from '@/store/provider';
import { Metadata } from 'next';
import { Dictionary } from '@/common/Dictionary';
import '@/scss/globals.scss';

export const metadata: Metadata = {
    title: {
        default: `${Dictionary.homeMetadata.pageName} | ${Dictionary.homeMetadata.titleHome}`,
        template: `%s | ${Dictionary.homeMetadata.pageName}`,
    },
    description: Dictionary.homeMetadata.description,
    icons: {
        icon: Dictionary.homeMetadata.icon,
    },
    openGraph: {
        title: `${Dictionary.homeMetadata.pageName} | ${Dictionary.homeMetadata.titleHome}`,
        description: Dictionary.homeMetadata.description,
        url: Dictionary.homeMetadata.defaulUrl,
        images: `${process.env.NEXT_PUBLIC_SITE_URL}${Dictionary.homeMetadata.defaultImage}`,
        type: 'website',
    },
    // manifest: "/manifest.json",
};

const roboto = Roboto_Flex({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='es'>
            <body className={roboto.className}>
                <ProviderStore>{children}</ProviderStore>
            </body>
        </html>
    );
}
