"use server";
import User from "@/models/User";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import connectDB from "@/lib/db";

const Signout = async () => {
  "use server";
  await signOut();
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

  if (!name || !email || !password || !ssn || !dateOfBirth) {
    return { message: "قم بتعبئة جميع البيانات من فضلك" };
  }

  if (password.length < 6) {
    return { message: "استخدم كلمة مرور تحتوي على اكثر من 6 خانات" };
  }

  if (password !== formData.get("confirmPassword")) {
    return { message: "كلمات المرور غير متطابقة" };
  }

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
    phoneNumber: "8888888888",
    dateOfBirth,
  });
  redirect("/login");
};

export { register, login, Signout };
