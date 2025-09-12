import RestorationCertificateReact from '@/components/certification'
import PrivacyPolicy from '@/components/PrivacyPolicy'
import RefundsAndCancellations from '@/components/RefundsAndCancellations'
import TermsContent from '@/components/TermsAndConditions'
// import TermsAndConditions from '@/components/TermsAndConditions'
import React from 'react'

function TermsAndConditions() {
    return (
        <>
            <TermsContent />
            {/* Privacy policy */}
            <PrivacyPolicy />
        </>
    )
}

export default TermsAndConditions
