'use client';

import { useEffect, useState } from 'react';

export default function useVerifyLink() {
    const [path, setPath] = useState<string>();

    // useEffect(() => {
    //     const pathCheck = window.location.pathname;
    //     setPath(pathCheck);
    // }, [location]);

    useEffect(() => {
        const pathCheck = window.location.pathname;
        setPath(pathCheck);
    }, []);

    const getIsActive = (item: string) => {
        if (path === item) {
            return 'active';
        } else {
            return '';
        }
    };

    const validateActive = (item: string) => {
        if (path === item) {
            return true;
        } else {
            return false;
        }
    };

    return { getIsActive, validateActive, path };
}
