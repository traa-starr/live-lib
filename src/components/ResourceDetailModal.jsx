import { ExternalLink, Copy } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Divider from '../ui/Divider';

export default function ResourceDetailModal({ resource, open, onOpenChange }) {
  if (!resource) return null;

  const onCopy = async () => {
    await navigator.clipboard.writeText(resource.citation);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} title={resource.title}>
      <p className="text-sm text-slate-600 dark:text-slate-300">{resource.author}{resource.year ? ` · ${resource.year}` : ''}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Badge tone="info">{resource.level}</Badge>
        <Badge>{resource.status}</Badge>
        <Badge tone="success">{resource.type}</Badge>
      </div>
      <Divider />
      <p className="my-4 text-sm leading-7 text-slate-700 dark:text-slate-200">{resource.annotation}</p>
      <p className="text-sm italic text-slate-600 dark:text-slate-300">{resource.citation}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button variant="secondary" onClick={onCopy}><Copy size={15} className="mr-2" />Copy citation</Button>
        <Button onClick={() => window.open(resource.url, '_blank', 'noopener,noreferrer')}><ExternalLink size={15} className="mr-2" />Open source</Button>
      </div>
    </Modal>
  );
}
