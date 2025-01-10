"use client"
import { FC, useEffect } from "react";
import Script from "next/script"
import { CaptchaProps, TurnstileWindow } from "../types/captcha";
import { usePathname } from "next/navigation";
   

const Captcha: FC<CaptchaProps> = ({ size = "flexible" }) => {

    const pathname = usePathname();

    useEffect(() => {
        const w = window as TurnstileWindow;

        const turnstileContainers =
            document.querySelectorAll(".cf-turnstile");

        turnstileContainers.forEach((turnstileContainer) => {
            turnstileContainer.innerHTML = "";
            if (w && w.turnstile) {
                w.turnstile.render(turnstileContainer, {
                    sitekey:
                        process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!,
                    callback: "javascriptCallback",
                    theme:"light",
                });
            }
        });
    }, [pathname]);

    return (
        <main>
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
                async 
                defer
                strategy="lazyOnload"
            />
            <div
                className="cf-turnstile"
                data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY}
                data-callback="javascriptCallback"
                data-theme="light"
                data-size={size}
            ></div>
        </main>
    )
}

export default Captcha
