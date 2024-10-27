import Logo from "@/components/logo";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 items-center gap-2 lg:grid-cols-2">
      <div className="w-full grid-cols-1 md:grid-cols-1">
        <div className="flex justify-center">
          <Logo
            width={200}
            height={200}
            className="h-32 w-32 lg:h-44 lg:w-44"
          />
        </div>
        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">{children}</div>
        </div>
      </div>
      <div className="hidden items-center justify-center p-8 lg:flex">
        <Image
          src="/images/auth-image.png"
          alt="image"
          width={700}
          height={500}
          quality={100}
          className="h-auto max-w-full object-contain"
        />
      </div>
    </div>
  );
}
