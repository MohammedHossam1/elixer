import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface INews {
    id: number
    link: string
    description: string
    order: string
}
const AnnouncementBar = ({ data }: { data: INews[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const announcements = data || [];

    // Auto-play slider
    useEffect(() => {
        if (announcements.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % announcements.length);
        }, 4000); // Change every 4 seconds

        return () => clearInterval(interval);
    }, [announcements.length]);



    if (announcements.length === 0) {
        return null
    }

    const currentAnnouncement = announcements[currentIndex];

    return (
        <div className=" bg-primary text-background py-2 text-center text-sm font-medium  overflow-hidden">
            <div className="container-wide relative">

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="px-8"
                    >
                        <Link to={currentAnnouncement.link} className="hover:underline">
                            {currentAnnouncement.description && (
                                <p className="truncate">{currentAnnouncement.description}</p>
                            )}
                        </Link>
                    </motion.div>
                </AnimatePresence>


            </div>
        </div>
    );
};

export default AnnouncementBar;