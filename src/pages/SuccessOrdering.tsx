import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SuccessOrdering = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background py-32">
            <main className="container mx-auto px-2 lg:px-6  py-16">
                <div className="max-w-md mx-auto text-center space-y-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold">{t("orderConfirmed")}</h1>
                    <p className="text-muted-foreground">
                        {t("orderConfirmedDescription")}
                    </p>
                    <Button className="w-full btn-gradient text-white ">
                        <a href="/shop" className='block w-full h-full'>{t("continueShopping")}</a>
                    </Button>
                </div>
            </main>
        </div>
    )
}

export default SuccessOrdering