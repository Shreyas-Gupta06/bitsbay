import UserLayout from "./layout/userLayout";
import { clubsData } from "../../utils/common";
import { bulbOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import {
  codeOutline,
  cashOutline,
  musicalNotesOutline,
  peopleOutline,
  briefcaseOutline,
  schoolOutline,
  starOutline,
  globeOutline,
} from "ionicons/icons";

const groupIcons: Record<string, { icon: string; color: string }> = {
  "Tech Teams & Clubs": { icon: codeOutline, color: "text-blue-500" },
  "Finance & Entrepreneurship": { icon: cashOutline, color: "text-green-700" },
  Music: { icon: musicalNotesOutline, color: "text-red-700" },
  "Volunteer Groups": { icon: peopleOutline, color: "text-yellow-700" },
  Consulting: { icon: briefcaseOutline, color: "text-purple-700" },
  "Skill Development Clubs": { icon: schoolOutline, color: "text-teal-700" },
  "Hobby Clubs": { icon: starOutline, color: "text-orange-700" },
  "Cultural Associations": { icon: globeOutline, color: "text-pink-700" },
};

export default function Clubs() {
  return (
    <UserLayout>
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Clubs</h1>
      <p className="text-gray-600 mb-8 text-lg">
        Explore the various clubs and groups available at BITS Pilani.
      </p>
      {clubsData.map((group, index) => (
        <div
          key={index}
          className="mb-10 bg-gray-200 p-6 rounded-lg shadow-md flex flex-col justify-between"
          style={{ minHeight: "400px" }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-700 flex items-center">
            <IonIcon
              icon={groupIcons[group.groupTitle].icon}
              className={`mr-2 ${groupIcons[group.groupTitle].color}`}
            />
            {group.groupTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow">
            {group.clubs.map((club, clubIndex) => (
              <div
                key={clubIndex}
                className={`p-4 border border-gray-300 rounded-lg shadow-sm ${
                  clubIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <h3 className="text-xl font-medium text-green-700 mb-2">
                  {club.name}
                </h3>
                {club.description && (
                  <div className="text-gray-700">
                    <p className="mb-2">{club.description}</p>
                    {club.recruitment && (
                      <p className="text-sm text-gray-500">
                        Recruitment: {club.recruitment}
                      </p>
                    )}
                  </div>
                )}
                {club.insight && (
                  <div className="text-yellow-600 flex items-center mt-2">
                    <IonIcon icon={bulbOutline} className="mr-2" />
                    <span>{club.insight}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </UserLayout>
  );
}
