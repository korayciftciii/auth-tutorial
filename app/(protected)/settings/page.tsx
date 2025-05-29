"use client"
import { logout } from '@/actions/logout';
import { useCurrentUser } from '@/hooks/use-current-user';
import React from 'react'
import NavBar from '../_components/NavBar';

export default function page() {
    const user = useCurrentUser();
    const handleLogout = () => {
        logout();
    }
    return (
        <>
            <div className='bg-white p-10 rounded-xl'>

                <button type='submit' onClick={handleLogout}>
                    Sign out
                </button>
            </div>
        </>
    )
}
