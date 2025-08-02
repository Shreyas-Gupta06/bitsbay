export default function ErrorPage() {
  return (
    <div className="w-full min-h-screen flex flex-col font-['Intel One Mono'] overflow-x-hidden">
      {/* Header */}
      <header className="w-full bg-[#123924] text-white flex items-center justify-center px-4 py-3">
        <a href="/auth/login" className="text-2xl font-bold text-center">
          BITSbay
        </a>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 px-4 py-6 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Error: This page doesn't exist
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Please click below to return to the login page.
        </p>
        <a
          href="/auth/login"
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Go to Login
        </a>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#123924] text-white text-center py-2">
        Made with ❤️ by 2139
      </footer>
    </div>
  );
}
