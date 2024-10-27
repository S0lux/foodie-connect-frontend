export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto p-4">
        <div className="flex flex-col items-center gap-8 lg:flex-row">
          <div className="w-full rounded-lg bg-white p-6 shadow-md lg:w-1/2">
            {children}
          </div>

          <div className="sticky top-4 w-full lg:w-1/2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md">
              <img
                src="https://placehold.co/600x400"
                alt="Right side image"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
