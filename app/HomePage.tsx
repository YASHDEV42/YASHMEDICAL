import Image from "next/image";
import React from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { GiTechnoHeart } from "react-icons/gi";
import { FaTooth } from "react-icons/fa";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HomePage = () => {
  return (
    <>
      <section className="lg:w-[80vw] w-[90vw] mx-auto h-screen flex justify-center gap-12 lg:gap-12 lg:justify-around flex-col lg:flex-row items-center">
        <div className="w-1/2">
          <Image src="/logo-1-ai-1.png" alt="main" width={300} height={300} />
        </div>
        <div className="w-2/3">
          <h1 className=" lg:text-6xl md:text-4xl text-2xl font-bold mb-9">
            مرحبا بكم في مجمع البشير
          </h1>
          <p className=" text-xl">
            مجمع البشير هو مجمع طبي يقدم خدمات طبية متنوعة ومتكاملة للمرضى بأعلى
            مستوى من الجودة والمهنية.
          </p>
        </div>
      </section>

      <section className="lg:w-[80vw] w-[90vw] mx-auto h-[150vh] lg:h-[100vh] flex justify-center gap-12 lg:gap-12 lg:justify-around items-center flex-col flex-wrap lg:flex-row">
        <div
          className="w-64 h-72 bg-black text-white flex flex-col justify-center gap-5 items-center rounded-md p-5
           hover:shadow-2xl"
        >
          <GiTechnoHeart size={100} />
          <p>افضل الادوات الحديثة لضمان افضل خدمة</p>
        </div>

        <div
          className="w-64 h-72 bg-black text-white flex flex-col justify-center gap-5 items-center rounded-md p-5
          hover:shadow-2xl"
        >
          <FaTooth size={100} />
          <p>نوفر افضل تعامل وافضل الخدمات</p>
        </div>

        <div
          className="w-64 h-72 bg-black text-white flex flex-col justify-center gap-5 items-center rounded-md p-5
          hover:shadow-2xl"
        >
          <FaUserDoctor size={100} />
          <p>نملك طابق طبي بتخصصات ومؤهلات مرتفعة</p>
        </div>
      </section>

      <section className="lg:w-[80vw] w-[90vw] h-screen mx-auto flex items-center justify-center gap-20 lg:gap-0 lg:justify-around flex-col lg:flex-row">
        <div className=" lg:w-1/4 w-1/3 my-img">
          <Image src="/basheer.jpg" alt="basheer" width={300} height={300} />
        </div>
        <div className="lg:w-1/2 w-full">
          <h2 className="lg:text-5xl md:text-3xl text-xl font-semibold lg:mb-7 md:mb-5 mb-3">
            مركز بشير عبيد للاسنان
          </h2>
          <p className="lg:text-xl md:text-lg text-base opacity-90">
            مركز بشير عبيد لطب الأسنان هو أحد أول المراكز المتخصصة في طب الأسنان
            في الرياض. قدم الدكتور محمد بشير عبيد (رحمه الله) إلى المملكة
            العربية السعودية في عام 1950م ليحظى بشرف خدمة مؤسس المملكة العربية
            السعودية، جلالة الملك عبدالعزيز آل سعود، ليكون طبيبه الخاص. ومع
            ازدهار العمران والنهضة في المملكة وتطورها السريع، افتتح الدكتور محمد
            بشير عبيد (رحمه الله) عيادته الخاصة في شارع الوزير لخدمة المرضى.
            وبعد عدة سنوات، تم نقل العيادة إلى أحد الأحياء التي كانت تُعتبر من
            أرقى أحياء الرياض، في شارع الخزان.
          </p>
          <div>
            <Link
              href="/about"
              className="flex flex-row justify-center items-center gap-2 w-28 bg-black text-white p-2 rounded-md mt-3"
            >
              <ArrowBigLeft /> أقرأ اكثر
            </Link>
            <span></span>
          </div>
        </div>
      </section>

      <section
        className="
      lg:w-[80vw] w-[90vw] mx-auto h-screen flex justify-center gap-16 items-center flex-col flex-wrap
      "
      >
        <h1 className="lg:text-5xl md:text-3xl text-xl font-semibold ">
          ✨ خدماتنا المتميزة
        </h1>
        <Carousel>
          <CarouselContent>
            <CarouselItem className="basis-1/3 flex flex-col justify-start items-center">
              <div className=" w-full h-[85%] flex justify-center items-center bg-slate-100 rounded-md">
                <div>
                  <Image
                    src="/cosmetic fillings.jpg"
                    width={200}
                    height={200}
                    alt="cosmetic fillings"
                  />
                </div>
              </div>
              <h4 className="text-2xl font-semibold mt-5">الحشوات التجميلية</h4>
            </CarouselItem>
            <CarouselItem className="basis-1/3 flex flex-col justify-start items-center">
              <div className=" w-full h-[85%] flex justify-center items-center bg-slate-100 rounded-md">
                <Image
                  src="/dental nerve.png"
                  width={300}
                  height={300}
                  alt="dental nerve"
                  className="
                   object-cover
                "
                />
              </div>
              <h4 className="text-2xl font-semibold mt-5">عصب الأسنان</h4>
            </CarouselItem>
            <CarouselItem className="basis-1/3 flex flex-col justify-start items-center">
              <div className=" w-full h-[85%] flex justify-center items-center bg-slate-100 rounded-md">
                <Image
                  src="/teeth whitning.jpg"
                  width={300}
                  height={300}
                  alt="teeth whitning"
                />
              </div>
              <h4 className="text-2xl font-semibold mt-5">تبييض الأسنان</h4>
            </CarouselItem>
            <CarouselItem className="basis-1/3 flex flex-col justify-start items-center">
              <div className=" w-full h-[85%] flex justify-center items-center bg-slate-100 rounded-md">
                <Image
                  src="/caries.jpg"
                  width={300}
                  height={300}
                  alt="caries"
                />
              </div>
              <h4 className="text-2xl font-semibold mt-5">تسوس الأسنان</h4>
            </CarouselItem>
            <CarouselItem className="basis-1/3 flex flex-col justify-start items-center">
              <div className=" w-full h-[85%] flex justify-center items-center bg-slate-100 rounded-md">
                <Image
                  src="/tooth decay and its treatment.jpg"
                  width={300}
                  height={300}
                  alt="tooth decay and its treatment"
                />
              </div>
              <h4 className="text-2xl font-semibold mt-5">
                تسوس الأسنان وعلاجه
              </h4>
            </CarouselItem>
            <CarouselItem className="basis-1/3 flex flex-col justify-start items-center">
              <div className=" w-full h-[85%] flex justify-center items-center bg-slate-100 rounded-md">
                <Image
                  src="/endodontics.jpg"
                  width={200}
                  height={200}
                  alt="endodontics"
                  className="border-2 border-slate-400"
                />
              </div>
              <h4 className="text-2xl font-semibold mt-5">طب لب الأسنان</h4>
            </CarouselItem>
            <CarouselItem className="basis-1/3 flex flex-col justify-start items-center">
              <div className=" w-full h-[85%] flex justify-center items-center bg-slate-100 rounded-md">
                <Image
                  src="/dress teeth.jpeg"
                  width={300}
                  height={300}
                  alt="dress teeth"
                />
              </div>
              <h4 className="text-2xl font-semibold mt-5">تلبيس اسنان</h4>
            </CarouselItem>
            <CarouselItem className="basis-1/3 flex flex-col justify-start items-center">
              <div className=" w-full h-[85%] flex justify-center items-center bg-slate-100 rounded-md">
                <Image
                  src="/dental implants.jpg"
                  width={300}
                  height={300}
                  alt="dental implants"
                />
              </div>
              <h4 className="text-2xl font-semibold mt-5">زراعة اسنان</h4>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </>
  );
};

export default HomePage;
