import { useEffect } from 'react'
import { X, Play, Gamepad2 } from 'lucide-react'

export default function VideoModal({ project, onClose }) {
    // Κλείσιμο με το πλήκτρο Escape στο πληκτρολόγιο
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    if (!project) return null

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
            {/* Modal Card - με stopPropagation για να μην κλείνει όταν κάνεις κλικ μέσα του */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl space-y-4"
            >
                {/* Header Modal */}
                <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/50">
                    <div className="flex items-center gap-2">
                        <Gamepad2 className="w-5 h-5 text-amber-500" />
                        <div>
                            <h3 className="font-bold text-white text-sm md:text-base">
                                {project.title}
                            </h3>
                            <p className="text-[11px] text-slate-400 font-mono">
                                {project.categoryLabel} Showcase
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* 16:9 Video Player Container */}
                <div className="p-4 pt-0">
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800 relative flex items-center justify-center">
                        {project.videoUrl ? (
                            <iframe
                                src={project.videoUrl}
                                title={project.title}
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="text-center p-8 space-y-3">
                                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                                    <Play className="w-6 h-6 ml-0.5" />
                                </div>
                                <div className="text-white font-bold text-sm">Demo Footage Clip</div>
                                <p className="text-xs text-slate-400 max-w-md">
                                    Εδώ θα φορτώσει το YouTube / MP4 stream του Unreal Engine 5 showcase.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer με Tech Pills */}
                    <div className="pt-4 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                            {project.techStack?.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]"
                                >
                  {tech}
                </span>
                            ))}
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono">
              ESC για κλείσιμο
            </span>
                    </div>
                </div>

            </div>
        </div>
    )
}