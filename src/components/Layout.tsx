interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full bg-gray-900 flex flex-col items-center">
        <div className="w-full max-w-[1200px] px-4   bg-gray-900 text-white py-3 flex items-center">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <img src="/gbLogo.png" alt="GitHub" className="h-6" />
            GitHub <span className="text-gray-400">/ Profile</span>
          </h1>
        </div>
      </header>

      <main className="w-full max-w-[1200px] px-4 py-6">{children}</main>
    </div>
  );
}
