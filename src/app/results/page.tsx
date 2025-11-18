'use client'

import ResultsSection from '@/components/ResultsSection'
import { Suspense } from 'react'

export default function ResultsPage() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main style={{ paddingTop: 52 }}>
                <ResultsSection />
            </main>
        </Suspense>
    )
}
