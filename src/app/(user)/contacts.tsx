import { useState } from "react";
import UserLayout from "./layout/userLayout";
import { IonIcon } from "@ionic/react";
import {
  callOutline,
  informationCircleOutline,
  chevronDownOutline,
  chevronUpOutline,
} from "ionicons/icons";
import { hostelOptions, contactsByHostel } from "../../utils/common";

const additionalInfo = `Cleaners numbers:\nWill be present in the utility services providers record next to the daily complaint register, note that the cleaners change daily.\n\nNote: For any problem, please call or meet with the Chowkidhar, if the problem remains unsolved for more than 3 days or is urgent, then contact the Superintendent or the Warden. Do not unnecessarily involve any higher ups without consulting with the Chowkidhar, Superintendent or Warden.`;

export default function Contacts() {
  const [hostel, setHostel] = useState(hostelOptions[0].value);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const contacts = contactsByHostel[hostel] || [];

  return (
    <UserLayout>
      <div className="w-full min-h-screen flex flex-col items-center px-4 py-8 font-['Intel One Mono'] bg-gray-50">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="mb-8">
            <button
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg text-lg font-semibold text-gray-800 focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>
                Select Hostel:{" "}
                {hostelOptions.find((h) => h.value === hostel)?.label}
              </span>
              <IonIcon
                icon={dropdownOpen ? chevronUpOutline : chevronDownOutline}
                className="w-5 h-5"
              />
            </button>
            {dropdownOpen && (
              <div className="mt-2 bg-white border rounded-lg shadow-sm">
                {hostelOptions.map((opt) => (
                  <div
                    key={opt.value}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      hostel === opt.value ? "font-bold text-blue-700" : ""
                    }`}
                    onClick={() => {
                      setHostel(opt.value);
                      setDropdownOpen(false);
                    }}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          <h2 className="text-3xl font-bold text-blue-900 mb-6 flex items-center">
            <IonIcon
              icon={callOutline}
              className="w-7 h-7 text-blue-600 mr-3"
            />
            {hostelOptions.find((h) => h.value === hostel)?.label} Contacts
          </h2>
          <div className="flex flex-col gap-5">
            {contacts.map((c, idx) => {
              if (c.label === "Hostel Admission Office" && !c.phone) {
                return null;
              }
              if (c.label === "Hostel Admission Office") {
                return (
                  <div
                    key={c.label}
                    className={`flex flex-col items-start p-5 rounded-xl shadow-sm border bg-blue-50 border-blue-400 transition-all duration-150`}
                  >
                    <span className="text-base sm:text-lg font-semibold text-blue-700 break-words w-full flex items-center gap-2 mb-1">
                      <IonIcon
                        icon={informationCircleOutline}
                        className="w-5 h-5 text-blue-500"
                      />
                      {c.label}
                    </span>
                    <span className="text-blue-700 font-bold text-base sm:text-lg whitespace-nowrap w-full">
                      {c.phone}
                    </span>
                  </div>
                );
              }
              return (
                <div
                  key={c.label}
                  className={`flex flex-col items-start p-5 rounded-xl shadow-sm border transition-all duration-150 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <span className="text-base sm:text-lg font-medium text-gray-800 break-words w-full mb-1">
                    {c.label}
                  </span>
                  <a
                    href={`tel:${c.phone.replace(/\s+/g, "")}`}
                    className="text-blue-600 font-bold text-base sm:text-lg flex items-center gap-2 hover:underline whitespace-nowrap w-full"
                  >
                    <IonIcon
                      icon={callOutline}
                      className="w-5 h-5 text-blue-600"
                    />
                    {c.phone}
                  </a>
                </div>
              );
            })}
          </div>
          <div className="mt-10 w-full max-w-2xl mx-auto">
            <div className="bg-gray-100 rounded-xl p-6 mb-6">
              <h3 className="text-2xl font-bold text-center mb-6">
                EMERGENCY CONTACTS:
              </h3>
              <div className="flex flex-col gap-5">
                {/* Emergency contacts for Shankar Bhawan only */}
                <div className="flex items-start gap-3 border-l-4 border-green-500 pl-3">
                  <div>
                    <span className="font-bold text-lg text-black">
                      Chief Warden
                    </span>
                    <br />
                    <span className="text-gray-700">Prof. RP Mishra</span>
                    <br />
                    <a
                      href="tel:+919694096457"
                      className="text-blue-600 font-bold text-lg hover:underline"
                    >
                      +91 96940 96457
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-l-4 border-green-500 pl-3">
                  <div>
                    <span className="font-bold text-lg text-black">
                      Assoc. Dean SWD
                    </span>
                    <br />
                    <span className="text-gray-700">Prof. Navin Singh</span>
                    <br />
                    <a
                      href="tel:+919887321072"
                      className="text-blue-600 font-bold text-lg hover:underline"
                    >
                      +91 98873 21072
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-l-4 border-green-500 pl-3">
                  <div>
                    <span className="font-bold text-lg text-black">
                      Chief Security Officer
                    </span>
                    <br />
                    <a
                      href="tel:+919414082758"
                      className="text-blue-600 font-bold text-lg hover:underline"
                    >
                      +91 94140 82758
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-l-4 border-green-500 pl-3">
                  <div>
                    <span className="font-bold text-lg text-black">
                      SWD Office
                    </span>
                    <br />
                    <a
                      href="tel:01596242282"
                      className="text-blue-600 font-bold text-lg hover:underline"
                    >
                      01596242282
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex items-start gap-3 bg-gray-100 border-l-4 border-blue-400 p-4 sm:p-6 rounded-xl w-full"
              style={{
                fontSize: "1.05rem",
                lineHeight: "1.7",
                wordBreak: "break-word",
              }}
            >
              <IonIcon
                icon={informationCircleOutline}
                className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0"
              />
              <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line w-full">
                {additionalInfo}
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
