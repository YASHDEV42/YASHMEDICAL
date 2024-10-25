import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    await connectDB();

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return NextResponse.json(
        { error: "رمز التحقق غير صالح" },
        { status: 400 }
      );
    }

    await User.findByIdAndUpdate(user._id, {
      isVerified: true,
      verificationToken: null,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء التحقق من البريد الإلكتروني" },
      { status: 500 }
    );
  }
}
