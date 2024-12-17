/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';

export default function useFocus() {
    const htmlElRef: any = useRef(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    const setFocus = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        htmlElRef.current && htmlElRef.current?.focus();
    };

    return [htmlElRef, setFocus];
}
