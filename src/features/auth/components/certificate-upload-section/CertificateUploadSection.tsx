import { cn } from '@/shared/utils/cn';
import { FileUpload } from '@/shared/ui/file-upload';

import * as styles from './certificate-upload-section.styles';

type CertificateUploadSectionProps = {
  label: string;
  file: File | null;
  onFileChange?: (file: File | null) => void;
  className?: string;
};

export function CertificateUploadSection({
  label,
  file,
  onFileChange,
  className,
}: CertificateUploadSectionProps) {
  return (
    <div className={cn(styles.container, className)}>
      <p className={styles.label}>{label}</p>
      <FileUpload file={file} onFileChange={onFileChange} variant="signup" className="w-full" />
    </div>
  );
}
