import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-full justify-center text-gray-200 gap-2.5">
      Only playground is ready here.
      <Link
        href={"/auth/login"}
        className="bg-orange-500 text-orange-100 px-5 py-2 rounded-md"
      >
        Go to Login
      </Link>
    </div>
  );
}
