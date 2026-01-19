import { Navigate } from "react-router-dom";

const Payment = () => {
    const iframeUrl = sessionStorage.getItem("paymentIframe");
    if (!iframeUrl) {
        return <Navigate to="/" />
    }
    return (
        <div className="py-32">
            <iframe src={iframeUrl} width="100%" height="600px" />
        </div>

    )
}

export default Payment