import { industries } from '@/data/industries'
import React from 'react'
import OnboardingForm from './_component/onboarding-form'
import { getOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'

const OnboardingPage = async() => {
    //check user if aleardy onboaarded
    const {isOnboarded} =await getOnboardingStatus();

    if(isOnboarded) redirect("/dashboard")
  return (
    <main>
        <OnboardingForm industries={industries}/> 
         {/* the reason to make a seprate file because it is going to be client component */}
    </main>
  )
}

export default OnboardingPage