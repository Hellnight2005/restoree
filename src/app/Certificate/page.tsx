"use client"; // This is correct and needed

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for App Router

const CertificatePage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/cert/index.html');
    }, [router]);

    return null;
};

export default CertificatePage;