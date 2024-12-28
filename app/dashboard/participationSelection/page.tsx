'use client'
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { DataTableDemo } from "@/components/datatable";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function ParticipationSelection() {
  const router = useRouter();
  const token = sessionStorage.getItem('Token');
  let user = null;

  if (token) {
    try {
      user = jwtDecode(token); // Decoding the token and storing user info
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to control the Sheet visibility

  const handleSendEmail = () => {
    toast.success("Email has been sent successfully!");
    setIsAlertOpen(false); // Close the alert dialog after sending email
  };

  const handleDownloadExcelClick = () => {
    setIsSheetOpen(true); // Open the sheet when "Download Excel" is clicked
  };

  return (
    <>
      {/* Section for larger screens */}
      <section className="hidden lg:block text-foreground">
        <div className="mb-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold tracking-tight">Participation Selection</h2>
          </div>
          <div className="flex space-x-2">
            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Options</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={() => setIsAlertOpen(true)}>
                  Send Rejected Email
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadExcelClick}>
                  Download Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Send Email Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>Send Email</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will send emails to all selected participants. Please review before proceeding.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSendEmail}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Alert Dialog for sending email */}
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
              <AlertDialogTrigger asChild></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will send emails to all Rejected participants. Please review before proceeding. Basically those without marked on checkbox.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSendEmail}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Sheet for Download Excel */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger />
              <SheetContent>
                <SheetHeader className="space-y-2">
                  <SheetTitle className="text-xl font-semibold">Hey {user.name} 🙋‍♂️ </SheetTitle>
                  <SheetDescription className="text-sm text-muted-foreground">
                    Download the data of student participants registered for TEDxSIST Feb 2025.<br/>
                  </SheetDescription>
                </SheetHeader>
                <Button className="mt-4">Download Excel</Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTableDemo />
        </div>
      </section>

      {/* Section for mobile screens */}
      <section className="lg:hidden text-foreground">
        <div className="mb-4">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mb-16 items-center justify-center text-center">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        403
      </span>
      <h2 className="my-2 font-heading text-2xl font-bold">
        Hey {user.name}
      </h2>
      <p>
       Probably you are using a mobile view. Please Switch to desktop for this page.
      </p>
      <div className="mt-8 flex justify-center gap-2">
        <Button onClick={() => router.push("/dashboard/qrTicketing")} variant="default" size="lg">
          Go back
        </Button>
        <Button
          onClick={() => router.push("/dashboard/qrTicketing")}
          variant="ghost"
          size="lg"
        >
          Back to Home
        </Button>
      </div>
    </div>
        </div>
      </section>
    </>
  );
}
