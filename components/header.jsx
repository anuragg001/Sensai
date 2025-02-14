import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'

const Header = () => {
  return (
    <header className='fixed top-0  w-full border-b bg-background/80
    backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60 '>
      <nav className='flex items-center container justify-between mx-auto px-4 h-16'>
        <Link href="/">
          <Image src="/logo.png"
            alt='Sensai Logo'
            width={200}
            height={60}
            className='h-12 py-1  w-auto object-contain' />

        </Link>

        <div className='flex items-center space-x-2 md:space-x-4 '>

          <SignedIn>
            <Link href="/dashboard">
              <Button variant={"outline"} >
                <LayoutDashboard className='h-4 w-4' />
                <span className='hidden md:block'> Industry Insights</span>
              </Button>
            </Link>


          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>

                <StarsIcon className='h-4 w-4' />
                <span className='hidden md:block'> Growth Tools</span>
                <ChevronDown />

              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>

              <DropdownMenuItem>
                <Link href="/resume" className='flex items-center gap-2'>
                  <FileText className='h-4 w-4' />
                  <span >Build Resume</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/ai-coverLetter" className='flex items-center gap-2'>
                  <PenBox className='h-4 w-4' />
                  <span >Cover Letter</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/interview" className='flex items-center gap-2'>
                  <GraduationCap className='h-4 w-4' />
                  <span>Interview Prep</span>
                </Link>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
          </SignedIn>



      <SignedOut>
        <SignInButton>
          <Button variant={"outline"}>Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton
        appearance={{
          elements:{
            avatarBox:'h-10 w-10',
            userButtonPopoverCard:"shadow-xl",
            userPreviewMainIdentifier:"font-semibold "
          }
        }} />
      </SignedIn>
        </div>

      </nav>

    </header>
  )
}

export default Header