import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9F8F6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#111111] font-[var(--font-heading)]">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-[#876A5C]">
            Join our community of artisan lovers
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl border-[#D0D3D8]",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton:
                "bg-white hover:bg-[#F9F8F6] border-[#D0D3D8]",
              formButtonPrimary: "bg-[#876A5C] hover:bg-[#6B5449] text-white",
              footerActionLink: "text-[#876A5C] hover:text-[#6B5449]",
            },
          }}
        />
      </div>
    </div>
  );
}
