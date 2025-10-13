import { useGetHomePage } from "@/hooks/fetch-hooks";
import { useParams } from "react-router-dom";

type slugTpe = "privacy" | "terms" | "faq" | "disclaimer";

const FooterLegalPage = () => {
    const { slug } = useParams<{ slug: slugTpe }>();
    const { data } = useGetHomePage("en");

    // Map slug to translated title and content key
    const slugTitleMap: Record<slugTpe, string> = {
        privacy: "Privacy policy",
        terms: "Terms and conditions",
        faq: "FAQ",
        disclaimer: "Disclaimer",
    };

    let finalData = "";
    if (slug === "privacy") {
        finalData = data?.data?.settings?.legal_documents?.privacy_policy;
    } else if (slug === "terms") {
        finalData = data?.data?.settings?.legal_documents?.terms_conditions;
    } else if (slug === "faq") {
        finalData = data?.data?.settings?.legal_documents?.faq;
    } else if (slug === "disclaimer") {
        finalData = data?.data?.settings?.legal_documents?.disclaimer;
    }

    const pageTitle = slug && slugTitleMap[slug] ? slugTitleMap[slug] : "Privacy policy";

    return (
        <section className="container mx-auto px-2   lg:px-8 py-32 min-h-[calc(100dvh)] ">
            <h1 className="text-3xl font-bold mb-6">{pageTitle}</h1>
            <div dangerouslySetInnerHTML={{ __html: finalData || "" }} />
        </section>
    );
};

export default FooterLegalPage;