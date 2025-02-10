interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="w-full bg-gray-900 text-white py-3 px-6 flex items-center">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <img src="/gbLogo.png" alt="GitHub" className="h-6" />
          GitHub <span className="text-gray-400">/ Profile</span>
        </h1>
      </header>

      <div className="flex flex-col items-center w-full max-w-6xl mx-auto p-4">
        {children}
      </div>
    </div>
  );
}
