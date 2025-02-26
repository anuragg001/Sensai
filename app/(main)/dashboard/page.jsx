import { getIndusrtyInsights } from '@/actions/dashboard';
import { getOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation';
import React from 'react'
import DahboardView from './_components/dashboard-view';



const IndustryInsightsPage =async () => {
 const {isOnboarded}=await getOnboardingStatus();
 const insights= await getIndusrtyInsights();
 

 if(!isOnboarded)redirect("/onboarding")
  return (

    <div className='container mx-auto'>
      <DahboardView insights={insights}/>
    </div>
  )
}

export default IndustryInsightsPage;