"use client";

import {
    FacebookIcon,
    InstagramIcon,
    LinkedinIcon,
    Twitter,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import Dock from "./ui/dock";

const items = [
    {
        icon: <FacebookIcon size={18} />,
        label: "Facebook",
        onClick: () => alert("Home!"),
    },
    {
        icon: <Twitter size={18} />,
        label: "Twitter",
        onClick: () => alert("Archive!"),
    },
    {
        icon: <InstagramIcon size={18} />,
        label: "Instagram",
        onClick: () => alert("Profile!"),
    },
    {
        icon: <LinkedinIcon size={18} />,
        label: "Linkedin",
        onClick: () => alert("Settings!"),
    },
];

const footerData = [
    {
        title: "Home",
        links: [
            { label: "citizen Detail", href: "#" },
            { label: "", href: "#" },
            { label: "Classic Overlay", href: "#" },
            { label: "Hero Slider", href: "#" },
            { label: "Featured Posts", href: "#" },
        ],
    },
    {
        title: "Services",
        links: [
            { label: "Technology", href: "#" },
            { label: "Travel", href: "#" },
            { label: "Sport", href: "#" },
            { label: "Business", href: "#" },
        ],
    },
    {
        title: "Privacy Policy",
        links: [
            { label: "About", href: "#" },
            { label: "Categories", href: "#" },
            { label: "Contacts", href: "#" },
        ],
    },
    {
        title: "News",
        links: [
            { label: "About", href: "#" },
            { label: "Categories", href: "#" },
            { label: "Contacts", href: "#" },
        ],
        
    },
    {
        title: "Contact Us",
        links: [
            { label: "About", href: "#" },
            { label: "Categories", href: "#" },
            { label: "Contacts", href: "#" },
        ],
        
    },
];

export default function Footer() {
    return (
        <div className=" bg-[#4438ca76]">
            <div className="relative w-11/12 mx-auto py-12 border-t flex ">
            <div className="w-6/12 space-y-16">
                <div className="flex flex-col gap-4">
                    <Image
                        className="w-32 h-full"
                        src="/snslogo.png"
                        alt="img"
                        height={500}
                        width={500}
                    />
                    <p className="w-10/12 text-black/70 font-semibold text-sm pr-16 tracking-wide leading-7">
                    Empowering citizens with seamless access to essential services. Our online citizenship portal is your gateway to digital governance, providing secure, efficient, and transparent solutions. Stay informed, stay connected, and take charge of your civic responsibilities with ease.
                    </p>
                    <div className="relative flex text-black">
                        <Dock
                            items={items}
                            panelHeight={68}
                            baseItemSize={40}
                            magnification={70}
                        />
                    </div>
                </div>
                <p className="text-black text-xs pt-10">
                    © 2025 — SAJILO NAGARIK SEWA. All Rights Reserved.
                </p>
            </div>

            <div className="w-6/12 flex flex-col items-end">
                <div className="flex gap-16">
                    {footerData.map((data, index) => (
                        <div key={index} className="flex flex-col gap-4">
                            <p className="font-semibold text-black">{data.title}</p>
                            <div className="flex flex-col gap-3">
                                {data.links.map((category, index) => (
                                    <p key={index} className="text-black font-semibold hover:text-gray-700">
                                        <a href={category.href}>{category.label}</a>
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
}
