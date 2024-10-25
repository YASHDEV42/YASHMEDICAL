export default function VerifyRequest() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center p-8 rounded-lg border border-gray-200 shadow-md max-w-md">
        <h1 className="text-2xl font-bold mb-4">تحقق من بريدك الإلكتروني</h1>
        <div className="space-y-4">
          <p>تم إرسال رابط التحقق إلى بريدك الإلكتروني.</p>
          <p>
            يرجى التحقق من صندوق الوارد والبريد غير المرغوب فيه للعثور على رسالة
            التحقق.
          </p>
          <p className="text-sm text-gray-500">
            إذا لم تتلق البريد الإلكتروني في غضون بضع دقائق، يرجى محاولة تسجيل
            الدخول مرة أخرى.
          </p>
        </div>
      </div>
    </div>
  );
}
