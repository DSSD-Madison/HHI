import React from 'react'
import { useMap } from 'react-leaflet'

import { Stakeholder } from 'types'
interface InfoPanelProps {
  stakeholder: Stakeholder | null
  onClose: () => void
}

const InfoPanel: React.FC<InfoPanelProps> = ({ stakeholder, onClose }) => {
  const map = useMap()

  const disableZoom = () => {
    map.scrollWheelZoom.disable()
  }

  const enableZoom = () => {
    map.scrollWheelZoom.enable()
  }

  const extractDriveFileId = (link: string): string | null => {
    const match = link.match(/id=([a-zA-Z0-9_-]+)/)
    return match ? match[1] : null
  }

  const driveFileId = stakeholder?.logo ? extractDriveFileId(stakeholder.logo) : null

  return (
    <div
      className={`${
        stakeholder ? 'w-[400px]' : 'w-0'
      } duration-400 !font-metropolis fixed left-0 z-[1000] box-border h-screen cursor-default overflow-y-auto bg-white bg-opacity-80 shadow-md transition-all duration-100`}
      onMouseEnter={disableZoom}
      onMouseLeave={enableZoom}
    >
      {stakeholder && (
        <>
          <span className="absolute right-6 top-6 h-4 w-4 cursor-pointer text-center text-2xl leading-4 text-black-900 transition delay-75 ease-in-out hover:scale-125" onClick={onClose}>
            &times;
          </span>

          <div key={stakeholder.contact} className="px-6 py-10">
            <div className="mb-4 ">
              <a
                href={stakeholder.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-black-900 to-black-600 bg-[length:0_0.1em] bg-[position:0_100%] bg-no-repeat text-2xl font-bold !text-black-700 transition-all duration-100 hover:bg-[length:100%_0.1em]"
              >
                {stakeholder.name}
              </a>
            </div>
            {driveFileId && <img className="mx-auto mb-5 w-80" src={`https://drive.google.com/uc?id=${driveFileId}`} alt={`${stakeholder.name} logo`} />}
            <div className="mb-6 text-sm text-black-800">{stakeholder.description}</div>
            <div className="mb-4 font-bold text-black-800">
              HEADQUARTERS: <span className="text-sm font-normal">{stakeholder.headquarter}</span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-black-800">LOCATIONS SERVED:</span>
              <div className="ml-2 mt-2">
                {stakeholder.locationsServed?.map((location) => (
                  <span key={location} className="mb-2 mr-2 inline-block rounded-full bg-black-100 px-3 py-1 font-semibold text-black-700">
                    {location}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4 font-bold text-black-800">
              CONTACT: <span className="text-sm font-normal">{stakeholder.contact}</span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-black-800">TAGS:</span>
              <div className="ml-2 mt-2">
                {stakeholder.tags?.map((tag) => (
                  <span key={tag} className="mb-2 mr-2 inline-block rounded-full bg-black-100 px-3 py-1 font-semibold text-black-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default InfoPanel
