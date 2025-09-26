import React from 'react'
import { Heart, Award, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
const WhatWeStandFor = () => {
    const values = [
        {
            icon: Heart,
            title: "Pure Ingredients",
            description: "Natural, scientifically-proven ingredients that nourish and protect your skin effectively."
        },
        {
            icon: Award,
            title: "Dermatologist Approved",
            description: "All products are tested and recommended by skincare professionals for safety and results."
        },
        {
            icon: Users,
            title: "Healthy Skin Goals",
            description: "We help you achieve clear, healthy, and radiant skin through consistent daily care."
        },
        {
            icon: Sparkles,
            title: "Fast Results",
            description: "Experience visible skin improvements within days of starting your skincare routine."
        }
    ];
    return (
        <section className="py-16 lg:py-24 bg-background overflow-x-hidden">
            <div className="container mx-auto px-4">
                {/* Values Section */}
                <div className="space-y-8">
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground text-center">
                        What We Stand For
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
                                    <h4 className="text-lg font-bold text-foreground">{value.title}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16 space-y-6">
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                        Ready for Healthier Skin?
                    </h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Join thousands who trust ELIXIR for professional skincare results and achieve your healthiest skin goals.
                    </p>
                    <Button
                        size="lg"
                        className="btn-gradient text-white font-semibold px-8 py-6 text-lg"
                    >
                        Start Your Skin Transformation
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default WhatWeStandFor