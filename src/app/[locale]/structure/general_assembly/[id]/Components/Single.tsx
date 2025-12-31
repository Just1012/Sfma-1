"use client";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const Single = ({ id }) => {
  const lang = useLocale();
  const [content, setContent]: any = useState({});
  const [loadingContent, setLoadingContent] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    const fetchSinglePath = async () => {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}members/get-member-details/${id}`;
      try {
        setLoadingContent(true);
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Accept-Language": lang || "ar",
          },
          cache: "no-store",
        });
        const data = await res.json();
        setContent(data?.data || {});
        setLoadingContent(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoadingContent(false);
      }
    };

    fetchSinglePath();
  }, [lang, id]);

  return (
    <div>
      <div className="bg-[#F6F6F6] lg:max-w-2/3 mx-auto shadow flex items-center justify-start lg:col-span-1 md:col-span-2 col-span-3 rounded-md text-center lg:p-6 p-4">
        <div className="lg:w-32 w-28 border-2 border-[var(--second_main)] rounded-lg">
          <img
            src={`https://sffma.fmexcon.com/storage/${content?.image}`}
            alt="About Us"
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-lg "
          />
        </div>
        <div className="ms-4">
          <p className="font-bold lg:text-xl text-base">{content?.name}</p>
          <p className="lg:text-base text-[13px] mt-1">{content?.position}</p>
        </div>
      </div>
      <div className="lg:max-w-2/3 mx-auto">
        <p className="font-bold mt-5 mb-2">{t("common.resume")}</p>

        {/* <p>{content?.bio}</p> */}
        <div
          className="text-justify font-semibold lg:text-base text-[13px]"
          dangerouslySetInnerHTML={{ __html: content?.description }}
        />
      </div>
    </div>
  );
};

export default Single;
