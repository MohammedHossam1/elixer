import { IWhyChooseUs } from '@/types/Index';
import { useTranslation } from "react-i18next";
import Image from './shared/Image';
const WhatWeStandFor = ({ data }: { data: IWhyChooseUs[] }) => {
    console.log(data, "data");
    const { t } = useTranslation();
    if (!data || !data.length) return null
    return (
        <section className="py-10 lg:py-12 bg-background overflow-x-hidden">
            <div className="container mx-auto px-2 lg:px-6 ">
                {/* Values Section */}
                <div className="space-y-8">
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground text-center">
                        {t('whatWeStandFor.title')}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {data?.map((value, index) => {
                            return (
                                <div
                                    key={index}
                                    className="text-center space-y-4 card-elegant p-6 rounded-2xl hover:transform hover:scale-105 transition-all duration-300"
                                >
                                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                                        <Image
                                            src={value.image}
                                            alt={value.title}
                                            width={100}
                                            className="w-10 h-10 rounded-full"
                                            height={100}
                                        />
                                    </div>
                                    <h4 className="text-lg font-bold text-foreground">{t(value.title)}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {t(value.description)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

          
            </div>
        </section>
    )
}

export default WhatWeStandFor