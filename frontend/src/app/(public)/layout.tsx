import { PageWrapper } from "@/components/layout/wrapper/public";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper>{children}</PageWrapper>;
}
