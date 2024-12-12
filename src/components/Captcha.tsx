import { FC } from "react";
import Script from "next/script"
import { CaptchaProps } from "../types/captcha";

const Captcha: FC<CaptchaProps> = ({ size = "flexible" }) => {
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
