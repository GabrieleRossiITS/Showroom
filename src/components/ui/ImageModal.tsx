import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ImageModalProps {
    imageUrl: string;
    alt: string;
    onClose: () => void;
}

export default function ImageModal({ imageUrl, alt, onClose }: ImageModalProps) {
    return (
        <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
        >
            <div className="group absolute top-4 right-4 z-50">
                <button className="text-white group-hover:text-red-500 transition-colors" onClick={onClose}><X /></button>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl cursor-default" onClick={e => e.stopPropagation()}>
                <img
                    src={imageUrl}
                    alt={alt}
                    className="w-auto h-[80vh]"
                />
            </div>
        </motion.div>
    )
}
