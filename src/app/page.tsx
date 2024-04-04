import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="text-3xl font-bold">HoyoLog </div>
        <div className="text-xl font-bold">
          Site for your gacha history from Genshin and HSR
        </div>
        <div className="flex flex-row justify-center gap-2">
          <Link href="/sign-in" className="rounded-xl bg-purple-800 px-4 py-2">
            Sign In
          </Link>
          <Link href="/sign-up" className="rounded-xl bg-purple-800 px-4 py-2">
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
