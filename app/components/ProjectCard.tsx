"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Project {
    title: string;
    description?: string;
    tags: string[];
    category: string;
    slug?: string;
    image?: string[] | string;
    platform?: string;
    featured?: boolean;
    rating?: string | number;
    liveUrl?: string;
    client?: {
        feedback?: string | null;
    };
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = Array.isArray(project.image)
        ? project.image
        : (project.image ? [project.image] : []);

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (images.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (images.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        }
    };

    const projectUrl = `/projects/${project.slug || project.title.toLowerCase().replace(/\s+/g, "-")}`;
    const hasMultipleImages = images.length > 1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
                scale: 1.03,
                y: -8,
            }}
            className="bg-[#191920] rounded-2xl border border-gray-800 flex flex-col h-full transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 group overflow-hidden relative"
        >
            {/* Image Thumbnail / Slider */}
            {images.length > 0 ? (
                <div className="relative w-full h-48 bg-gray-800 overflow-hidden group/slider">
                    <Image
                        src={images[currentImageIndex]}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300"
                        unoptimized
                    />

                    {/* Slider Controls */}
                    {hasMultipleImages && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover/slider:opacity-100 transition-opacity z-20 cursor-pointer"
                                aria-label="Previous Image"
                            >
                                <span className="material-icons text-white text-sm">chevron_left</span>
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover/slider:opacity-100 transition-opacity z-20 cursor-pointer"
                                aria-label="Next Image"
                            >
                                <span className="material-icons text-white text-sm">chevron_right</span>
                            </button>

                            {/* Dots indicator */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-20 pointer-events-none">
                                {images.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none z-10">
                        <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                            {project.platform}
                        </span>
                        {project.featured && (
                            <span className="bg-yellow-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                                Featured
                            </span>
                        )}
                    </div>

                    <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full pointer-events-none z-10">
                        <span className="material-icons text-yellow-400 text-sm">
                            star
                        </span>
                        <span className="text-white font-semibold text-xs">
                            {project.rating}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="relative w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <span className="material-icons text-gray-600 text-6xl">code</span>
                    <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none z-10">
                        <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                            {project.platform}
                        </span>
                        {project.featured && (
                            <span className="bg-yellow-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                                Featured
                            </span>
                        )}
                    </div>
                    <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full pointer-events-none z-10">
                        <span className="material-icons text-yellow-400 text-sm">
                            star
                        </span>
                        <span className="text-white font-semibold text-xs">
                            {project.rating}
                        </span>
                    </div>
                </div>
            )}

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow space-y-4 relative z-0">
                {/* Title with Main Link */}
                <h3 className="text-lg font-semibold text-white leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={projectUrl} className="before:absolute before:inset-0 outline-none">
                        {project.title}
                    </Link>
                </h3>

                {/* Category Badge */}
                <div className="flex items-center gap-2 pointer-events-none relative">
                    <span className="bg-teal-500/10 text-teal-400 text-xs font-medium px-3 py-1 rounded-full border border-teal-500/20">
                        {project.category}
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 line-clamp-2 flex-grow pointer-events-none relative">
                    {project.description || project.client?.feedback || "No description available."}
                </p>

                {/* Tags Section */}
                <div className="flex flex-wrap gap-2 pt-2 relative z-10">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                            key={tagIndex}
                            className="bg-primary/10 text-primary/80 text-xs font-medium px-2.5 py-1 rounded-md border border-primary/20 pointer-events-none"
                        >
                            {tag}
                        </span>
                    ))}
                    {project.tags.length > 3 && (
                        <span className="bg-gray-800 text-gray-400 text-xs font-medium px-2.5 py-1 rounded-md pointer-events-none">
                            +{project.tags.length - 3}
                        </span>
                    )}
                </div>

                {project.liveUrl && (
                    <div className="pt-2 relative z-10">
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="material-icons text-base">language</span>
                            Live Site
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
