
export const footerLinks = {
    "customerTitle": [
        { name: "contactUs", href: "/contact" },
        { name: "faq", href: "/faq" },
        { name: "shipping", href: "/shipping" },
        { name: "ourStory", href: "/our-story" },
    ],
    "legals": [
        { name: "privacy", href: "/legals/privacy" },
        { name: "terms", href: "/legals/terms" },
        { name: "disclaimer", href: "/legals/disclaimer" },
    ],
};
// Import existing images for now - in production you'd have actual before/after images
import customer1 from "@/assets/res1.jpg";
import customer2 from "@/assets/res2.jpg";
import customer3 from "@/assets/res3.jpg";
import customer4 from "@/assets/res4.jpg";
export const results = [
    {
        id: 1,
        title: "Acne Scar Treatment",
        beforeImage: customer1,
        afterImage: customer2,
        duration: "4 weeks",
        concern: "Acne Scars",
        improvement: "85% reduction",
        products: ["Vitamin C Serum", "Niacinamide Serum", "Moisturizer"],
        rating: 5,
        testimonial: "Amazing results! My acne scars have significantly faded and my skin looks so much smoother."
    },
    {
        id: 2,
        title: "Dark Spots & Pigmentation",
        beforeImage: customer3,
        afterImage: customer4,
        duration: "6 weeks",
        concern: "Pigmentation",
        improvement: "90% brighter",
        products: ["Brightening Serum", "Sunscreen SPF 50", "Night Moisturizer"],
        rating: 5,
        testimonial: "The dark spots are almost completely gone. I can't believe the transformation!"
    }
];