import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'

const ViewResumeDialog = ({ open, setOpen, url, title }) => {
    // Using Google Docs Viewer as a proxy to ensure the PDF is viewable even if headers are set to download
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-4xl h-[90vh] p-0 overflow-hidden bg-white">
                <DialogHeader className="p-4 border-b">
                    <DialogTitle className="text-black">Resume Preview - {title}</DialogTitle>
                </DialogHeader>
                <div className="w-full h-full flex flex-col">
                    <iframe
                        src={viewerUrl}
                        className="w-full h-full border-none"
                        title="Resume Preview"
                    >
                        <p>Your browser does not support iframes. <a href={url}>Download the PDF</a> instead.</p>
                    </iframe>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ViewResumeDialog
