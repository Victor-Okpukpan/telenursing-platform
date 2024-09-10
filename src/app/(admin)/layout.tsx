/* eslint-disable @next/next/no-img-element */
"use client";
import { adminLinks } from "@/lib/constants";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  const isPath = (path: string) => {
    return path === pathname;
  };
  return (
    <main>
      <div className="relative max-w-[1400px] mx-auto">
        <div className="bg-[#252525] fixed top-0 bottom-0 px-4 py-14">
          <div className="flex flex-col h-full pb-12">
            <div className="flex-1">
              {adminLinks.map((links, i) => {
                return (
                  <Link key={i} href={links.link}>
                    <div
                      className={`${
                        isPath(links.link) && "bg-[#383838]"
                      }  flex items-center transition-all ease-out duration-200 px-4 py-3 space-x-3 my-3 rounded-[10px]`}
                    >
                      <span
                        className={`${
                          isPath(links.link) ? "text-white" : "text-[#A8A8A8]"
                        } font-medium md:text-base`}
                      >
                        {links.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center space-x-3">
              <div className="">
                <p className="text-white font-medium text-base">
                  {session?.data?.user?.name}
                </p>
                <p className="text-[#A8A8A8] text-xs font-medium">
                  {session?.data?.user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="text-white bg-blue-500 mt-3 p-2 rounded"
            >
              Sign out
            </button>
          </div>
        </div>
        <div className="pl-48">{children}</div>
      </div>
    </main>
  );
}
