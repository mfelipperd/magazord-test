interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
}
