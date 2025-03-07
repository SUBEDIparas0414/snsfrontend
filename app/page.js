"use client"
import Herosection from "@/components/herosection";
import Image from "next/image";
import AuthForm from "./(auth)/login/page";
import Service from "@/components/service";
import Privacypolice from "@/components/privacypolice";
import News from "@/components/news";
import { useEffect, useRef } from "react";

export default function Home() {

  const homeRef = useRef(null)
  const aboutRef = useRef(null)
  const servicesRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    const hash = window.location.hash
    if (hash === "#about") aboutRef.current?.scrollIntoView({ behavior: "smooth" })
    else if (hash === "#services") servicesRef.current?.scrollIntoView({ behavior: "smooth" })
    else if (hash === "#contact") contactRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])
  return (
    <div className=" ">
      <Herosection  />
      <AuthForm/>
      <Service/>
      <Privacypolice/>
      <News/>

    </div>
  );
}
