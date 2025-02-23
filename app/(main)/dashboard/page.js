import { getOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation';
import React from 'react'

const DashboardPage =async () => {
 const {isOnboarded}=await getOnboardingStatus();

 if(!isOnboarded)redirect("/onboarding")
  return (

    <div>
        
    </div>
  )
}

export default DashboardPage