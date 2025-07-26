import UserLayout from "./layout/userLayout";
import { useSpring, animated } from "@react-spring/web";

export default function Home() {
  const words = [
    "SU",
    "Bitsian",
    "Lite",
    "Compre",
    "Grind",
    "Midsems",
    "Rooftop 💋",
    "PS1",
    "BITS",
    "PS2",
    "Clock Tower",
    "Shiv Ganga",
    "OASIS",
    "APOGEE",
    "BOSM",
    "Fests",
    "Cnot",
    "Looters",
    "ANC",
    "Akshay",
    "Snake Path",
    "Politics",
    "DCC",
  ];

  const isMobile = window.innerWidth <= 768;

  const scrollingAnimationTop = useSpring({
    from: { transform: isMobile ? "translateX(-50%)" : "translateX(-100%)" },
    to: { transform: "translateX(100%)" },
    config: { duration: 20000 },
    loop: true,
  });

  const scrollingAnimationBottom = useSpring({
    from: { transform: isMobile ? "translateX(50%)" : "translateX(100%)" },
    to: { transform: "translateX(-100%)" },
    config: { duration: 20000 },
    loop: true,
  });

  return (
    <UserLayout className="no-scroll">
      <div className="relative w-full h-screen bg-white overflow-hidden">
        <div className="absolute top-[32%] w-full flex items-center justify-center">
          <animated.div
            style={scrollingAnimationTop}
            className="flex space-x-4 text-gray-500 text-xl font-bold whitespace-nowrap"
          >
            {words.map((word, index) => (
              <span key={index} className="flex items-center">
                {word}
                <span className="mx-2 w-2 h-2 bg-gray-500 rounded-full"></span>
              </span>
            ))}
          </animated.div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-black text-4xl font-bold text-center">
            Welcome to BITSbay!
            <br />
            Click on ☰ to get started.
          </h1>
        </div>
        <div className="absolute top-[68%] w-full flex items-center justify-center">
          <animated.div
            style={scrollingAnimationBottom}
            className="flex space-x-4 text-gray-500 text-xl font-bold whitespace-nowrap"
          >
            {words.map((word, index) => (
              <span key={index} className="flex items-center">
                {word}
                <span className="mx-2 w-2 h-2 bg-gray-500 rounded-full"></span>
              </span>
            ))}
          </animated.div>
        </div>
      </div>
    </UserLayout>
  );
}
