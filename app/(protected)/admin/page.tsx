"use client"

import { admin } from '@/actions/admin';
import { RoleGate } from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';
import React from 'react'
import { toast } from 'sonner';

const AdminPage = () => {

    const onApiRouteClick = () => {
        fetch("/api/admin").then((response) => {
            if (response.ok) {
                toast.success("Allowed Api Route")
            }
            else {
                toast.error("FORBIDDEN")
            }
        })
    }
    const onServerActionClick = () => {
        admin().then((response) => {
            if (response.error) {
                toast.error(response.error)
            }
            if (response.success) {
                toast.success(response.success)
            }
        })
    }
    return (
        <Card className='w-[600px]'>
            <CardHeader>
                <p className='text-2xl font-semibold text-center '>
                    Admin
                </p>
            </CardHeader>
            <CardContent className='space-y-4'>
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message='You are allowed to view this page' />
                </RoleGate>
                <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
                    <p className='text-sm font-medium'>
                        Admin only API Route
                    </p>
                    <Button onClick={onApiRouteClick}>
                        Click To test
                    </Button>
                </div>

                <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
                    <p className='text-sm font-medium'>
                        Admin only Server
                    </p>
                    <Button onClick={onServerActionClick}>
                        Click To test
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default AdminPage;
