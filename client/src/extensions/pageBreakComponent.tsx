import React from 'react'
import { NodeViewWrapper } from '@tiptap/react'

export const PageBreakComponent: React.FC = () => {
  return (
    <NodeViewWrapper className="page-break-wrapper">
      <div className="relative my-6 print:break-after-page print:my-0 print:h-0 print:overflow-hidden" style={{ backgroundColor: '#f9fbfd' }}>
        {/* Bottom of previous page */}
        <div className="w-full h-4 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: '#c7c7c7' }}></div>
        </div>
        
        {/* Gap between pages */}
        <div className="w-full h-8 flex items-center justify-center relative" style={{ backgroundColor: '#f9fbfd' }}>
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ backgroundColor: '#c7c7c7' }}></div>
          <div className="absolute right-0 top-0 bottom-0 w-px" style={{ backgroundColor: '#c7c7c7' }}></div>

        </div>
        
        {/* Top of next page */}
        <div className="w-full h-4 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white"></div>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: '#c7c7c7' }}></div>
        </div>
      </div>
    </NodeViewWrapper>
  )
}