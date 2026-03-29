import { ISettings } from "@/types/Index";
import { useTranslation } from "react-i18next";
import Image from "./shared/Image";
const Banner = ({data}: {data: ISettings}) => {
    const { t } = useTranslation();

    return (
        <section className="relative overflow-hidden py-4 lg:py-8">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-primary/80" />

            {/* Decorative Blur Circles */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/20 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl opacity-30 translate-x-1/3 translate-y-1/3" />
            <div className="flex items-center justify-between container max-lg:fldex-col max-lg:tdext-center max-lg:justidfy-center mx-auto px-6">
                <div className="relative   text-white space-y-2 lg:space-y-5">
                    <h2 className="text-base border  w-fit py-1 px-2 lg:text-lg md:text-xl font-extrabold leading-tight mb-1 font-serif">
                        {t("banner.title")}
                    </h2>

                    <p className=" text-base md:text-3xl xl:text-4xl text-white font-sans font-bold  ">
                        {t("banner.description1")}<span className="text-yellow-500">{t("banner.description2")}</span>

                        <span className=" text-white inline-block px-2 mb-2 lg:mb-8">
                            { t("banner.description3")}
                        </span> 
                        </p>

                </div>
                {/* <Image src={bannerImg} alt="banner" className="w-1/3 lg:w-1/4 relative  z-[10]" /> */}
                <Image src={data?.logo} alt="banner" className="w-1/3 lg:w-1/4 relative  z-[10]" />
            </div>
        </section>
    );
};

export default Banner;