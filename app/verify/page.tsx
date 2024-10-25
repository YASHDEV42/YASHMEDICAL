"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("جاري التحقق من البريد الإلكتروني...");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("رابط التحقق غير صالح");
        return;
      }

      try {
        const response = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setStatus(
            "تم التحقق من البريد الإلكتروني بنجاح! يمكنك الآن تسجيل الدخول."
          );
          setIsVerified(true);
        } else {
          setStatus("فشل التحقق. الرجاء المحاولة مرة أخرى.");
        }
      } catch (error) {
        setStatus("حدث خطأ أثناء التحقق.");
        console.log(error);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center p-8 rounded-lg border border-gray-200 shadow-md">
        <h1 className="text-2xl font-bold mb-4">التحقق من البريد الإلكتروني</h1>
        <p className="mb-6">{status}</p>
        {isVerified && (
          <Link
            href="/login"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            تسجيل الدخول
          </Link>
        )}
      </div>
    </div>
  );
}
