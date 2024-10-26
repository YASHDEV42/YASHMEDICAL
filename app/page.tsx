import { auth } from "@/auth";
import HomePage from "./HomePage";
import { Session } from "next-auth";
import { PatientType } from "@/types/User";
export default async function Home() {
  const session = (await auth()) as Session | null;
  const user = session?.user as PatientType | null;

  return <>{user && <HomePage user={user || null} />}</>;
}
