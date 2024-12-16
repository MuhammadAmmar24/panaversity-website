"use client"
import { signOut } from "@/src/lib/auth";
import { useState } from "react";
import LogoutDialog from "../Dialog/LogoutDialog";
import { CiLogout } from "react-icons/ci";
import ErrorMessage from "../Error/error_message";

const ErrorLogout = () => {

    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

    const handleSignOut = async () => {
    await signOut();
    window.location.reload();
    };

    return (
        <>
        <div className="flex flex-col justify-end items-start pt-4 sm:gap-1">
            <button
                onClick={() => setIsLogoutDialogOpen(true)}
                className="flex items-center space-x-2 rounded-lg"
                role="Logout"
            >
                <CiLogout className="h-5 w-5 text-gray-700" />
                <span className="text-xs text-gray-700 sm:text-sm">Logout</span>
            </button>
            <ErrorMessage message="Something went wrong" />
        </div>
            <LogoutDialog
                open={isLogoutDialogOpen}
                onOpenChange={setIsLogoutDialogOpen}
                onConfirm={handleSignOut}
            />
        </>
    )
}

export default ErrorLogout