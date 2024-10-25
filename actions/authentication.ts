"use server";
import User from "@/models/User";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import connectDB from "@/lib/db";
import { randomBytes } from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const SignOut = async () => {
  try {
    await signOut();
  } catch (err) {
    console.log(err);
  }
  redirect("/");
};

const login = async (prevState: unknown, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  console.log(email, password);

  if (!email || !password) {
    return { message: "قم بتعبئة جميع البيانات من فضلك" };
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user) {
    return { message: "لم نسطتع ايجاد مستخدم مرتبط بالايميل المدخل" };
  }
  const valid = user ? await bcrypt.compare(password, user.password) : false;
  if (!valid) {
    return { message: "كلمة المرور غير صحيحة" };
  }

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (err) {
    console.log(err);
  }
  redirect("/");
};

const register = async (prevState: unknown, formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const ssn = formData.get("ssn") as string;
  const dateOfBirth = formData.get("date_of_birth") as string;
  const phoneNumber = formData.get("phone_number") as string;
  console.log(name, email, password, ssn, dateOfBirth);

  if (!name || !email || !password || !ssn || !dateOfBirth) {
    return { message: "قم بتعبئة جميع البيانات من فضلك" };
  }

  if (password.length < 6) {
    return { message: "استخدم كلمة مرور تحتوي على اكثر من 6 خانات" };
  }

  if (password !== formData.get("confirmPassword")) {
    return { message: "كلمات المرور غير متطابقة" };
  }
  const verificationToken = randomBytes(32).toString("hex");
  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { message: "المستخدم بالفعل موجود" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    name,
    email,
    password: hashedPassword,
    ssn,
    phoneNumber,
    dateOfBirth,
    verificationToken,
    isVerified: false,
  });
  const verificationLink = `${process.env.NEXTAUTH_URL}/verify?token=${verificationToken}`;
  try {
    await resend.emails.send({
      from: "<yahyashannat-portfolio.netlify.app>",
      to: email,
      subject: "تحقق من بريدك الإلكتروني",
      html: `
        <div dir="rtl">
          <h2>تحقق من بريدك الإلكتروني</h2>
          <p>الرجاء النقر على الرابط أدناه للتحقق من بريدك الإلكتروني:</p>
          <a href="${verificationLink}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-decoration: none; border-radius: 4px;">
            تحقق من البريد الإلكتروني
          </a>
          <p>إذا لم تقم بطلب هذا البريد الإلكتروني، يمكنك تجاهله بأمان.</p>
        </div>
      `,
    });
    return {
      message: "تم التسجيل بنجاح",
      success: true,
    };
  } catch (err) {
    console.log(err);
    return {
      message: "حدث خطأ أثناء الإرسال",
      success: false,
    };
  }
};

export { register, login, SignOut };
