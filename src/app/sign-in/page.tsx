import { SignIn } from "@clerk/nextjs";

type SingInPageProps = {
    searchParams: {
        fallbackRedirectUrl: string;
    };
};

/**
 * Renders the sign-in page section with a centered SignIn component.
 *
 * @param searchParams - An object containing the `redirectUrl` to redirect the user after sign-in.
 * @returns The JSX element for the sign-in page.
 */
export default function SignInPage({ searchParams: { fallbackRedirectUrl }}: SingInPageProps) {
    return (
        <section className="py-14">
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <SignIn signInUrl='/sign-up' fallbackRedirectUrl={fallbackRedirectUrl}/>
                </div>
            </div>
        </section>
    )
}