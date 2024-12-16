export interface ClientDropdownProps {
  userName: string | undefined;
  userEmail: string | undefined;
  userImage: string | undefined;
  onSignOut: () => Promise<void>;
}

export interface SidebarProps {
  setIsSidebarOpen: (open: boolean) => void;
}

export interface DropdownProps {
  userName: string;
  userEmail: string;
  userImage: string;
}

export type PaymentDialogProps = {
  onConfirm: (paymentMethod: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export interface LogoutDialogProps {
  onConfirm: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

