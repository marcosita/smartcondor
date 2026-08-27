'use client';

import React, { useState } from 'react';
import { AdvantageFolder, AdvantagePartner } from '@/types/tenant';
import { FolderCard } from './FolderCard';
import { FolderDetailModal } from './FolderDetailModal';

interface ClubSectionProps {
  folders: AdvantageFolder[];
  partners: AdvantagePartner[];
  onOpenAdvertise: () => void;
}

export const ClubSection: React.FC<ClubSectionProps> = ({
  folders,
  partners,
  onOpenAdvertise,
}) => {
  const [selectedFolder, setSelectedFolder] = useState<AdvantageFolder | null>(null);

  return (
    <section className="w-full mb-4">
      {/* 2-Column Grid of Tabbed Folders matching the Right Phone in Mockup */}
      <div className="grid grid-cols-2 gap-2.5">
        {folders.map((folder) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            onClick={() => setSelectedFolder(folder)}
          />
        ))}
      </div>

      {/* Folder Detail Modal */}
      <FolderDetailModal
        folder={selectedFolder}
        partners={partners}
        isOpen={!!selectedFolder}
        onClose={() => setSelectedFolder(null)}
        onOpenAdvertise={onOpenAdvertise}
      />
    </section>
  );
};
