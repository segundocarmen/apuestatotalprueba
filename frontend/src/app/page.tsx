import { PageWrapper } from '@/components/layout/wrapper/public';
import { redirect } from 'next/navigation';
import { Constants } from '@/common/Constants';

const IndexPage = () => {
    redirect(Constants.protected.DashBoardAdmin);

    return (
        <PageWrapper>
            <></>
        </PageWrapper>
    );
};

export default IndexPage;
