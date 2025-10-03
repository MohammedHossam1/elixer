import React from 'react'
import { Heart, Award, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
const WhatWeStandFor = () => {
    const { t } = useTranslation();
    
    const values = [
        {
            icon: Heart,
            titleKey: "whatWeStandFor.values.pureIngredients.title",
            descriptionKey: "whatWeStandFor.values.pureIngredients.description"
        },
        {
            icon: Award,
            titleKey: "whatWeStandFor.values.dermatologistApproved.title",
            descriptionKey: "whatWeStandFor.values.dermatologistApproved.description"
        },
        {
            icon: Users,
            titleKey: "whatWeStandFor.values.healthySkinGoals.title",
            descriptionKey: "whatWeStandFor.values.healthySkinGoals.description"
        },
        {
            icon: Sparkles,
            titleKey: "whatWeStandFor.values.fastResults.title",
            descriptionKey: "whatWeStandFor.values.fastResults.description"
        }
    ];
    return (
        <section className="py-16 lg:py-24 bg-background overflow-x-hidden">
            <div className="container mx-auto px-4">
                {/* Values Section */}
                <div className="space-y-8">
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground text-center">
                        {t('whatWeStandFor.title')}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={index}
                                    className="text-center space-y-4 card-elegant p-6 rounded-2xl hover:transform hover:scale-105 transition-all duration-300"
                                >
                                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h4 className="text-lg font-bold text-foreground">{t(value.titleKey)}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {t(value.descriptionKey)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16 space-y-6">
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                        {t('whatWeStandFor.cta.title')}
                    </h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {t('whatWeStandFor.cta.description')}
                    </p>
                    <Button
                        size="lg"
                        className="btn-gradient text-white font-semibold px-8 py-6 text-lg"
                    >
                        {t('whatWeStandFor.cta.button')}
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default WhatWeStandFor