'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ProgressBar
                height="2px"
                color="var(--accent-brand-400)"
                options={{ showSpinner: false }}
                shallowRouting
            />
            {children}
        </>
    );
};

export default ProgressProvider;