import UserLayout from "./layout/userLayout";

export default function Developers() {
  return (
    <UserLayout className="no-scroll">
      <div className="text-center">
        <h2 className="text-[#123924] text-4xl font-bold">Shreyas Gupta</h2>
        <p className="text-gray-600 text-lg mt-2">Batch of 2024</p>
        <div className="flex justify-center gap-8 mt-4">
          <a
            href="https://github.com/Shreyas-Gupta06"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt="GitHub"
              className="w-12 h-12"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/shreyas-gupta-1980491b0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Linkedin_icon.svg"
              alt="LinkedIn"
              className="w-12 h-12"
            />
          </a>
          <a
            href="https://www.instagram.com/shreyasgupta21"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              className="w-12 h-12"
            />
          </a>
        </div>
      </div>

      <div className="my-12 flex items-center w-full max-w-md">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-6 text-gray-500 text-2xl">●</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="text-center">
        <h2 className="text-[#123924] text-4xl font-bold">Srijan Sahay</h2>
        <p className="text-gray-600 text-lg mt-2">Batch of 2024</p>
        <div className="flex justify-center gap-8 mt-4">
          <a
            href="https://github.com/SrijanSahay05"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt="GitHub"
              className="w-12 h-12"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/srijansahay05/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Linkedin_icon.svg"
              alt="LinkedIn"
              className="w-12 h-12"
            />
          </a>
          <a
            href="https://www.instagram.com/srijansahay05"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              className="w-12 h-12"
            />
          </a>
        </div>
      </div>
    </UserLayout>
  );
}
