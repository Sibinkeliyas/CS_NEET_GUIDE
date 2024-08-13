"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { userLogout } from "@/context/jwtContext";
import { useSelector } from "@/store";
import { AUTHENTICATION } from "@/types/enums";
import { useRouter } from "next/navigation";

export function UserNav() {
  const router = useRouter();
  const { user, isInitialized } = useSelector((state) => state.authReducer);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isInitialized ? (
          user ? (
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage />
                <AvatarFallback>{user?.name?.[0] || ""}</AvatarFallback>
              </Avatar>
            </Button>
          ) : (
            <>
              <div className="hidden lg:flex">
                <Button
                  className="mr-2"
                  onClick={() => router.push("/sign-in")}
                >
                  {AUTHENTICATION.SIGN_IN}
                </Button>
                <Button onClick={() => router.push("/sign-up")}>
                  {AUTHENTICATION.SIGN_UP}
                </Button>
              </div>
              <div className="flex lg:hidden">
                <Button variant="link" onClick={() => router.push("/sign-in")}>
                  {AUTHENTICATION.SIGN_IN}
                </Button>
                <Button variant="link" onClick={() => router.push("/sign-up")}>
                  {AUTHENTICATION.SIGN_UP}
                </Button>
              </div>
            </>
          )
        ) : (
          <>
            <div className="flex gap-[1.25rem] lg:gap-1 pl-[20px] pr-[20px] lg:p-0">
              <Skeleton className="h-3 lg:h-[36px] w-12 lg:w-[78px]" />
              <Skeleton className="h-3 lg:h-[36px] w-12 lg:w-[83.5px]" />
            </div>
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        {/* <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={userLogout}>
          {AUTHENTICATION.LOGOUT}
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
