import UserLayout from "./layout/userLayout";

export default function Resources() {
  return (
    <UserLayout>
      <h1 className="text-2xl font-bold mb-4">Resources</h1>
      <ul className="list-disc pl-5">
        <li>
          <a href="#" className="text-blue-500 underline">
            Dummy Link 1
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-500 underline">
            Dummy Link 2
          </a>
        </li>
      </ul>
    </UserLayout>
  );
}
