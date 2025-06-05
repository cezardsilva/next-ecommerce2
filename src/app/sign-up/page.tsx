import { SignUp } from "@clerk/nextjs";

type SingUpPageProps = {
    searchParams: {
        fallbackRedirectUrl: string;
    };
};

/**
 * Renders the sign-up page for the application.
 *
 * @param searchParams - An object containing query parameters from the URL.
 * @param searchParams.redirectUrl - The URL to redirect to after successful sign-up.
 * @returns The sign-up page component.
 */
export default function SignUpPage({ 
    searchParams: { fallbackRedirectUrl },
    }: SingUpPageProps) {
    return (
        <section className="py-14">
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <SignUp signInUrl='/sign-in' fallbackRedirectUrl={fallbackRedirectUrl} />
                </div>
            </div>
        </section>
    )
}